'use client';

import React from 'react';

interface Risk {
  level: 'low' | 'medium' | 'high';
  message: string;
}

interface RiskAnalysisPanelProps {
  risks: Risk[];
  className?: string;
}

/**
 * Risk analysis panel for multi-sig proposals.
 */
export function RiskAnalysisPanel({ risks, className = '' }: RiskAnalysisPanelProps) {
  if (risks.length === 0) {
    return (
      <div className={`rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 ${className}`}>
        <h3 className="font-semibold text-emerald-400 mb-2">No Major Risks Detected</h3>
        <p className="text-sm text-emerald-300">This proposal looks safe to execute.</p>
      </div>
    );
  }

  const highRisks = risks.filter(r => r.level === 'high').length;

  return (
    <div className={`rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 ${className}`}>
      <h3 className="font-semibold text-amber-400 mb-3">Risk Analysis</h3>

      <div className="space-y-2">
        {risks.map((risk, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <span className={risk.level === 'high' ? 'text-red-400' : 'text-amber-400'}>
              {risk.level === 'high' ? '⚠' : '!'}
            </span>
            <span>{risk.message}</span>
          </div>
        ))}
      </div>

      {highRisks > 0 && (
        <p className="text-xs text-red-400 mt-3">
          This proposal has high-risk elements. Review carefully before executing.
        </p>
      )}
    </div>
  );
}
