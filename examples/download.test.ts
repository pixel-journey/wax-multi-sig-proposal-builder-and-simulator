import { describe, expect, it } from "vitest";
import { exportBasename } from "./download";

describe("download", () => {
  it("basename", () => {
    expect(exportBasename("msig")).toMatch(/^msig-\d{4}-/);
  });
});
