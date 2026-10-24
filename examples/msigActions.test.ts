import { describe, expect, it } from "vitest";
import {
  buildApproveAction,
  buildExecAction,
  buildProposeAction,
  exampleInnerTransfer,
} from "./msigActions";

describe("msigActions", () => {
  it("builds propose envelope", () => {
    const inner = exampleInnerTransfer({
      from: "treasury",
      to: "bob.wam",
      quantity: "1.00000000 WAX",
    });
    const a = buildProposeAction({
      proposer: "alice.wam",
      proposalName: "pay1",
      requested: [
        { actor: "alice.wam", permission: "active" },
        { actor: "bob.wam", permission: "active" },
      ],
      trx: { actions: [inner] },
    });
    expect(a.account).toBe("eosio.msig");
    expect(a.name).toBe("propose");
    expect(a.data.proposal_name).toBe("pay1");
  });

  it("builds approve and exec", () => {
    const ap = buildApproveAction({
      proposer: "alice.wam",
      proposalName: "pay1",
      level: { actor: "bob.wam", permission: "active" },
    });
    expect(ap.name).toBe("approve");
    const ex = buildExecAction({
      proposer: "alice.wam",
      proposalName: "pay1",
      executer: "carol.wam",
    });
    expect(ex.name).toBe("exec");
  });
});
