/** Soft-fail /v1/chain/get_info — connectivity check for chosen RPC. */

import { DEFAULT_RPC, normalizeRpcBase } from "./rpcEndpoints";

export type GetInfoResult =
  | {
      ok: true;
      chainId: string;
      headBlockNum: number;
      headBlockTime?: string;
    }
  | { ok: false; reason: string };

export async function probeGetInfo(
  rpcBase: string = DEFAULT_RPC
): Promise<GetInfoResult> {
  try {
    const base = normalizeRpcBase(rpcBase);
    const res = await fetch(`${base}/v1/chain/get_info`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: "{}",
    });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const data = (await res.json()) as {
      chain_id?: string;
      head_block_num?: number;
      head_block_time?: string;
    };
    if (!data.chain_id || typeof data.head_block_num !== "number")
      return { ok: false, reason: "unexpected get_info shape" };
    return {
      ok: true,
      chainId: data.chain_id,
      headBlockNum: data.head_block_num,
      headBlockTime: data.head_block_time,
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "get_info failed",
    };
  }
}
