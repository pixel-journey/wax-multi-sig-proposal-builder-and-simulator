import type { Approval } from "./types";

export function setAllApproved(
  approvals: Approval[],
  hasApproved: boolean
): Approval[] {
  return approvals.map((a) => ({ ...a, hasApproved }));
}

export function approveAccounts(
  approvals: Approval[],
  accounts: string[]
): Approval[] {
  const set = new Set(accounts.map((a) => a.toLowerCase()));
  return approvals.map((a) =>
    set.has(a.account.toLowerCase()) ? { ...a, hasApproved: true } : a
  );
}

export function clearApprovals(approvals: Approval[]): Approval[] {
  return setAllApproved(approvals, false);
}
