import { describe, expect, it } from "vitest";
import { probeGetInfo } from "./getInfoProbe";

describe("getInfoProbe", () => {
  it("exports function", () => {
    expect(typeof probeGetInfo).toBe("function");
  });
});
