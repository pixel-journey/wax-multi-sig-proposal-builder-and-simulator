import { describe, expect, it } from "vitest";
import { filterProposalsByName, normalizeProposalRows } from "./proposalRows";

describe("proposalRows", () => {
  it("normalizes and filters", () => {
    const rows = normalizeProposalRows([
      { proposal_name: "ops2of3", packed_transaction: "abc" },
      { proposal_name: "other" },
      { junk: true },
    ]);
    expect(rows).toHaveLength(2);
    expect(filterProposalsByName(rows, "ops")).toHaveLength(1);
  });
});
