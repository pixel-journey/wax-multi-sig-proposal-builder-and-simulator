import type { Approval } from "./types";

/** Trim + lowercase permission; empty becomes `active`. */
export function normalizePermissionLabel(perm?: string): string {
  const p = (perm ?? "").trim().toLowerCase();
  return p || "active";
}

export function normalizeAllPermissions(approvals: Approval[]): Approval[] {
  return (approvals ?? []).map((a) => ({
    ...a,
    permission: normalizePermissionLabel(a.permission),
  }));
}
