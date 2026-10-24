import type { Approval } from "./types";
import { buildApproveAction, type ChainAction } from "./msigActions";

/**
 * Ordered approve actions for accounts that have hasApproved=true in simulation,
 * or all approvers if forceAll.
 */
export function buildApproveSequence(input: {
  proposer: string;
  proposalName: string;
  approvals: Approval[];
  forceAll?: boolean;
}): ChainAction[] {
  const list = input.forceAll
    ? input.approvals
    : input.approvals.filter((a) => a.hasApproved);
  return list.map((a) =>
    buildApproveAction({
      proposer: input.proposer,
      proposalName: input.proposalName,
      level: {
        actor: a.account,
        permission: a.permission ?? "active",
      },
    })
  );
}

export function sequenceSummary(actions: ChainAction[]): string {
  return actions
    .map(
      (a, i) =>
        `${i + 1}. ${a.name} by ${(a.authorization[0] && a.authorization[0].actor) || "?"}`
    )
    .join("\n");
}
