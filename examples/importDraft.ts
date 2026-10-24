import type { Approval, ProposalConfig } from "./types";
import { isAntelopeName, isProposalName } from "./validate";

export type ImportResult =
  | { ok: true; proposer: string; config: ProposalConfig }
  | { ok: false; reason: string };

function asApprovals(raw: unknown): Approval[] | null {
  if (!Array.isArray(raw)) return null;
  const out: Approval[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const a = item as Record<string, unknown>;
    if (typeof a.account !== "string" || typeof a.weight !== "number") return null;
    out.push({
      account: a.account,
      weight: a.weight,
      hasApproved: Boolean(a.hasApproved),
      permission:
        typeof a.permission === "string" ? a.permission : "active",
    });
  }
  return out;
}

/** Accepts full export JSON or a minimal { proposer, config } blob. */
export function importDraftJson(raw: string): ImportResult {
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const proposer =
      typeof data.proposer === "string"
        ? data.proposer
        : typeof (data as { config?: unknown }).config === "object" &&
            data.config &&
            typeof (data.config as { proposer?: string }).proposer === "string"
          ? (data.config as { proposer: string }).proposer
          : "";

    const cfgSrc =
      data.config && typeof data.config === "object"
        ? (data.config as Record<string, unknown>)
        : data;

    const proposalName =
      typeof cfgSrc.proposalName === "string" ? cfgSrc.proposalName : "";
    const threshold =
      typeof cfgSrc.threshold === "number" ? cfgSrc.threshold : NaN;
    const approvals = asApprovals(cfgSrc.approvals);
    if (!approvals)
      return { ok: false, reason: "approvals array missing or invalid" };
    if (!proposer || !isAntelopeName(proposer))
      return { ok: false, reason: "invalid proposer" };
    if (!isProposalName(proposalName))
      return { ok: false, reason: "invalid proposalName" };
    if (!Number.isFinite(threshold) || threshold < 1)
      return { ok: false, reason: "invalid threshold" };

    return {
      ok: true,
      proposer,
      config: {
        proposalName,
        threshold,
        approvals,
        actionSummary:
          typeof cfgSrc.actionSummary === "string"
            ? cfgSrc.actionSummary
            : undefined,
      },
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "JSON parse failed",
    };
  }
}
