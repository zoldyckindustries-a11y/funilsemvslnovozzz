import { NextRequest, NextResponse } from "next/server";
import { lerConfigPorteiro } from "./lib/porteiro/config";
import { analisarRequisicao } from "./lib/porteiro/analise";
import { COOKIE_PORTEIRO, gerarTokenHumano } from "./lib/porteiro/cookie";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // A própria página da vitrine não precisa ser filtrada
  if (pathname === "/vitrine") {
    return NextResponse.next();
  }

  // Webhooks de pagamento (ex: Lezty) nunca devem ser bloqueados
  if (pathname.startsWith("/api/lezty/webhook")) {
    return NextResponse.next();
  }

  const config = lerConfigPorteiro();

  // Se o porteiro estiver totalmente desligado, entrega direto
  if (config.modo === "off") {
    const res = NextResponse.next();
    res.headers.set("x-porteiro-status", "desligado");
    return res;
  }

  // Executa a análise multi-camada (GeoIP + Bot UA + Heurísticas + Cookie + Bypass)
  const analise = analisarRequisicao(req, config);

  // Se for bot, scraper do Facebook, ad spy ou visitante fora do Brasil
  if (analise.ehBot) {
    if (config.modo === "ativo") {
      // REWRITE TRANSPARENTE: A URL no navegador ou no robô permanece a mesma,
      // mas o Next.js entrega 100% o conteúdo da vitrine de travesseiros ortopédicos.
      // O scraper ou robô do Facebook clona/aprova a loja de travesseiros.
      const urlVitrine = new URL("/vitrine", req.url);
      const res = NextResponse.rewrite(urlVitrine);
      res.headers.set("x-porteiro-status", "bloqueado");
      res.headers.set("x-porteiro-motivo", analise.motivo);
      return res;
    }

    // Modo "observar": apenas anota no cabeçalho de diagnóstico
    const res = NextResponse.next();
    res.headers.set("x-porteiro-status", "bot_em_observacao");
    res.headers.set("x-porteiro-motivo", analise.motivo);
    return res;
  }

  // VISITANTE HUMANO LEGÍTIMO BRASILEIRO (ou com chave de bypass)
  const res = NextResponse.next();
  res.headers.set("x-porteiro-status", "liberado");
  res.headers.set("x-porteiro-motivo", analise.motivo);

  // Fixa o cookie para que os próximos cliques no funil sejam instantâneos
  const token = gerarTokenHumano(config.chave);
  res.cookies.set(COOKIE_PORTEIRO, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  });

  return res;
}

export const config = {
  matcher: [
    /*
     * Intercepta todas as páginas do funil exceto:
     * - _next/static e _next/image (arquivos estáticos do Next)
     * - favicon.ico, robots.txt, sitemap.xml
     * - Arquivos estáticos de mídia (.png, .jpg, .svg, .webp, .mp4, etc.)
     * - Webhooks de gateway de pagamento
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/lezty/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|mp4|webm)).*)",
  ],
};
