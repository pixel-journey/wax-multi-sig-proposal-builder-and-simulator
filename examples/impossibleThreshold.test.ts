import { describe, expect, it } from "vitest";
import { checkThresholdFeasibility } from "./impossibleThreshold";

describe("checkThresholdFeasibility", () => {
  it("flags impossible", () => {
    const r = checkThresholdFeasibility({
      proposalName: "x",
      threshold: 5,
      approvals: [{ account: "a", weight: 1 }, { account: "b", weight: 1 }],
    });
    expect(r.ok).toBe(false);
  });
  it("ok when feasible", () => {
    const r = checkThresholdFeasibility({
      proposalName: "x",
      threshold: 2,
      approvals: [{ account: "a", weight: 1 }, { account: "b", weight: 1 }],
    });
    expect(r.ok).toBe(true);
  });
});
