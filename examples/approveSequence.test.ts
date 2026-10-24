import { describe, expect, it } from "vitest";
import { buildApproveSequence, sequenceSummary } from "./approveSequence";

describe("approveSequence", () => {
  it("builds only approved by default", () => {
    const actions = buildApproveSequence({
      proposer: "alice",
      proposalName: "pay1",
      approvals: [
        { account: "a", weight: 1, hasApproved: true },
        { account: "b", weight: 1, hasApproved: false },
      ],
    });
    expect(actions).toHaveLength(1);
    expect(actions[0].data.level).toEqual({ actor: "a", permission: "active" });
  });

  it("forceAll", () => {
    const actions = buildApproveSequence({
      proposer: "alice",
      proposalName: "pay1",
      approvals: [
        { account: "a", weight: 1 },
        { account: "b", weight: 1 },
      ],
      forceAll: true,
    });
    expect(actions).toHaveLength(2);
    expect(sequenceSummary(actions)).toContain("approve");
  });
});
