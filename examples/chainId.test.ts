import { describe, expect, it } from "vitest";
import {
  chainIdLabel,
  isWaxMainnetChainId,
  WAX_MAINNET_CHAIN_ID,
} from "./chainId";

describe("chainId", () => {
  it("matches wax mainnet", () => {
    expect(isWaxMainnetChainId(WAX_MAINNET_CHAIN_ID)).toBe(true);
    expect(chainIdLabel(WAX_MAINNET_CHAIN_ID)).toBe("WAX mainnet");
  });
  it("labels other", () => {
    expect(isWaxMainnetChainId("00")).toBe(false);
  });
});
