import { NextRequest } from "next/server";
import { ConfigPorteiro, PARAM_CHAVE } from "./config";
import { ehUserAgentDeBot } from "./bots";
import { validarTokenHumano } from "./cookie";

export interface ResultadoAnalise {
  ehBot: boolean;
  motivo: string;
  pais: string;
  userAgent: string;
  chaveBypassUsada: boolean;
  ip?: string;
}

/**
 * Analisa a requisição HTTP e determina se é um visitante legítimo do Brasil
 * ou se é um bot / scraper / acesso estrangeiro.
 */
export function analisarRequisicao(
  req: NextRequest,
  config: ConfigPorteiro
): ResultadoAnalise {
  const headers = req.headers;
  const userAgent = headers.get("user-agent") || "";
  const acceptLanguage = (headers.get("accept-language") || "").toLowerCase();
  const acceptEncoding = headers.get("accept-encoding");

  // Detecção do país via Cloudflare ou CDNs
  const pais = (
    headers.get("cf-ipcountry") ||
    headers.get("x-vercel-ip-country") ||
    headers.get("cloudfront-viewer-country") ||
    headers.get("x-country-code") ||
    ""
  ).toUpperCase().trim();

  const ip =
    headers.get("cf-connecting-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "desconhecido";

  // 1. Chave mestre de Bypass via URL (?chave=...)
  const chaveUrl = req.nextUrl.searchParams.get(PARAM_CHAVE);
  if (config.chave && chaveUrl === config.chave) {
    return {
      ehBot: false,
      motivo: "bypass_chave_mestra",
      pais: pais || "BR",
      userAgent,
      chaveBypassUsada: true,
      ip,
    };
  }

  // 2. Cookie de sessão validada previamente
  const cookiePt = req.cookies.get("__pt")?.value;
  if (cookiePt && validarTokenHumano(cookiePt, config.chave)) {
    return {
      ehBot: false,
      motivo: "sessao_humana_previa",
      pais: pais || "BR",
      userAgent,
      chaveBypassUsada: false,
      ip,
    };
  }

  // 3. Checagem de User-Agent de bots, crawlers do Facebook e scrapers
  const resultadoBot = ehUserAgentDeBot(userAgent);
  if (resultadoBot.ehBot) {
    return {
      ehBot: true,
      motivo: `bot_detectado: ${resultadoBot.padrao || "desconhecido"}`,
      pais,
      userAgent,
      chaveBypassUsada: false,
      ip,
    };
  }

  // 4. Bloqueio de rede Tor (Cloudflare marca Tor como 'T1')
  if (pais === "T1") {
    return {
      ehBot: true,
      motivo: "bloqueio_rede_tor",
      pais,
      userAgent,
      chaveBypassUsada: false,
      ip,
    };
  }

  // 5. Verificação geográfica de país
  // Se estiver em ambiente local de desenvolvimento (localhost/127.0.0.1) e sem header de país, libera
  const host = req.headers.get("host") || "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");

  if (pais && pais !== "XX") {
    // Se o país foi identificado pelo Cloudflare e não está na lista de liberados (padrão: apenas BR)
    if (!config.paisesLiberados.has(pais)) {
      return {
        ehBot: true,
        motivo: `pais_estrangeiro_bloqueado: ${pais}`,
        pais,
        userAgent,
        chaveBypassUsada: false,
        ip,
      };
    }
  } else if (!isLocalhost) {
    // Requisição em produção sem cabeçalho de país:
    // Scrapers que chamam direto o IP ou proxies que limpam cabeçalhos
    // Usuários reais sempre têm accept-language com português (pt, pt-BR)
    if (!acceptLanguage || !acceptLanguage.includes("pt")) {
      return {
        ehBot: true,
        motivo: "sem_geolocalizacao_e_sem_idioma_pt",
        pais: "DESCONHECIDO",
        userAgent,
        chaveBypassUsada: false,
        ip,
      };
    }
  }

  // 6. Heurística de cabeçalhos de navegadores reais
  // Ferramentas de automação simples (curl, raw sockets) esquecem headers básicos
  if (!acceptEncoding && !isLocalhost) {
    return {
      ehBot: true,
      motivo: "cabecalhos_obrigatorios_ausentes",
      pais,
      userAgent,
      chaveBypassUsada: false,
      ip,
    };
  }

  // 7. Pontuação Cloudflare Bot Management (se disponível no plano)
  const botScoreHeader = headers.get("cf-bot-management-score");
  if (botScoreHeader) {
    const score = parseInt(botScoreHeader, 10);
    if (!isNaN(score) && score < config.botScoreMin) {
      return {
        ehBot: true,
        motivo: `cf_bot_score_baixo: ${score}`,
        pais,
        userAgent,
        chaveBypassUsada: false,
        ip,
      };
    }
  }

  // Visitante considerado humano legítimo brasileiro
  return {
    ehBot: false,
    motivo: "humano_brasileiro_aprovado",
    pais: pais || "BR",
    userAgent,
    chaveBypassUsada: false,
    ip,
  };
}
