/**
 * Build inner actions + outer eosio.msig::propose payload for WharfKit.
 *
 * Real propose needs a fully formed transaction object for `trx`.
 * Hosts should prefer session.transact with properly typed Action objects;
 * this module documents the educational shape and a JSON-ready envelope.
 */

import {
  buildProposeAction,
  exampleInnerTransfer,
  type Auth,
  type ChainAction,
} from "./msigActions";

export type InnerTransferSpec = {
  from: string;
  to: string;
  quantity: string;
  memo?: string;
};

/** Plain action object WharfKit / Antelope Action.from can accept. */
export function buildInnerTransferPlain(spec: InnerTransferSpec): ChainAction {
  return exampleInnerTransfer(spec);
}

/**
 * Educational propose envelope: outer msig + inner transfer action array.
 * For production, pack `trx` via @wharfkit/antelope Transaction + ABI resolution
 * (or let session.transact form the outer tx while data.trx is a serialized Transaction).
 */
export function buildProposeEnvelope(input: {
  proposer: string;
  proposalName: string;
  requested: Auth[];
  inner: InnerTransferSpec;
  permission?: string;
}): {
  outer: ChainAction;
  innerActions: ChainAction[];
  note: string;
} {
  const innerActions = [buildInnerTransferPlain(input.inner)];
  const outer = buildProposeAction({
    proposer: input.proposer,
    proposalName: input.proposalName,
    requested: input.requested,
    permission: input.permission,
    trx: {
      actions: innerActions,
      note: "Replace with WharfKit-serialized Transaction before broadcast",
    },
  });
  return {
    outer,
    innerActions,
    note: "Use session.transact({ action: outer }) only after trx is a real serialized transaction object from @wharfkit/antelope",
  };
}

/**
 * When a live Session is available, attempt propose as a single outer action.
 * Caller must ensure `trx` inside data is chain-acceptable (serialized).
 */
export async function transactPropose(
  session: {
    transact: (args: { action?: unknown; actions?: unknown[] }) => Promise<unknown>;
  },
  proposeAction: ChainAction
): Promise<{ ok: true; result: unknown } | { ok: false; reason: string }> {
  try {
    const result = await session.transact({ action: proposeAction });
    return { ok: true, result };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "transact failed",
    };
  }
}

export async function transactSimpleAction(
  session: {
    transact: (args: { action?: unknown; actions?: unknown[] }) => Promise<unknown>;
  },
  action: ChainAction
): Promise<{ ok: true; result: unknown } | { ok: false; reason: string }> {
  try {
    const result = await session.transact({ action });
    return { ok: true, result };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "transact failed",
    };
  }
}
