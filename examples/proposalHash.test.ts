import { describe, expect, it } from "vitest";
import { checkProposalHash } from "./proposalHash";

describe("checkProposalHash", () => {
  it("allows empty", () => {
    expect(checkProposalHash("").ok).toBe(true);
  });
  it("normalizes 0x", () => {
    const r = checkProposalHash("0xDeadBeef");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.normalized).toBe("deadbeef");
  });
  it("rejects non-hex", () => {
    expect(checkProposalHash("zzzzzzzz").ok).toBe(false);
  });
});
