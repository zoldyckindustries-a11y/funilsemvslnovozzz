/**
 * Padrões de User-Agents de bots conhecidos, scrapers, crawlers do Facebook,
 * ferramentas de espionagem de anúncios e automações headless.
 */

// Facebook / Meta crawlers & scrapers
export const PADROES_FACEBOOK_BOTS = [
  "facebookexternalhit",
  "facebot",
  "facebookbot",
  "meta-externalagent",
  "meta-externalfetcher",
  "facebookcatalog",
  "facebookplatform",
];

// Ferramentas de espionagem de anúncios (Ad Spy tools usadas por concorrentes para clonar)
export const PADROES_AD_SPY = [
  "adplexity",
  "adspy",
  "dropispy",
  "pipia",
  "poweradspy",
  "anstrex",
  "spyover",
  "idvert",
  "adbeat",
  "socialpeta",
  "bigspy",
  "droppoint",
  "adheart",
];

// Browsers headless, scrapers e ferramentas de automação
export const PADROES_HEADLESS_AUTOMATION = [
  "headlesschrome",
  "headless",
  "puppeteer",
  "playwright",
  "selenium",
  "phantomjs",
  "webdriver",
  "cypress",
  "nightwatch",
  "casperjs",
];

// Bibliotecas HTTP de programação e scripts automatizados
export const PADROES_SCRAPERS_HTTP = [
  "python-requests",
  "aiohttp",
  "httpx",
  "curl/",
  "wget",
  "scrapy",
  "urllib",
  "libwww",
  "go-http-client",
  "okhttp",
  "axios",
  "postmanruntime",
  "insomnia",
  "httpie",
  "apache-httpclient",
  "java/",
  "node-fetch",
  "undici",
  "got/",
  "restsharp",
];

// Bots de busca e indexação que não pertencem ao tráfego de vendas
export const PADROES_CRAWLERS_GERAIS = [
  "bytespider",
  "bytedance",
  "petalbot",
  "yandex",
  "baiduspider",
  "sogou",
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "screaming frog",
  "blexbot",
  "seekport",
  "zoominfobot",
  "exabot",
  "amazonbot",
  "claude-web",
  "gptbot",
  "chatgpt-user",
  "applebot",
  "bingbot",
];

const TODOS_PADROES = [
  ...PADROES_FACEBOOK_BOTS,
  ...PADROES_AD_SPY,
  ...PADROES_HEADLESS_AUTOMATION,
  ...PADROES_SCRAPERS_HTTP,
  ...PADROES_CRAWLERS_GERAIS,
];

// Regex pré-compilada para máxima performance no Edge runtime
const REGEX_BOTS = new RegExp(TODOS_PADROES.join("|"), "i");

/**
 * Verifica se um user-agent corresponde a um bot conhecido.
 */
export function ehUserAgentDeBot(userAgent: string | null | undefined): {
  ehBot: boolean;
  padrao?: string;
} {
  if (!userAgent || userAgent.trim().length < 12) {
    return { ehBot: true, padrao: "ua_vazio_ou_curto" };
  }

  const match = userAgent.match(REGEX_BOTS);
  if (match) {
    return { ehBot: true, padrao: match[0].toLowerCase() };
  }

  return { ehBot: false };
}
