import { describe, expect, it } from "vitest";
import {
  normalizeAllPermissions,
  normalizePermissionLabel,
} from "./normalizePermissions";

describe("normalizePermissions", () => {
  it("defaults empty to active", () => {
    expect(normalizePermissionLabel("")).toBe("active");
    expect(normalizePermissionLabel(" Owner ")).toBe("owner");
  });
  it("maps list", () => {
    const out = normalizeAllPermissions([
      { account: "a", weight: 1, permission: "" },
    ]);
    expect(out[0].permission).toBe("active");
  });
});
