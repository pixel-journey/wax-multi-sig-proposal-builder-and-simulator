export const DEFAULT_RPC = "https://wax.greymass.com";

export const RPC_PRESETS: Array<{ id: string; label: string; url: string }> = [
  { id: "greymass", label: "Greymass", url: "https://wax.greymass.com" },
  { id: "eosnation", label: "EOSnation", url: "https://wax.api.eosnation.io" },
  { id: "waxesplorer", label: "WAX Explorer API", url: "https://api.waxeplorer.com" },
];

export function normalizeRpcBase(url: string): string {
  return url.trim().replace(/\/$/, "") || DEFAULT_RPC;
}
