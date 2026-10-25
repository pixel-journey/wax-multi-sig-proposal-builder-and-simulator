import type { ThresholdSnapshot } from "./types";

/** Weight still needed to meet threshold (0 if already met). */
export function weightNeeded(snap: ThresholdSnapshot): number {
  return Math.max(0, snap.threshold - snap.approvedWeight);
}

export function remainingLine(snap: ThresholdSnapshot): string {
  if (snap.thresholdMet) return "Threshold already met under this simulation.";
  const need = weightNeeded(snap);
  return `Need ${need} more weight (${snap.approvedWeight}/${snap.threshold}).`;
}
