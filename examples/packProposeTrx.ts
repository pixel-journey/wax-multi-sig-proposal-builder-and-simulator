/**
 * Build a real inner Transaction for eosio.msig::propose.data.trx
 * using @wharfkit/antelope (TAPOS header + ABI-encoded actions).
 */

import { DEFAULT_RPC, normalizeRpcBase } from "./rpcEndpoints";
import type { Auth, ChainAction } from "./msigActions";
import { buildProposeAction } from "./msigActions";
import type { InnerTransferSpec } from "./proposeTrx";

export type PackProposeResult =
  | {
      ok: true;
      proposeAction: ChainAction;
      trxObject: Record<string, unknown>;
      transactionId?: string;
      note: string;
    }
  | { ok: false; reason: string };

/**
 * Fetch get_info + token ABI, build Transaction with TAPOS header,
 * encode transfer action data, return outer propose ChainAction.
 */
export async function packProposeTransfer(input: {
  proposer: string;
  proposalName: string;
  requested: Auth[];
  inner: InnerTransferSpec;
  rpcBase?: string;
  permission?: string;
  /** Expiration seconds for *inner* deferred-style header (msig payload). */
  expireSeconds?: number;
}): Promise<PackProposeResult> {
  try {
    const { APIClient, Action, Transaction, Serializer } = await import(
      "@wharfkit/antelope"
    );
    const url = normalizeRpcBase(input.rpcBase ?? DEFAULT_RPC);
    const client = new APIClient({ url });
    const info = await client.v1.chain.get_info();
    const header = info.getTransactionHeader(input.expireSeconds ?? 3600);

    const abiRes = await client.v1.chain.get_abi("eosio.token");
    const abi = abiRes.abi;
    if (!abi) return { ok: false, reason: "eosio.token ABI missing" };

    const action = Action.from(
      {
        account: "eosio.token",
        name: "transfer",
        authorization: [
          { actor: input.inner.from, permission: "active" },
        ],
        data: {
          from: input.inner.from,
          to: input.inner.to,
          quantity: input.inner.quantity,
          memo: input.inner.memo ?? "",
        },
      },
      abi
    );

    const transaction = Transaction.from({
      ...header,
      actions: [action],
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
      note: "Inner trx packed with TAPOS header + ABI-encoded transfer; ready for session.transact propose",
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "packProposeTransfer failed",
    };
  }
}
