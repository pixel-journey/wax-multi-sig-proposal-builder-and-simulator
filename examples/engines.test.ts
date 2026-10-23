import { describe, expect, it } from "vitest";
import {
  analyzeProposalRisks,
  computeThresholdSnapshot,
  toggleApproval,
} from "./engines";
import type { ProposalConfig } from "./types";

const base: ProposalConfig = {
  threshold: 2,
  approvals: [
    { account: "a", weight: 1, hasApproved: false },
    { account: "b", weight: 1, hasApproved: false },
    { account: "c", weight: 1, hasApproved: false },
  ],
};

describe("multi-sig engines", () => {
  it("computes progress", () => {
    const withOne = {
      ...base,
      approvals: toggleApproval(base.approvals!, "a"),
    };
    const snap = computeThresholdSnapshot(withOne);
    expect(snap.approvedWeight).toBe(1);
    expect(snap.thresholdMet).toBe(false);
    expect(snap.progressPercent).toBe(50);
  });

  it("flags impossible threshold", () => {
    const risks = analyzeProposalRisks({
      threshold: 10,
      approvals: [{ account: "a", weight: 1, hasApproved: false }],
    });
    expect(risks.some((r) => r.id === "impossible")).toBe(true);
  });
});
