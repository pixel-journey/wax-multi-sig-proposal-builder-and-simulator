import { describe, expect, it } from "vitest";
import { buildProposeEnvelope } from "./proposeTrx";

describe("proposeTrx", () => {
  it("builds outer propose with inner transfer", () => {
    const env = buildProposeEnvelope({
      proposer: "alice.wam",
      proposalName: "pay1",
      requested: [{ actor: "bob.wam", permission: "active" }],
      inner: {
        from: "alice.wam",
        to: "bob.wam",
        quantity: "1.00000000 WAX",
      },
    });
    expect(env.outer.name).toBe("propose");
    expect(env.innerActions[0].name).toBe("transfer");
  });
});
