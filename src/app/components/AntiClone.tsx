"use client";

import { useEffect } from "react";

interface AntiCloneProps {
  /**
   * Domínios autorizados separados por vírgula.
   * Se vazio, não trava por domínio.
   */
  dominiosAutorizados?: string[];
}

/**
 * Componente de proteção em tempo de execução no cliente contra:
 * 1. Iframe / Clonagem por embedding (Framebusting)
 * 2. Atalhos de cópia rápida do código-fonte (Ctrl+U, Ctrl+S, F12)
 * 3. Clique com botão direito para salvar mídia e scripts
 * 4. Execução em domínios de clonadores (Domain Lock opcional)
 */
export function AntiClone({ dominiosAutorizados }: AntiCloneProps) {
  useEffect(() => {
    // 1. Anti-Iframe / Framebusting
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = window.self.location.href;
      }
    } catch {
      // Em caso de sandbox restritivo de iframe
    }

    // 2. Trava de domínio (se especificado domínios autorizados)
    if (dominiosAutorizados && dominiosAutorizados.length > 0) {
      const hostnameAtual = window.location.hostname.toLowerCase();
      const isLocal =
        hostnameAtual === "localhost" ||
        hostnameAtual === "127.0.0.1" ||
        hostnameAtual.endsWith(".local");

      if (!isLocal) {
        const autorizado = dominiosAutorizados.some(
          (d) =>
            hostnameAtual === d.toLowerCase() ||
            hostnameAtual.endsWith(`.${d.toLowerCase()}`)
        );

        if (!autorizado) {
          // Domínio clonador não autorizado: redireciona para a vitrine ou página vazia
          window.location.href = "https://google.com.br";
          return;
        }
      }
    }

    // 3. Bloqueio de atalhos de clonagem (Ctrl+U, Ctrl+S, F12, Ctrl+Shift+I/J)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Ctrl + U (Exibir código fonte)
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return false;
      }

      // Ctrl + S (Salvar página completa)
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + I ou J (Inspecionar elemento)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Bloqueio de clique direito (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      // Previne o menu de salvar imagem / inspecionar elemento
      e.preventDefault();
      return false;
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [dominiosAutorizados]);

  return null;
}
