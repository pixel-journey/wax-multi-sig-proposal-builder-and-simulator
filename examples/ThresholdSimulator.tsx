'use client';

import React from 'react';

interface Approval {
  account: string;
  weight: number;
}

interface ThresholdSimulatorProps {
  threshold: number;
  approvals: Approval[];
  className?: string;
}

/**
 * Live threshold simulator for multi-sig proposals.
 */
export function ThresholdSimulator({ threshold, approvals, className = '' }: ThresholdSimulatorProps) {
  const totalWeight = approvals.reduce((sum, a) => sum + a.weight, 0);
  const canExecute = totalWeight >= threshold;
  const progress = Math.min(totalWeight / threshold, 1);

  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-4">Threshold Simulation</h3>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Current Weight</span>
          <span className="font-mono">{totalWeight} / {threshold}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${canExecute ? 'bg-emerald-500' : 'bg-amber-500'}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className={`text-sm font-medium ${canExecute ? 'text-emerald-400' : 'text-amber-400'}`}>
        {canExecute ? 'Proposal can be executed' : 'More approvals needed'}
      </div>
    </div>
  );
}
