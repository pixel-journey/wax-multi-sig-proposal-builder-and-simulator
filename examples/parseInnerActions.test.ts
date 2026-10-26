import { describe, expect, it } from "vitest";
import { parseInnerActionsJson } from "./parseInnerActions";

const fb = {
  from: "alice.wam",
  to: "bob.wam",
  quantity: "1.00000000 WAX",
};

describe("parseInnerActionsJson", () => {
  it("fallback transfer when empty", () => {
    const r = parseInnerActionsJson("", fb);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.actions[0].name).toBe("transfer");
  });
  it("parses multi action array", () => {
    const r = parseInnerActionsJson(
      JSON.stringify([
        {
          account: "eosio.token",
          name: "transfer",
          authorization: [{ actor: "alice.wam", permission: "active" }],
          data: { from: "alice.wam", to: "bob.wam", quantity: "1.00000000 WAX", memo: "a" },
        },
        {
          account: "eosio.token",
          name: "transfer",
          data: { from: "alice.wam", to: "carol.wam", quantity: "0.00000001 WAX", memo: "b" },
        },
      ]),
      fb
    );
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.actions).toHaveLength(2);
  });
});
