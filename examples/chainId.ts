/** Well-known WAX mainnet chain id (Antelope). */
export const WAX_MAINNET_CHAIN_ID =
  "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c276d390b158d7232";

export function isWaxMainnetChainId(chainId: string): boolean {
  return chainId.toLowerCase() === WAX_MAINNET_CHAIN_ID.toLowerCase();
}

export function chainIdLabel(chainId: string): string {
  if (isWaxMainnetChainId(chainId)) return "WAX mainnet";
  return `unknown / other (${chainId.slice(0, 12)}…)`;
}
