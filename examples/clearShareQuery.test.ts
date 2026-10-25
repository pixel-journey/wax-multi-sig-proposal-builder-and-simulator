import { describe, expect, it } from "vitest";
import { clearShareQuery } from "./clearShareQuery";

describe("clearShareQuery", () => {
  it("is a no-op without window", () => {
    expect(() => clearShareQuery()).not.toThrow();
  });
});
