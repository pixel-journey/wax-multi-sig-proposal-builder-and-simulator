/**
 * Pack inner Transaction(s) for eosio.msig::propose.data.trx
 * using @wharfkit/antelope (TAPOS + ABI-encoded actions).
 */

import { DEFAULT_RPC, normalizeRpcBase } from "./rpcEndpoints";
import type { Auth, ChainAction } from "./msigActions";
import { buildProposeAction } from "./msigActions";
import type { InnerTransferSpec } from "./proposeTrx";

export type PlainInnerAction = {
  account: string;
  name: string;
  authorization: Auth[];
  data: Record<string, unknown>;
};

export type PackProposeResult =
  | {
      ok: true;
      proposeAction: ChainAction;
      trxObject: Record<string, unknown>;
      transactionId?: string;
      proposalHash?: string;
      note: string;
    }
  | { ok: false; reason: string };

/** Normalize transaction id / checksum for optional approve.proposal_hash. */
export function proposalHashFromId(id?: string): string | undefined {
  if (!id) return undefined;
  const hex = id.replace(/^0x/i, "").toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(hex)) return undefined;
  return hex;
}

export function transferToPlainAction(spec: InnerTransferSpec): PlainInnerAction {
  return {
    account: "eosio.token",
    name: "transfer",
    authorization: [{ actor: spec.from, permission: "active" }],
    data: {
      from: spec.from,
      to: spec.to,
      quantity: spec.quantity,
      memo: spec.memo ?? "",
    },
  };
}

/**
 * Pack one or more plain actions into a TAPOS Transaction for propose.trx.
 * ABI fetched per unique contract account.
 */
export async function packProposeActions(input: {
  proposer: string;
  proposalName: string;
  requested: Auth[];
  actions: PlainInnerAction[];
  rpcBase?: string;
  permission?: string;
  expireSeconds?: number;
}): Promise<PackProposeResult> {
  if (!input.actions?.length) {
    return { ok: false, reason: "at least one inner action required" };
  }
  try {
    const { APIClient, Action, Transaction, Serializer } = await import(
      "@wharfkit/antelope"
    );
    const url = normalizeRpcBase(input.rpcBase ?? DEFAULT_RPC);
    const client = new APIClient({ url });
    const info = await client.v1.chain.get_info();
    const header = info.getTransactionHeader(input.expireSeconds ?? 3600);

    const abiCache = new Map<string, unknown>();
    const encodedActions = [];
    for (const a of input.actions) {
      let abi = abiCache.get(a.account);
      if (!abi) {
        const abiRes = await client.v1.chain.get_abi(a.account);
        if (!abiRes.abi) {
          return { ok: false, reason: `ABI missing for ${a.account}` };
        }
        abi = abiRes.abi;
        abiCache.set(a.account, abi);
      }
      encodedActions.push(
        Action.from(
          {
            account: a.account,
            name: a.name,
            authorization: a.authorization,
            data: a.data,
          },
          abi as never
        )
      );
    }

    const transaction = Transaction.from({
      ...header,
      actions: encodedActions,
    });

    const trxObject = Serializer.objectify(transaction) as Record<
      string,
      unknown
    >;
    const transactionId =
      typeof (transaction as { id?: { toString(): string } }).id?.toString ===
      "function"
        ? String((transaction as { id: { toString(): string } }).id)
        : undefined;
    const proposalHash = proposalHashFromId(transactionId);

    const proposeAction = buildProposeAction({
      proposer: input.proposer,
      proposalName: input.proposalName,
      requested: input.requested,
      permission: input.permission,
      trx: trxObject,
    });

    return {
      ok: true,
      proposeAction,
      trxObject,
      transactionId,
      proposalHash,
      note: `Packed ${encodedActions.length} action(s) with TAPOS + ABI; proposal_hash=${proposalHash ?? "n/a"}`,
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "packProposeActions failed",
    };
  }
}

/** Convenience: single eosio.token::transfer inner action. */
export async function packProposeTransfer(input: {
  proposer: string;
  proposalName: string;
  requested: Auth[];
  inner: InnerTransferSpec;
  rpcBase?: string;
  permission?: string;
  expireSeconds?: number;
}): Promise<PackProposeResult> {
  return packProposeActions({
    proposer: input.proposer,
    proposalName: input.proposalName,
    requested: input.requested,
    rpcBase: input.rpcBase,
    permission: input.permission,
    expireSeconds: input.expireSeconds,
    actions: [transferToPlainAction(input.inner)],
  });
}
