import { describe, expect, it } from "vitest";
import { emptyUndo, popUndo, pushUndo, undoDepth } from "./undo";

describe("undo", () => {
  it("restores snapshot", () => {
    let stack = emptyUndo();
    stack = pushUndo(stack, {
      proposer: "alice",
      config: { proposalName: "a", threshold: 1, approvals: [] },
    });
    expect(undoDepth(stack)).toBe(1);
    const u = popUndo(stack);
    expect(u.ok).toBe(true);
    if (u.ok) expect(u.snap.proposer).toBe("alice");
  });
});
