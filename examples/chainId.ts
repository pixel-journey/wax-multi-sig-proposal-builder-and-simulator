/** WAX mainnet chain id, checked against wax.greymass.com get_info on 2026-11-20. */
export const WAX_MAINNET_CHAIN_ID =
  "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4";

export function isWaxMainnetChainId(chainId: string): boolean {
  return chainId.toLowerCase() === WAX_MAINNET_CHAIN_ID.toLowerCase();
}

export function chainIdLabel(chainId: string): string {
  if (isWaxMainnetChainId(chainId)) return "WAX mainnet";
  return `unknown / other (${chainId.slice(0, 12)}…)`;
}
