import { describe, expect, it } from "vitest";
import { importDraftJson } from "./importDraft";

describe("importDraftJson", () => {
  it("imports minimal blob", () => {
    const r = importDraftJson(
      JSON.stringify({
        proposer: "alice.wam",
        config: {
          proposalName: "pay1",
          threshold: 2,
          approvals: [{ account: "bob.wam", weight: 1 }],
        },
      })
    );
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.config.proposalName).toBe("pay1");
  });

  it("rejects bad name", () => {
    const r = importDraftJson(
      JSON.stringify({
        proposer: "alice.wam",
        config: {
          proposalName: "BAD",
          threshold: 1,
          approvals: [{ account: "bob.wam", weight: 1 }],
        },
      })
    );
    expect(r.ok).toBe(false);
  });
});
