import { describe, expect, it } from "vitest";
import {
  approvalsByProposerRequest,
  proposalsByProposerRequest,
} from "./msigTableProbe";

describe("msigTableProbe", () => {
  it("builds proposal table request", () => {
    const r = proposalsByProposerRequest("alice.wam");
    expect(r.body.code).toBe("eosio.msig");
    expect(r.body.scope).toBe("alice.wam");
    expect(r.body.table).toBe("proposal");
    expect(r.executed).toBe(false);
  });

  it("builds approvals request", () => {
    const r = approvalsByProposerRequest("alice.wam");
    expect(r.body.table).toBe("approvals");
  });
});
