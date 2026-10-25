import type { Approval, ProposalConfig } from "./types";

export type SharePayload = {
  proposer: string;
  config: ProposalConfig;
};

/**
 * Compact JSON → base64url for query string (`?msig=`).
 * Not encrypted — educational share of simulation drafts only.
 */
export function encodeSharePayload(payload: SharePayload): string {
  const json = JSON.stringify({
    p: payload.proposer,
    n: payload.config.proposalName,
    t: payload.config.threshold,
    a: payload.config.approvals.map((x) => ({
      c: x.account,
      w: x.weight,
      h: x.hasApproved ? 1 : 0,
      m: x.permission ?? "active",
    })),
    s: payload.config.actionSummary,
    o: payload.config.notes,
    h: payload.config.proposalHash,
  });
  if (typeof btoa === "function") {
    return btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return Buffer.from(json, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeSharePayload(raw: string): SharePayload | null {
  try {
    let b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const json =
      typeof atob === "function"
        ? decodeURIComponent(escape(atob(b64)))
        : Buffer.from(b64, "base64").toString("utf8");
    const data = JSON.parse(json) as Record<string, unknown>;
    if (typeof data.p !== "string" || typeof data.n !== "string") return null;
    if (typeof data.t !== "number" || !Array.isArray(data.a)) return null;
    const approvals: Approval[] = [];
    for (const item of data.a) {
      if (!item || typeof item !== "object") return null;
      const x = item as Record<string, unknown>;
      if (typeof x.c !== "string" || typeof x.w !== "number") return null;
      approvals.push({
        account: x.c,
        weight: x.w,
        hasApproved: x.h === 1,
        permission: typeof x.m === "string" ? x.m : "active",
      });
    }
    return {
      proposer: data.p,
      config: {
        proposalName: data.n,
        threshold: data.t,
        approvals,
        actionSummary: typeof data.s === "string" ? data.s : undefined,
        notes: typeof data.o === "string" ? data.o : undefined,
        proposalHash: typeof data.h === "string" ? data.h : undefined,
      },
    };
  } catch {
    return null;
  }
}

export function buildShareSearchParam(payload: SharePayload): string {
  return `msig=${encodeSharePayload(payload)}`;
}
