'use client';

import React from 'react';

interface Approval {
  account: string;
  weight: number;
  hasApproved?: boolean;
}

interface ApprovalGraphProps {
  approvals: Approval[];
  className?: string;
}

/**
 * Simple visual approval graph for multi-sig.
 */
export function ApprovalGraph({ approvals, className = '' }: ApprovalGraphProps) {
  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-4">Required Approvals</h3>

      {approvals.length > 0 ? (
        <div className="space-y-2">
          {approvals.map((approval, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="font-mono">{approval.account}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{approval.weight}</span>
                {approval.hasApproved && (
                  <span className="text-emerald-400 text-xs">✓ Approved</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No approvals configured yet.</p>
      )}
    </div>
  );
}
