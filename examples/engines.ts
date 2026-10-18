/**
 * Pure multi-sig threshold and risk engines.
 * Educational — verify against live account permissions before signing.
 */

import type {
  Approval,
  ProposalConfig,
  Risk,
  ThresholdSnapshot,
} from "./types";

export function computeThresholdSnapshot(
  config: ProposalConfig
): ThresholdSnapshot {
  const approvals = config.approvals ?? [];
  const totalWeight = approvals.reduce(
    (s, a) => s + Math.max(0, a.weight),
    0
  );
  const approvedWeight = approvals
    .filter((a) => a.hasApproved)
    .reduce((s, a) => s + Math.max(0, a.weight), 0);
  const threshold = Math.max(0, config.threshold);
  const remainingWeight = Math.max(0, threshold - approvedWeight);
  const thresholdMet = approvedWeight >= threshold && threshold > 0;
  const approvalCount = approvals.filter((a) => a.hasApproved).length;
  const pendingCount = approvals.length - approvalCount;
  const progressPercent =
    threshold <= 0
      ? 0
      : Math.min(100, Math.round((approvedWeight / threshold) * 100));

  return {
    totalWeight,
    approvedWeight,
    remainingWeight,
    threshold,
    thresholdMet,
    approvalCount,
    pendingCount,
    progressPercent,
  };
}

export function analyzeProposalRisks(config: ProposalConfig): Risk[] {
  const risks: Risk[] = [];
  const snap = computeThresholdSnapshot(config);
  const approvals = config.approvals ?? [];

  if (approvals.length === 0) {
    risks.push({
      id: "no-approvers",
      level: "high",
      trigger: "approvals",
      message: "No approvers configured — proposal cannot gather weight.",
    });
  }

  if (config.threshold <= 0) {
    risks.push({
      id: "bad-threshold",
      level: "high",
      trigger: "threshold",
      message: "Threshold must be greater than zero.",
    });
  }

  if (snap.totalWeight < config.threshold) {
    risks.push({
      id: "impossible",
      level: "high",
      trigger: "threshold",
      message: `Total approver weight (${snap.totalWeight}) is below threshold (${config.threshold}) — execution is impossible even if everyone approves.`,
    });
  }

  if (approvals.length === 1 && config.threshold > 0) {
    risks.push({
      id: "single-approver",
      level: "high",
      trigger: "approvals",
      message:
        "Only one approver — this is not meaningful multi-sig resilience (key loss = stuck or captured).",
    });
  }

  const maxWeight = Math.max(0, ...approvals.map((a) => a.weight));
  if (maxWeight >= config.threshold && approvals.length > 1) {
    risks.push({
      id: "single-key-threshold",
      level: "medium",
      trigger: "weight",
      message:
        "One approver alone meets the threshold — multi-sig does not require collusion.",
    });
  }

  if (!snap.thresholdMet && snap.remainingWeight > 0 && snap.pendingCount === 0) {
    risks.push({
      id: "stuck",
      level: "high",
      trigger: "approvedWeight",
      message:
        "Threshold not met and no pending approvers left — proposal is stuck under current state.",
    });
  }

  if (risks.length === 0) {
    risks.push({
      id: "ok",
      level: "low",
      trigger: "overall",
      message:
        "No structural red flags under these weights. Still verify live permissions and action payloads before broadcast.",
    });
  }

  return risks;
}

export function toggleApproval(
  approvals: Approval[],
  account: string
): Approval[] {
  return approvals.map((a) =>
    a.account === account ? { ...a, hasApproved: !a.hasApproved } : a
  );
}
