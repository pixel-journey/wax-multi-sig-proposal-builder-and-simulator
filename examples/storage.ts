import type { ProposalConfig } from "./types";

export const STORAGE_KEY = "pxj.msig-proposal-draft.v1";

export interface DraftBlob {
  proposer: string;
  config: ProposalConfig;
}

export function saveDraft(blob: DraftBlob): { ok: boolean; reason?: string } {
  if (typeof window === "undefined")
    return { ok: false, reason: "no window" };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blob));
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "save failed",
    };
  }
}

export function loadDraft(): {
  ok: boolean;
  value?: DraftBlob;
  reason?: string;
} {
  if (typeof window === "undefined")
    return { ok: false, reason: "no window" };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ok: false, reason: "empty" };
    const v = JSON.parse(raw) as DraftBlob;
    if (!v?.config || !Array.isArray(v.config.approvals))
      return { ok: false, reason: "invalid draft" };
    return { ok: true, value: v };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "load failed",
    };
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
