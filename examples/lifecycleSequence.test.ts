import { describe, expect, it } from "vitest";
import { buildLifecycleSketch, lifecycleToJson } from "./lifecycleSequence";

describe("lifecycleSequence", () => {
  it("builds approve + exec + optional cancel/unapprove", () => {
    const s = buildLifecycleSketch({
      proposer: "alice.wam",
      proposalName: "pay1",
      approvals: [{ account: "bob.wam", weight: 1, hasApproved: true }],
      includeCancel: true,
      includeUnapprove: true,
    });
    expect(s.approve).toHaveLength(1);
    expect(s.unapprove).toHaveLength(1);
    expect(s.unapprove![0].name).toBe("unapprove");
    expect(s.exec.name).toBe("exec");
    expect(s.cancel?.name).toBe("cancel");
    expect(lifecycleToJson(s)).toContain("unapprove");
  });
});
