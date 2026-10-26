import type { PlainInnerAction } from "./packProposeTrx";
import { transferToPlainAction } from "./packProposeTrx";
import type { InnerTransferSpec } from "./proposeTrx";

export type ParseInnerResult =
  | { ok: true; actions: PlainInnerAction[] }
  | { ok: false; reason: string };

/**
 * Parse optional JSON array of plain actions.
 * Falls back to a single transfer when JSON empty.
 */
export function parseInnerActionsJson(
  json: string,
  fallbackTransfer: InnerTransferSpec
): ParseInnerResult {
  const trimmed = (json ?? "").trim();
  if (!trimmed) {
    return { ok: true, actions: [transferToPlainAction(fallbackTransfer)] };
  }
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return { ok: false, reason: "inner actions JSON must be a non-empty array" };
    }
    const actions: PlainInnerAction[] = [];
    for (const row of parsed) {
      if (!row || typeof row !== "object") {
        return { ok: false, reason: "each action must be an object" };
      }
      const r = row as Record<string, unknown>;
      if (typeof r.account !== "string" || typeof r.name !== "string") {
        return { ok: false, reason: "each action needs account + name strings" };
      }
      const authorization = Array.isArray(r.authorization)
        ? (r.authorization as { actor: string; permission: string }[])
        : [{ actor: fallbackTransfer.from, permission: "active" }];
      const data =
        r.data && typeof r.data === "object"
          ? (r.data as Record<string, unknown>)
          : {};
      actions.push({
        account: r.account,
        name: r.name,
        authorization,
        data,
      });
    }
    return { ok: true, actions };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "invalid JSON",
    };
  }
}
