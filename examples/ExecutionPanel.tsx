'use client';

import React from 'react';

interface ExecutionPanelProps {
  onExecute?: () => void;
  isExecuting?: boolean;
  canExecute?: boolean;
  className?: string;
}

/**
 * Execution panel for multi-sig proposals.
 */
export function ExecutionPanel({ onExecute, isExecuting = false, canExecute = true, className = '' }: ExecutionPanelProps) {
  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-4">Execute Action</h3>

      <button
        onClick={onExecute}
        disabled={!canExecute || isExecuting}
        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
      >
        {isExecuting ? 'Executing...' : 'Execute Proposal'}
      </button>

      <p className="text-xs text-muted-foreground mt-3">
        This would call the propose/approve/execute action via WharfKit.
      </p>
    </div>
  );
}
