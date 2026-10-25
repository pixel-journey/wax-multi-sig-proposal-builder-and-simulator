import { describe, expect, it } from "vitest";
import { equalizeWeights } from "./equalizeWeights";

describe("equalizeWeights", () => {
  it("sets all to 1", () => {
    const out = equalizeWeights([
      { account: "a", weight: 5 },
      { account: "b", weight: 2 },
    ]);
    expect(out.every((x) => x.weight === 1)).toBe(true);
  });
  it("custom weight", () => {
    const out = equalizeWeights([{ account: "a", weight: 9 }], 3);
    expect(out[0].weight).toBe(3);
  });
});
