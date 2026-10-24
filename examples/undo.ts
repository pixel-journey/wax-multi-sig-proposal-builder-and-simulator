import type { ProposalConfig } from "./types";

export interface DraftSnapshot {
  proposer: string;
  config: ProposalConfig;
}

export interface UndoStack {
  past: DraftSnapshot[];
  max: number;
}

export function emptyUndo(max = 20): UndoStack {
  return { past: [], max };
}

export function pushUndo(stack: UndoStack, snap: DraftSnapshot): UndoStack {
  const past = [...stack.past, structuredClone(snap)];
  if (past.length > stack.max) past.shift();
  return { ...stack, past };
}

export function popUndo(
  stack: UndoStack
): { ok: false; reason: string } | { ok: true; stack: UndoStack; snap: DraftSnapshot } {
  if (stack.past.length === 0) return { ok: false, reason: "nothing to undo" };
  const past = stack.past.slice();
  const snap = past.pop()!;
  return { ok: true, stack: { ...stack, past }, snap };
}

export function undoDepth(stack: UndoStack): number {
  return stack.past.length;
}
