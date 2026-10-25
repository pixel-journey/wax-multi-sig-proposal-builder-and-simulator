import { describe, expect, it } from "vitest";
import {
  suggestMajorityThreshold,
  suggestSupermajorityThreshold,
  totalApproverWeight,
} from "./majorityThreshold";

describe("majorityThreshold", () => {
  const three = [
    { account: "a", weight: 1 },
    { account: "b", weight: 1 },
    { account: "c", weight: 1 },
  ];
  it("sums weights", () => {
    expect(totalApproverWeight(three)).toBe(3);
  });
  it("majority of 3 is 2", () => {
    expect(suggestMajorityThreshold(three)).toBe(2);
  });
  it("supermajority of 3 is 2", () => {
    expect(suggestSupermajorityThreshold(three)).toBe(2);
  });
  it("empty defaults to 1", () => {
    expect(suggestMajorityThreshold([])).toBe(1);
  });
});
