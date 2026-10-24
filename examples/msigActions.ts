/**
 * eosio.msig action payload sketches for WharfKit session.transact.
 * Inner `trx` for propose must be serialized by the host (WharfKit API).
 * These builders cover the outer msig envelope accounts/names/data shapes.
 */

export type Auth = { actor: string; permission: string };

export interface ChainAction {
  account: string;
  name: string;
  authorization: Auth[];
  data: Record<string, unknown>;
}

const MSIG = "eosio.msig";

export function buildProposeAction(input: {
  proposer: string;
  proposalName: string;
  requested: Auth[];
  /** Host supplies packed/serialized transaction object from WharfKit */
  trx: Record<string, unknown>;
  permission?: string;
}): ChainAction {
  return {
    account: MSIG,
    name: "propose",
    authorization: [
      { actor: input.proposer, permission: input.permission ?? "active" },
    ],
    data: {
      proposer: input.proposer,
      proposal_name: input.proposalName,
      requested: input.requested,
      trx: input.trx,
    },
  };
}

export function buildApproveAction(input: {
  proposer: string;
  proposalName: string;
  level: Auth;
  /** Optional proposal hash when required by chain version */
  proposal_hash?: string;
}): ChainAction {
  const data: Record<string, unknown> = {
    proposer: input.proposer,
    proposal_name: input.proposalName,
    level: input.level,
  };
  if (input.proposal_hash) data.proposal_hash = input.proposal_hash;
  return {
    account: MSIG,
    name: "approve",
    authorization: [input.level],
    data,
  };
}

export function buildUnapproveAction(input: {
  proposer: string;
  proposalName: string;
  level: Auth;
}): ChainAction {
  return {
    account: MSIG,
    name: "unapprove",
    authorization: [input.level],
    data: {
      proposer: input.proposer,
      proposal_name: input.proposalName,
      level: input.level,
    },
  };
}

export function buildCancelAction(input: {
  proposer: string;
  proposalName: string;
  canceler: string;
  permission?: string;
}): ChainAction {
  return {
    account: MSIG,
    name: "cancel",
    authorization: [
      { actor: input.canceler, permission: input.permission ?? "active" },
    ],
    data: {
      proposer: input.proposer,
      proposal_name: input.proposalName,
      canceler: input.canceler,
    },
  };
}

export function buildExecAction(input: {
  proposer: string;
  proposalName: string;
  executer: string;
  permission?: string;
}): ChainAction {
  return {
    account: MSIG,
    name: "exec",
    authorization: [
      { actor: input.executer, permission: input.permission ?? "active" },
    ],
    data: {
      proposer: input.proposer,
      proposal_name: input.proposalName,
      executer: input.executer,
    },
  };
}

/** Example inner transfer the host would pack into propose.trx */
export function exampleInnerTransfer(input: {
  from: string;
  to: string;
  quantity: string;
  memo?: string;
}): ChainAction {
  return {
    account: "eosio.token",
    name: "transfer",
    authorization: [{ actor: input.from, permission: "active" }],
    data: {
      from: input.from,
      to: input.to,
      quantity: input.quantity,
      memo: input.memo ?? "",
    },
  };
}
