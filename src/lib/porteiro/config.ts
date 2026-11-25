/**
 * Configuração central do Porteiro (Cloaker / Proteção Anti-Bot).
 *
 * Modo de operação:
 * - `ativo`: bots e acessos gringos veem a página de travesseiros (vitrine).
 * - `observar`: registra a detecção nos headers e logs, mas não bloqueia (útil para auditoria).
 * - `off`: porteiro totalmente desligado.
 */

export type ModoPorteiro = "off" | "observar" | "ativo";

export interface ConfigPorteiro {
  modo: ModoPorteiro;
  /** Países que têm acesso liberado ao funil real (Padrão: apenas Brasil 'BR'). */
  paisesLiberados: Set<string>;
  /** Chave mestra de bypass: acessando `?chave=SEGREDO` libera o funil de qualquer lugar. */
  chave: string;
  /** Pontuação mínima do Cloudflare Bot Management (0 a 100). */
  botScoreMin: number;
  /** Domínios autorizados para proteção anti-clonagem no cliente. */
  dominiosAutorizados: string[];
}

function normalizarModo(valor: string | undefined): ModoPorteiro {
  if (valor === "off" || valor === "observar") return valor;
  return "ativo"; // Padrão seguro: ativo
}

function extrairLista(valor: string | undefined, padrao: string[]): string[] {
  const itens = (valor ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return itens.length > 0 ? itens : padrao;
}

export function lerConfigPorteiro(): ConfigPorteiro {
  const chave = process.env.PORTEIRO_CHAVE || "liberar_funil_2026";
  const dominiosBruto = process.env.PORTEIRO_DOMINIOS || process.env.NEXT_PUBLIC_ALLOWED_DOMAINS;

  return {
    modo: normalizarModo(process.env.PORTEIRO_MODO),
    paisesLiberados: new Set(
      extrairLista(process.env.PORTEIRO_PAISES, ["BR"]).map((p) => p.toUpperCase())
    ),
    chave,
    botScoreMin: Number.parseInt(process.env.PORTEIRO_BOTSCORE_MIN || "30", 10),
    dominiosAutorizados: extrairLista(dominiosBruto, []),
  };
}

export const COOKIE_PORTEIRO = "__pt";
export const PARAM_CHAVE = "chave";
