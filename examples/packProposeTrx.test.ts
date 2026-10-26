import { describe, expect, it } from "vitest";
import { packProposeTransfer } from "./packProposeTrx";

describe("packProposeTransfer", () => {
  it("is a function (live RPC soft-tested in app)", () => {
    expect(typeof packProposeTransfer).toBe("function");
  });
});
