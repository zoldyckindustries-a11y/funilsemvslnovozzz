// Apaga a saída do `next build` antes de compilar.
//
// O Cloudflare restaura um "build output cache" entre deploys, e o
// `next build` estoura com "Invariant: no direct app page entry found for
// /_not-found" quando roda sobre um .next de uma compilação anterior.
// Mesmo comportamento acontece localmente ao buildar duas vezes seguidas.
//
// IMPORTANTE: apaga SÓ o `.next`. O `.open-next` NÃO entra aqui.
// O OpenNext limpa e recria o `.open-next` (com a config já compilada em
// `.open-next/.build`) ANTES de chamar `npm run build`. Como este script
// roda no `prebuild`, apagar `.open-next` aqui destruiria essa pasta no
// meio do processo e o bundle quebraria depois.
//
// Em Node em vez de `rm -rf` para funcionar igual no Windows e no Linux.

import { rmSync } from "node:fs";

rmSync(".next", { recursive: true, force: true });

console.log("[limpar-build] .next removido");
