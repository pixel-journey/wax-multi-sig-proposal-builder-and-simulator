import { describe, expect, it } from "vitest";
import {
  buildSingleApprove,
  buildSingleCancel,
  buildSingleExec,
  buildSinglePropose,
  buildSingleUnapprove,
} from "./singleActions";

describe("singleActions", () => {
  it("names", () => {
    expect(
      buildSinglePropose({
        proposer: "a",
        proposalName: "p",
        approvals: [{ account: "b", weight: 1 }],
      }).name
    ).toBe("propose");
    expect(
      buildSingleApprove({
        proposer: "a",
        proposalName: "p",
        account: "b",
      }).name
    ).toBe("approve");
    expect(
      buildSingleUnapprove({
        proposer: "a",
        proposalName: "p",
        account: "b",
      }).name
    ).toBe("unapprove");
    expect(
      buildSingleExec({ proposer: "a", proposalName: "p" }).name
    ).toBe("exec");
    expect(
      buildSingleCancel({ proposer: "a", proposalName: "p" }).name
    ).toBe("cancel");
  });
});
