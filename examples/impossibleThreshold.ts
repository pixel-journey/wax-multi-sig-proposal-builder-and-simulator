import type { ProposalConfig } from "./types";

export type ThresholdFeasibility =
  | { ok: true }
  | { ok: false; reason: string; totalWeight: number; threshold: number };

export function checkThresholdFeasibility(
  config: ProposalConfig
): ThresholdFeasibility {
  const total = (config.approvals ?? []).reduce(
    (s, a) => s + (Number.isFinite(a.weight) ? a.weight : 0),
    0
  );
  const threshold = config.threshold;
  if (threshold <= 0)
    return {
      ok: false,
      reason: "Threshold must be at least 1",
      totalWeight: total,
      threshold,
    };
  if (total <= 0)
    return {
      ok: false,
      reason: "Add approvers with positive weight",
      totalWeight: total,
      threshold,
    };
  if (threshold > total)
    return {
      ok: false,
      reason: `Threshold ${threshold} exceeds total weight ${total} — proposal can never execute under this set`,
      totalWeight: total,
      threshold,
    };
  return { ok: true };
}
