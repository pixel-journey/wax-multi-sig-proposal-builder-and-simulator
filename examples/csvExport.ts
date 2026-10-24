import type { Approval, ProposalConfig } from "./types";
import { computeThresholdSnapshot } from "./engines";

function esc(cell: string): string {
  if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

export function exportApproversCsv(
  config: ProposalConfig,
  proposer: string
): string {
  const snap = computeThresholdSnapshot(config);
  const header =
    "proposer,proposal_name,threshold,account,weight,hasApproved,progress_percent,threshold_met";
  const rows = (config.approvals ?? []).map((a: Approval) =>
    [
      proposer,
      config.proposalName,
      String(config.threshold),
      a.account,
      String(a.weight),
      a.hasApproved ? "1" : "0",
      String(snap.progressPercent),
      snap.thresholdMet ? "1" : "0",
    ]
      .map((c) => esc(c))
      .join(",")
  );
  return [header, ...rows].join("\n") + "\n";
}
