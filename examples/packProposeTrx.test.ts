import { describe, expect, it } from "vitest";
import {
  packProposeTransfer,
  proposalHashFromId,
  transferToPlainAction,
} from "./packProposeTrx";

describe("packProposeTrx helpers", () => {
  it("proposalHashFromId accepts 64-hex", () => {
    const h = "a".repeat(64);
    expect(proposalHashFromId(h)).toBe(h);
    expect(proposalHashFromId("zz")).toBeUndefined();
  });
  it("transferToPlainAction shape", () => {
    const a = transferToPlainAction({
      from: "alice",
      to: "bob",
      quantity: "1.00000000 WAX",
    });
    expect(a.account).toBe("eosio.token");
    expect(a.name).toBe("transfer");
  });
  it("packProposeTransfer is async fn", () => {
    expect(typeof packProposeTransfer).toBe("function");
  });
});
