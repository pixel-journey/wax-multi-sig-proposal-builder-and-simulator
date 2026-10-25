import type { Approval } from "./types";

export type ApproverSort = "weight-desc" | "weight-asc" | "name-asc";

export function sortApprovers(
  approvals: Approval[],
  mode: ApproverSort = "weight-desc"
): Approval[] {
  const list = [...(approvals ?? [])];
  if (mode === "name-asc") {
    return list.sort((a, b) => a.account.localeCompare(b.account));
  }
  if (mode === "weight-asc") {
    return list.sort(
      (a, b) => a.weight - b.weight || a.account.localeCompare(b.account)
    );
  }
  return list.sort(
    (a, b) => b.weight - a.weight || a.account.localeCompare(b.account)
  );
}
