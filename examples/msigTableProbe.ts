/**
 * Soft-fail reads of eosio.msig tables (proposal / approvals).
 */

import { DEFAULT_RPC, normalizeRpcBase } from "./rpcEndpoints";

export type HttpRequest = {
  method: "POST";
  url: string;
  body: Record<string, unknown>;
  executed: false;
};

export function getTableRowsRequest(
  rpcBase: string,
  code: string,
  scope: string,
  table: string,
  limit = 20
): HttpRequest {
  return {
    method: "POST",
    url: `${normalizeRpcBase(rpcBase)}/v1/chain/get_table_rows`,
    body: {
      json: true,
      code,
      scope,
      table,
      limit,
    },
    executed: false,
  };
}

export function proposalsByProposerRequest(
  proposer: string,
  rpcBase = DEFAULT_RPC
): HttpRequest {
  return getTableRowsRequest(rpcBase, "eosio.msig", proposer, "proposal", 50);
}

export function approvalsByProposerRequest(
  proposer: string,
  rpcBase = DEFAULT_RPC
): HttpRequest {
  return getTableRowsRequest(rpcBase, "eosio.msig", proposer, "approvals", 50);
}

export type TableProbeResult =
  | { ok: true; rows: unknown[]; more: boolean }
  | { ok: false; reason: string };

export async function fetchTableRows(
  req: HttpRequest
): Promise<TableProbeResult> {
  try {
    const res = await fetch(req.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const data = (await res.json()) as { rows?: unknown[]; more?: boolean };
    return {
      ok: true,
      rows: data.rows ?? [],
      more: Boolean(data.more),
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "table probe failed",
    };
  }
}
