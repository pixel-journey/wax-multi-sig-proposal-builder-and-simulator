import { describe, expect, it } from "vitest";
import { approveAccounts, clearApprovals, setAllApproved } from "./bulkApprovals";

describe("bulkApprovals", () => {
  const base = [
    { account: "a", weight: 1, hasApproved: false },
    { account: "b", weight: 1, hasApproved: false },
  ];

  it("sets all", () => {
    expect(setAllApproved(base, true).every((a) => a.hasApproved)).toBe(true);
  });

  it("approves subset", () => {
    const r = approveAccounts(base, ["b"]);
    expect(r.find((a) => a.account === "b")?.hasApproved).toBe(true);
    expect(r.find((a) => a.account === "a")?.hasApproved).toBe(false);
  });

  it("clears", () => {
    expect(clearApprovals(setAllApproved(base, true)).every((a) => !a.hasApproved)).toBe(
      true
    );
  });
});
