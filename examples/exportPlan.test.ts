import { describe, expect, it } from "vitest";
import { exportProposalJson, exportProposalMarkdown } from "./exportPlan";

describe("exportPlan", () => {
  it("includes WharfKit, risk score, validation", () => {
    const md = exportProposalMarkdown(
      {
        proposalName: "pay1",
        threshold: 2,
        approvals: [
          { account: "a", weight: 1, hasApproved: true },
          { account: "b", weight: 1, hasApproved: false },
        ],
      },
      "alice"
    );
    expect(md).toContain("WharfKit");
    expect(md).toContain("pay1");
    expect(md).toContain("risk");
    const j = JSON.parse(
      exportProposalJson(
        {
          proposalName: "pay1",
          threshold: 2,
          approvals: [{ account: "a", weight: 1 }],
        },
        "alice"
      )
    );
    expect(j.msigSketch.proposer).toBe("alice");
    expect(j.riskScore).toBeDefined();
    expect(Array.isArray(j.validation)).toBe(true);
  });
});
