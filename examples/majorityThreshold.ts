import type { Approval } from "./types";

/** Sum of approver weights (non-finite treated as 0). */
export function totalApproverWeight(approvals: Approval[]): number {
  return (approvals ?? []).reduce(
    (s, a) => s + (Number.isFinite(a.weight) ? Math.max(0, a.weight) : 0),
    0
  );
}

/**
 * Classic majority: floor(total/2) + 1 when total > 0, else 1.
 * Useful starting point for M-of-N style boards.
 */
export function suggestMajorityThreshold(approvals: Approval[]): number {
  const total = totalApproverWeight(approvals);
  if (total <= 0) return 1;
  return Math.floor(total / 2) + 1;
}

/** Supermajority ~2/3 of total weight (ceil). */
export function suggestSupermajorityThreshold(approvals: Approval[]): number {
  const total = totalApproverWeight(approvals);
  if (total <= 0) return 1;
  return Math.max(1, Math.ceil((total * 2) / 3));
}
