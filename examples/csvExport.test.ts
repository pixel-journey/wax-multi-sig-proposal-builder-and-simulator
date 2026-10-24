import { describe, expect, it } from "vitest";
import { exportApproversCsv } from "./csvExport";

describe("csvExport", () => {
  it("exports rows", () => {
    const csv = exportApproversCsv(
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
    expect(csv).toContain("proposer,proposal_name");
    expect(csv).toContain("alice");
    expect(csv).toContain("pay1");
  });
});
