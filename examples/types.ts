/**
 * Shared types for multi-sig proposal simulation (eosio.msig-style).
 */

export interface Approval {
  account: string;
  weight: number;
  hasApproved?: boolean;
  /** Permission used in approve level — default active */
  permission?: string;
}

export type RiskLevel = "low" | "medium" | "high";

export interface Risk {
  id: string;
  level: RiskLevel;
  message: string;
  trigger: string;
}

export interface ProposalConfig {
  proposalName: string;
  /** Requested threshold weight to execute */
  threshold: number;
  approvals: Approval[];
  /** Optional human label for the underlying action set */
  actionSummary?: string;
}

export interface ThresholdSnapshot {
  totalWeight: number;
  approvedWeight: number;
  remainingWeight: number;
  threshold: number;
  thresholdMet: boolean;
  approvalCount: number;
  pendingCount: number;
  /** 0–100 progress toward threshold */
  progressPercent: number;
}
