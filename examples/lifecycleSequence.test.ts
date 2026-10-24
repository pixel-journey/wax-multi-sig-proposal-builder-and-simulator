import { describe, expect, it } from "vitest";
import { buildLifecycleSketch } from "./lifecycleSequence";

describe("lifecycleSequence", () => {
  it("builds approve + exec + optional cancel", () => {
    const s = buildLifecycleSketch({
      proposer: "alice.wam",
      proposalName: "pay1",
      approvals: [{ account: "bob.wam", weight: 1 }],
      includeCancel: true,
    });
    expect(s.approve).toHaveLength(1);
    expect(s.exec.name).toBe("exec");
    expect(s.cancel?.name).toBe("cancel");
  });
});
