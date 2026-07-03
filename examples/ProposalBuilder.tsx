'use client';

import React, { useState } from 'react';

interface ProposalBuilderProps {
  onCreateProposal?: (config: any) => void;
  className?: string;
}

/**
 * Basic proposal builder form for multi-sig.
 */
export function ProposalBuilder({ onCreateProposal, className = '' }: ProposalBuilderProps) {
  const [account, setAccount] = useState('');
  const [permission, setPermission] = useState('active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCreateProposal) {
      onCreateProposal({ account, permission });
    }
  };

  return (
    <div className={`rounded-2xl border border-white/10 p-6 ${className}`}>
      <h3 className="font-semibold mb-4">Create Proposal</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Account</label>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-sm"
            placeholder="accountname"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Permission</label>
          <select
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-sm"
          >
            <option value="active">active</option>
            <option value="owner">owner</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm font-medium"
        >
          Create Proposal
        </button>
      </div>
    </div>
  );
}
