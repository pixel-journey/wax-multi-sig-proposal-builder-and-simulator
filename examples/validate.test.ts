import { describe, expect, it } from "vitest";
import { isProposalName, validateDraft } from "./validate";

describe("validate", () => {
  it("accepts proposal names", () => {
    expect(isProposalName("ops-2of3".replace(/-/g, ""))).toBe(true);
    expect(isProposalName("ops2of3")).toBe(true);
    expect(isProposalName("BAD_NAME")).toBe(false);
  });

  it("flags bad proposer", () => {
    const issues = validateDraft({
      proposer: "Alice",
      proposalName: "pay1",
      threshold: 2,
      accounts: ["bob.wam"],
    });
    expect(issues.some((i) => i.field === "proposer")).toBe(true);
  });
});
