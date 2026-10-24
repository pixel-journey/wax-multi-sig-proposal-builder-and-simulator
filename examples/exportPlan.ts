import {
  analyzeProposalRisks,
  computeThresholdSnapshot,
} from "./engines";
import { aggregateRiskScore } from "./riskScore";
import type { ProposalConfig } from "./types";
import { sketchProposeMemo } from "./wharfPropose.sketch";
import { validateDraft } from "./validate";

export function exportProposalMarkdown(
  config: ProposalConfig,
  proposer: string
): string {
  const snap = computeThresholdSnapshot(config);
  const risks = analyzeProposalRisks(config);
  const { score, label } = aggregateRiskScore(risks);
  const issues = validateDraft({
    proposer,
    proposalName: config.proposalName,
    threshold: config.threshold,
    accounts: (config.approvals ?? []).map((a) => a.account),
  });
  const sketch = sketchProposeMemo({
    proposer,
    proposalName: config.proposalName || "unnamed",
    requestedAccounts: (config.approvals ?? []).map((a) => a.account),
  });

  const lines = [
    `# Multi-sig proposal — ${config.proposalName || "unnamed"}`,
    "",
    `> Proposer: \`${proposer}\` · threshold ${config.threshold} · progress ${snap.progressPercent}% · risk **${score}** (${label})`,
    "",
    config.actionSummary ? `**Actions:** ${config.actionSummary}\n` : "",
    "## Approvers",
    "",
  ];

  for (const a of config.approvals ?? []) {
    lines.push(
      `- ${a.hasApproved ? "✓" : "○"} \`${a.account}\` weight ${a.weight}`
    );
  }

  lines.push(
    "",
    `Approved weight: **${snap.approvedWeight}** / ${snap.threshold} (total available ${snap.totalWeight})`,
    snap.thresholdMet ? "\n**Threshold met** under this simulation." : "",
    "",
    "## Validation",
    ""
  );
  if (issues.length === 0) lines.push("- No validation errors");
  else for (const i of issues) lines.push(`- **${i.level}** ${i.field}: ${i.message}`);

  lines.push("", "## Risks", "");
  for (const r of risks) {
    lines.push(`- **${r.level}** (${r.id}): ${r.message}`);
  }

  lines.push(
    "",
    "## eosio.msig sketch (host + WharfKit)",
    "",
    "```json",
    JSON.stringify(sketch, null, 2),
    "```",
    "",
    "Live path: build inner trx → `eosio.msig::propose` / `approve` / `exec` via **WharfKit** `session.transact`.",
    ""
  );
  return lines.join("\n");
}

export function exportProposalJson(
  config: ProposalConfig,
  proposer: string
): string {
  const risks = analyzeProposalRisks(config);
  return JSON.stringify(
    {
      trustLabel: "educational-reference",
      proposer,
      snapshot: computeThresholdSnapshot(config),
      riskScore: aggregateRiskScore(risks),
      risks,
      validation: validateDraft({
        proposer,
        proposalName: config.proposalName,
        threshold: config.threshold,
        accounts: (config.approvals ?? []).map((a) => a.account),
      }),
      config,
      msigSketch: sketchProposeMemo({
        proposer,
        proposalName: config.proposalName || "unnamed",
        requestedAccounts: (config.approvals ?? []).map((a) => a.account),
      }),
    },
    null,
    2
  );
}
