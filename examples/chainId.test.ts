import { describe, expect, it } from "vitest";
import {
  chainIdLabel,
  isWaxMainnetChainId,
  WAX_MAINNET_CHAIN_ID,
} from "./chainId";

describe("chainId", () => {
  it("matches wax mainnet", () => {
    expect(WAX_MAINNET_CHAIN_ID).toBe(
      "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    );
    expect(isWaxMainnetChainId(WAX_MAINNET_CHAIN_ID)).toBe(true);
    expect(chainIdLabel(WAX_MAINNET_CHAIN_ID)).toBe("WAX mainnet");
  });
  it("labels other", () => {
    expect(isWaxMainnetChainId("00")).toBe(false);
  });
});
