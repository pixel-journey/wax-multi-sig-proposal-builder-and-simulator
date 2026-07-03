/**
 * Shared types for the Multi-Sig Proposal Builder examples.
 */

export interface Approval {
  account: string;
  weight: number;
  hasApproved?: boolean;
}

export interface Risk {
  level: 'low' | 'medium' | 'high';
  message: string;
}

export interface ProposalConfig {
  actions: any[];
  threshold: number;
  approvals: Approval[];
}
