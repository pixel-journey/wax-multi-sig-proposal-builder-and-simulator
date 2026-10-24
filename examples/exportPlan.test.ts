import { describe, expect, it } from "vitest";
import { exportProposalJson, exportProposalMarkdown } from "./exportPlan";

describe("exportPlan", () => {
  it("includes WharfKit and threshold", () => {
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
  });
});
