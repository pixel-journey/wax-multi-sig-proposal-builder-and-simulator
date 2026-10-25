import {
  buildApproveAction,
  buildCancelAction,
  buildExecAction,
  buildProposeAction,
  buildUnapproveAction,
  exampleInnerTransfer,
  type ChainAction,
} from "./msigActions";
import type { Approval } from "./types";

export function buildSinglePropose(input: {
  proposer: string;
  proposalName: string;
  approvals: Approval[];
  actionSummary?: string;
}): ChainAction {
  const requested = input.approvals.map((a) => ({
    actor: a.account,
    permission: a.permission ?? "active",
  }));
  const inner = exampleInnerTransfer({
    from: input.proposer,
    to: "bob.wam",
    quantity: "1.00000000 WAX",
    memo: input.actionSummary ?? "",
  });
  return buildProposeAction({
    proposer: input.proposer,
    proposalName: input.proposalName,
    requested,
    trx: { actions: [inner], note: "Host must serialize trx via WharfKit" },
  });
}

export function buildSingleApprove(input: {
  proposer: string;
  proposalName: string;
  account: string;
  permission?: string;
  proposalHash?: string;
}): ChainAction {
  return buildApproveAction({
    proposer: input.proposer,
    proposalName: input.proposalName,
    level: {
      actor: input.account,
      permission: input.permission ?? "active",
    },
    proposal_hash: input.proposalHash,
  });
}

export function buildSingleUnapprove(input: {
  proposer: string;
  proposalName: string;
  account: string;
  permission?: string;
}): ChainAction {
  return buildUnapproveAction({
    proposer: input.proposer,
    proposalName: input.proposalName,
    level: {
      actor: input.account,
      permission: input.permission ?? "active",
    },
  });
}

export function buildSingleExec(input: {
  proposer: string;
  proposalName: string;
  executer?: string;
}): ChainAction {
  return buildExecAction({
    proposer: input.proposer,
    proposalName: input.proposalName,
    executer: input.executer ?? input.proposer,
  });
}

export function buildSingleCancel(input: {
  proposer: string;
  proposalName: string;
  canceler?: string;
}): ChainAction {
  return buildCancelAction({
    proposer: input.proposer,
    proposalName: input.proposalName,
    canceler: input.canceler ?? input.proposer,
  });
}
