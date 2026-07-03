'use client';

import { useState } from 'react';
import { ThresholdSimulator } from './ThresholdSimulator';
import { ApprovalGraph } from './ApprovalGraph';
import { RiskAnalysisPanel } from './RiskAnalysisPanel';

/**
 * Demo showing how the multi-sig components work together.
 */
export default function MultiSigDemo() {
  const [approvals, setApprovals] = useState([
    { account: 'account1', weight: 1, hasApproved: false },
    { account: 'account2', weight: 1, hasApproved: true },
    { account: 'account3', weight: 2, hasApproved: false },
  ]);

  const threshold = 3;

  const risks = [
    { level: 'medium' as const, message: 'One high-weight approver has not yet approved.' },
    { level: 'low' as const, message: 'Proposal uses standard permissions.' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Multi-Sig Proposal Demo</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <ThresholdSimulator threshold={threshold} approvals={approvals} />
        <ApprovalGraph approvals={approvals} />
      </div>

      <RiskAnalysisPanel risks={risks} />

      <div className="text-xs text-muted-foreground">
        This is an educational demo. Real implementations should include full proposal building and WharfKit integration.
      </div>
    </div>
  );
}
