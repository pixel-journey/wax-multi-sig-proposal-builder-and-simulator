/**
 * Real propose/approve/exec path uses eosio.msig (or equivalent) + WharfKit.
 * Host apps: install @wharfkit/session, build actions, session.transact.
 *
 * This sketch documents payload shapes — copy into a dApp with WharfKit installed.
 */

export interface MsigProposeSketch {
  proposer: string;
  proposal_name: string;
  requested: Array<{ actor: string; permission: string }>;
  /** Packed trx is produced by the chain / SDK — host builds via WharfKit serializers */
  trxNote: string;
}

export function sketchRequestedFromAccounts(
  accounts: string[],
  permission = "active"
): Array<{ actor: string; permission: string }> {
  return accounts.map((actor) => ({ actor, permission }));
}

export function sketchProposeMemo(input: {
  proposer: string;
  proposalName: string;
  requestedAccounts: string[];
}): MsigProposeSketch {
  return {
    proposer: input.proposer,
    proposal_name: input.proposalName,
    requested: sketchRequestedFromAccounts(input.requestedAccounts),
    trxNote:
      "Build inner transaction with WharfKit, then eosio.msig::propose / approve / exec via session.transact",
  };
}

export interface WharfSessionLike {
  transact: (args: { actions: unknown[] }) => Promise<{ transaction_id?: string }>;
}

/**
 * Host implements real actions; this only shows the call boundary.
 */
export async function transactActions(
  session: WharfSessionLike,
  actions: unknown[]
): Promise<{ ok: true; transactionId?: string } | { ok: false; error: string }> {
  try {
    const r = await session.transact({ actions });
    return { ok: true, transactionId: r.transaction_id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "transact failed",
    };
  }
}
