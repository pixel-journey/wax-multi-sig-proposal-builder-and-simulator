/** Soft-fail chain reads — never throws to callers. */

export type ProbeResult =
  | { ok: true; account: string; created?: string; raw?: unknown }
  | { ok: false; reason: string };

export async function probeGetAccount(
  account: string,
  rpcBase = "https://wax.greymass.com"
): Promise<ProbeResult> {
  try {
    const res = await fetch(`${rpcBase.replace(/\/$/, "")}/v1/chain/get_account`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ account_name: account }),
    });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const data = (await res.json()) as { account_name?: string; created?: string };
    return {
      ok: true,
      account: data.account_name ?? account,
      created: data.created,
      raw: data,
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "probe failed",
    };
  }
}
