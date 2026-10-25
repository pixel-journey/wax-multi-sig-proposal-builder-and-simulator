import { describe, expect, it } from "vitest";
import { sortApprovers } from "./sortApprovers";

describe("sortApprovers", () => {
  const sample = [
    { account: "bob", weight: 1 },
    { account: "alice", weight: 3 },
    { account: "carol", weight: 2 },
  ];
  it("weight-desc", () => {
    expect(sortApprovers(sample, "weight-desc").map((a) => a.account)).toEqual([
      "alice",
      "carol",
      "bob",
    ]);
  });
  it("name-asc", () => {
    expect(sortApprovers(sample, "name-asc").map((a) => a.account)).toEqual([
      "alice",
      "bob",
      "carol",
    ]);
  });
});
