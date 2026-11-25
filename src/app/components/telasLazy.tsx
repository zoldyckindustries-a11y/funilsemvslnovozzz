"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

// Carregamento sob demanda das telas do funil.
//
// Antes `page.tsx` importava as seis telas de forma estática. Como todas são
// client components, o Next juntava tudo num chunk só: PitchPage (4.6 mil
// linhas), ChatIndividual, InstagramDirect, LoadingAnalysis e, com elas, o
// framer-motion inteiro. O resultado era 224 kB de First Load JS para
// mostrar uma abertura que não usa nenhum desses arquivos — num Moto G
// Power em 4G lenta, isso é mais de um segundo só de download e outro tanto
// de parse, tudo disputando a thread com a hidratação e com os pixels.
//
// Agora a abertura e o formulário são o único JavaScript do primeiro load.
// Cada tela seguinte chega no seu próprio chunk, e `usePrefetchTelas` manda
// buscar a próxima com antecedência — então o split não troca peso por
// espera: quando a pessoa avança, o arquivo já está no cache.

/** Enquanto o chunk baixa, pinta o fundo da tela que está chegando. Sem
 *  isto o salto de tela pisca branco no meio do funil. */
const fundo = (cor: string) => {
  const Fundo = () => (
    <div className="fixed inset-0 z-[60]" style={{ backgroundColor: cor }} />
  );
  Fundo.displayName = `Fundo(${cor})`;
  return Fundo;
};

const Nada = () => null;

export const ProfileConfirmModal = dynamic(
  () => import("./ProfileConfirmModal"),
  { ssr: false, loading: Nada }
);

export const LoadingAnalysis = dynamic(() => import("./LoadingAnalysis"), {
  ssr: false,
  loading: fundo("#FFFFFF"),
});

export const InstagramDirect = dynamic(() => import("./InstagramDirect"), {
  ssr: false,
  loading: fundo("#D9DBD5"),
});

export const ChatIndividual = dynamic(() => import("./ChatIndividual"), {
  ssr: false,
  loading: fundo("#D9DBD5"),
});

export const PitchPage = dynamic(() => import("./PitchPage"), {
  ssr: false,
  loading: fundo("#0A1419"),
});

type Carga = () => Promise<unknown>;

const CARGAS: Record<string, Carga[]> = {
  // Logo depois da hidratação: o modal e a análise são as duas telas que
  // qualquer lead vê, e as duas mais leves.
  inicio: [
    () => import("./ProfileConfirmModal"),
    () => import("./LoadingAnalysis"),
  ],
  // Da análise saem ~31 s de tela: tempo de sobra para o Direct chegar.
  loading: [() => import("./InstagramDirect")],
  // Da lista, os dois destinos possíveis.
  direct: [() => import("./ChatIndividual"), () => import("./PitchPage")],
  // Quem abriu uma conversa está a um toque da oferta.
  chat: [() => import("./PitchPage")],
};

const jaPedido = new Set<string>();

function quandoOcioso(fn: () => void) {
  if (typeof window === "undefined") return;
  const ric = (
    window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number;
    }
  ).requestIdleCallback;
  if (ric) ric(fn, { timeout: 2500 });
  else setTimeout(fn, 800);
}

/**
 * Busca com antecedência o chunk da próxima tela.
 *
 * O `import()` é idempotente — o segundo pedido devolve o módulo já
 * carregado —, mas o Set evita até a chamada repetida a cada render.
 */
export function usePrefetchTelas(etapa: string) {
  useEffect(() => {
    for (const chave of ["inicio", etapa]) {
      if (jaPedido.has(chave)) continue;
      const cargas = CARGAS[chave];
      if (!cargas) continue;
      jaPedido.add(chave);
      quandoOcioso(() => cargas.forEach((carregar) => void carregar()));
    }
  }, [etapa]);
}
