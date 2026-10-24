import { describe, expect, it } from "vitest";
import { normalizeRpcBase, RPC_PRESETS } from "./rpcEndpoints";

describe("rpcEndpoints", () => {
  it("strips trailing slash", () => {
    expect(normalizeRpcBase("https://wax.greymass.com/")).toBe(
      "https://wax.greymass.com"
    );
  });
  it("has presets", () => {
    expect(RPC_PRESETS.length).toBeGreaterThan(0);
  });
});
