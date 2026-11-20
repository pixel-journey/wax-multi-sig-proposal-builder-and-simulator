import { describe, expect, it } from "vitest";
import { analyzeProposalRisks } from "./engines";
import { aggregateRiskScore } from "./riskScore";

describe("riskScore", () => {
  it("scores impossible setup high", () => {
    const risks = analyzeProposalRisks({
      proposalName: "x",
      threshold: 10,
      approvals: [{ account: "a", weight: 1, hasApproved: false }],
    });
    const { score, label } = aggregateRiskScore(risks);
    expect(risks.map((risk) => risk.id)).toEqual(["impossible", "single-approver"]);
    expect(score).toBe(60);
    expect(label).toBe("high");
  });
});
