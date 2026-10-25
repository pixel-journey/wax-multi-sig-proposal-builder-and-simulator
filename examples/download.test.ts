import { describe, expect, it } from "vitest";
import { exportBasename, sanitizeFilenamePart } from "./download";

describe("download helpers", () => {
  it("sanitizes", () => {
    expect(sanitizeFilenamePart("Ops 2of3!")).toBe("ops-2of3");
  });
  it("basename includes proposal", () => {
    const b = exportBasename("msig", "pay1");
    expect(b.startsWith("msig-pay1-")).toBe(true);
  });
});
