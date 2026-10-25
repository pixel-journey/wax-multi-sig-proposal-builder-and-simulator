import { describe, expect, it } from "vitest";
import { remainingLine, weightNeeded } from "./remainingWeight";

describe("remainingWeight", () => {
  it("computes need", () => {
    const snap = {
      totalWeight: 3,
      approvedWeight: 1,
      remainingWeight: 2,
      threshold: 2,
      thresholdMet: false,
      approvalCount: 1,
      pendingCount: 2,
      progressPercent: 50,
    };
    expect(weightNeeded(snap)).toBe(1);
    expect(remainingLine(snap)).toContain("Need 1");
  });
});
