/**
 * Normalize eosio.msig proposal table rows for display / filtering.
 * Row shapes vary slightly by chain version — soft parsing only.
 */

export interface NormalizedProposalRow {
  proposalName: string;
  packedTransaction?: string;
  raw: Record<string, unknown>;
}

export function normalizeProposalRows(rows: unknown[]): NormalizedProposalRow[] {
  const out: NormalizedProposalRow[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const name =
      (typeof r.proposal_name === "string" && r.proposal_name) ||
      (typeof r.proposalname === "string" && r.proposalname) ||
      "";
    if (!name) continue;
    out.push({
      proposalName: name,
      packedTransaction:
        typeof r.packed_transaction === "string"
          ? r.packed_transaction
          : undefined,
      raw: r,
    });
  }
  return out;
}

export function filterProposalsByName(
  rows: NormalizedProposalRow[],
  query: string
): NormalizedProposalRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) => r.proposalName.toLowerCase().includes(q));
}
