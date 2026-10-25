import { describe, expect, it } from "vitest";
import {
  decodeSharePayload,
  encodeSharePayload,
  buildShareSearchParam,
} from "./shareUrl";

describe("shareUrl", () => {
  it("roundtrips", () => {
    const payload = {
      proposer: "alice.wam",
      config: {
        proposalName: "pay1",
        threshold: 2,
        approvals: [
          { account: "bob.wam", weight: 1, hasApproved: true, permission: "active" },
        ],
        notes: "ops",
      },
    };
    const enc = encodeSharePayload(payload);
    const dec = decodeSharePayload(enc);
    expect(dec?.proposer).toBe("alice.wam");
    expect(dec?.config.proposalName).toBe("pay1");
    expect(dec?.config.approvals[0].account).toBe("bob.wam");
    expect(buildShareSearchParam(payload)).toContain("msig=");
  });
});
