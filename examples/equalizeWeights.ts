import type { Approval } from "./types";

/** Set every approver weight to the same positive integer (default 1). */
export function equalizeWeights(
  approvals: Approval[],
  weight = 1
): Approval[] {
  const w = Number.isFinite(weight) && weight > 0 ? weight : 1;
  return (approvals ?? []).map((a) => ({ ...a, weight: w }));
}
