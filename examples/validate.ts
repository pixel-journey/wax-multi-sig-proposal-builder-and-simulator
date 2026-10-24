/** Antelope name + eosio.msig proposal_name rules (educational). */

const ACCOUNT = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z1-5.]{1,12}$/;
/** proposal_name is often treated like an Antelope name (≤12 a-z1-5.) */
const PROPOSAL = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z1-5.]{1,12}$/;

export function isAntelopeName(value: string): boolean {
  return ACCOUNT.test(value.trim());
}

export function isProposalName(value: string): boolean {
  return PROPOSAL.test(value.trim());
}

export interface ValidationIssue {
  field: string;
  level: "error" | "warn";
  message: string;
}

export function validateDraft(input: {
  proposer: string;
  proposalName: string;
  threshold: number;
  accounts: string[];
}): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!isAntelopeName(input.proposer))
    issues.push({
      field: "proposer",
      level: "error",
      message: "Proposer must be a valid Antelope account name",
    });
  if (!isProposalName(input.proposalName))
    issues.push({
      field: "proposalName",
      level: "error",
      message:
        "Proposal name must be ≤12 chars [a-z1-5.] (no leading/trailing/double dots)",
    });
  if (!Number.isFinite(input.threshold) || input.threshold < 1)
    issues.push({
      field: "threshold",
      level: "error",
      message: "Threshold must be ≥ 1",
    });
  for (const a of input.accounts) {
    if (!isAntelopeName(a))
      issues.push({
        field: "approvals",
        level: "error",
        message: `Invalid approver name: ${a}`,
      });
  }
  if (input.accounts.length > 0 && new Set(input.accounts).size !== input.accounts.length)
    issues.push({
      field: "approvals",
      level: "warn",
      message: "Duplicate approver accounts",
    });
  return issues;
}
