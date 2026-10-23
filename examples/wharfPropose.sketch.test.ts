import { describe, expect, it } from "vitest";
import {
  sketchProposeMemo,
  transactActions,
} from "./wharfPropose.sketch";

describe("wharfPropose sketch", () => {
  it("builds requested list", () => {
    const s = sketchProposeMemo({
      proposer: "alice",
      proposalName: "payops1",
      requestedAccounts: ["bob", "carol"],
    });
    expect(s.requested).toHaveLength(2);
  });

  it("transact boundary", async () => {
    const r = await transactActions(
      { transact: async () => ({ transaction_id: "x" }) },
      []
    );
    expect(r.ok).toBe(true);
  });
});
