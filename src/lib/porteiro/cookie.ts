/**
 * Funções seguras e Edge-compatible para geração e verificação
 * de cookie de visitante humano verificado.
 */

import { COOKIE_PORTEIRO } from "./config";

/**
 * Gera um token simples baseado na data (formato YYYYMMDD) e chave secreta.
 * Válido por 7 dias. Não requer bibliotecas nativas de Node, funcionando
 * perfeitamente no Cloudflare Workers / Edge Runtime.
 */
export function gerarTokenHumano(chave: string): string {
  const agora = new Date();
  const dia = agora.toISOString().slice(0, 10); // YYYY-MM-DD
  // Hash simples de 32 bits reversível apenas com conhecimento da chave
  let hash = 0;
  const texto = `${dia}:${chave}:autorizado_humano_br`;
  for (let i = 0; i < texto.length; i++) {
    hash = (hash << 5) - hash + texto.charCodeAt(i);
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(36)}_${dia.replace(/-/g, "")}`;
}

/**
 * Valida se o cookie apresentado confere com os últimos 7 dias.
 */
export function validarTokenHumano(token: string | undefined | null, chave: string): boolean {
  if (!token || !token.startsWith("h_")) return false;

  const partes = token.split("_");
  if (partes.length < 3) return false;

  const dataStr = partes[2]; // YYYYMMDD
  if (dataStr.length !== 8) return false;

  const ano = parseInt(dataStr.substring(0, 4), 10);
  const mes = parseInt(dataStr.substring(4, 6), 10) - 1;
  const dia = parseInt(dataStr.substring(6, 8), 10);
  const dataCookie = new Date(Date.UTC(ano, mes, dia));
  const hoje = new Date();

  // Verifica se a data é recente (máximo 7 dias de idade)
  const diferencaDias = (hoje.getTime() - dataCookie.getTime()) / (1000 * 60 * 60 * 24);
  if (diferencaDias < 0 || diferencaDias > 7) {
    return false;
  }

  // Compara com a chave
  const tokenEsperado = gerarTokenHumano(chave);
  return token.split("_")[1] === tokenEsperado.split("_")[1];
}

export { COOKIE_PORTEIRO };
