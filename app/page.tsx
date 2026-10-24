'use client';

import React, { useMemo, useState } from 'react';
import {
  analyzeProposalRisks,
  computeThresholdSnapshot,
  toggleApproval,
} from '../examples/engines';
import {
  exportProposalJson,
  exportProposalMarkdown,
} from '../examples/exportPlan';
import type { Approval, ProposalConfig } from '../examples/types';

const defaultApprovals: Approval[] = [
  { account: 'alice.wam', weight: 1, hasApproved: false },
  { account: 'bob.wam', weight: 1, hasApproved: false },
  { account: 'carol.wam', weight: 1, hasApproved: false },
];

export default function MultiSigProposalBuilder() {
  const [proposer, setProposer] = useState('alice.wam');
  const [proposalName, setProposalName] = useState('ops-pay-001');
  const [threshold, setThreshold] = useState(2);
  const [approvals, setApprovals] = useState<Approval[]>(defaultApprovals);
  const [newActor, setNewActor] = useState('');
  const [actionSummary, setActionSummary] = useState(
    'eosio.token::transfer (example)'
  );
  const [status, setStatus] = useState<string | null>(null);

  const config: ProposalConfig = useMemo(
    () => ({
      proposalName,
      threshold,
      approvals,
      actionSummary,
    }),
    [proposalName, threshold, approvals, actionSummary]
  );

  const snap = useMemo(() => computeThresholdSnapshot(config), [config]);
  const risks = useMemo(() => analyzeProposalRisks(config), [config]);

  const copy = async (text: string, ok: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(ok);
    } catch {
      setStatus('Clipboard unavailable');
    }
  };

  const addApprover = () => {
    const a = newActor.trim().toLowerCase();
    if (!a) return;
    if (approvals.some((x) => x.account === a)) {
      setStatus('Approver already listed');
      return;
    }
    setApprovals([...approvals, { account: a, weight: 1, hasApproved: false }]);
    setNewActor('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          MULTI-SIG PROPOSAL BUILDER
        </div>
        <div className="text-xs opacity-60 mb-2">
          Pixel Journey · Pass 2 · engines + export · WharfKit for live msig
        </div>
        <p className="text-xs opacity-50 mb-8 max-w-2xl">
          Simulate M-of-N weight offline, then export an eosio.msig-oriented plan.
          Host apps run propose/approve/exec with WharfKit session.transact.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-white/10 bg-black/40 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm tracking-widest text-emerald-400">BUILD</h3>
            <label className="block text-xs opacity-70">
              Proposer
              <input
                value={proposer}
                onChange={(e) => setProposer(e.target.value)}
                className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
              />
            </label>
            <label className="block text-xs opacity-70">
              Proposal name
              <input
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
                className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
              />
            </label>
            <label className="block text-xs opacity-70">
              Action summary
              <input
                value={actionSummary}
                onChange={(e) => setActionSummary(e.target.value)}
                className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl text-sm"
              />
            </label>
            <label className="block text-xs opacity-70">
              Threshold weight
              <input
                type="number"
                min={1}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value) || 0)}
                className="w-28 mt-1 bg-black/60 border border-white/10 px-4 py-2 rounded-xl font-mono"
              />
            </label>

            <div>
              <div className="text-xs opacity-70 mb-2">Approvers (toggle = approved)</div>
              <ul className="space-y-2">
                {approvals.map((a) => (
                  <li
                    key={a.account}
                    className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg text-sm font-mono"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setApprovals(toggleApproval(approvals, a.account))
                      }
                      className={
                        a.hasApproved ? 'text-emerald-400' : 'text-white/40'
                      }
                    >
                      {a.hasApproved ? '✓' : '○'}
                    </button>
                    <span className="flex-1">{a.account}</span>
                    <input
                      type="number"
                      min={1}
                      value={a.weight}
                      onChange={(e) =>
                        setApprovals(
                          approvals.map((x) =>
                            x.account === a.account
                              ? { ...x, weight: Number(e.target.value) || 0 }
                              : x
                          )
                        )
                      }
                      className="w-14 bg-black/60 border border-white/10 rounded px-1 py-0.5"
                    />
                    <button
                      type="button"
                      className="text-red-400 text-xs"
                      onClick={() =>
                        setApprovals(approvals.filter((x) => x.account !== a.account))
                      }
                    >
                      remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-2">
                <input
                  value={newActor}
                  onChange={(e) => setNewActor(e.target.value)}
                  placeholder="newaccount"
                  className="flex-1 bg-black/60 border border-white/10 px-3 py-2 rounded-xl font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={addApprover}
                  className="px-3 py-2 rounded-xl bg-white/10 text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-black/40 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm tracking-widest text-emerald-400">SIMULATION</h3>
            <div className="text-sm space-y-1 font-mono">
              <div>
                Progress:{' '}
                <span className="text-emerald-400">{snap.progressPercent}%</span> (
                {snap.approvedWeight}/{snap.threshold})
              </div>
              <div>Total weight: {snap.totalWeight}</div>
              <div>
                Threshold met:{' '}
                <span
                  className={
                    snap.thresholdMet ? 'text-emerald-400' : 'text-amber-400'
                  }
                >
                  {snap.thresholdMet ? 'yes' : 'no'}
                </span>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${snap.progressPercent}%` }}
              />
            </div>
            <ul className="text-xs space-y-2">
              {risks.map((r) => (
                <li
                  key={r.id}
                  className={
                    r.level === 'high'
                      ? 'text-red-400'
                      : r.level === 'medium'
                        ? 'text-amber-400'
                        : 'text-emerald-400/80'
                  }
                >
                  [{r.level}] {r.message}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  copy(
                    exportProposalMarkdown(config, proposer),
                    'Markdown plan copied'
                  )
                }
                className="px-4 py-2 rounded-xl bg-emerald-800 text-sm"
              >
                Copy MD plan
              </button>
              <button
                type="button"
                onClick={() =>
                  copy(
                    exportProposalJson(config, proposer),
                    'JSON plan copied'
                  )
                }
                className="px-4 py-2 rounded-xl bg-sky-900 text-sm"
              >
                Copy JSON
              </button>
            </div>
            <p className="text-[10px] opacity-50">
              Live propose/approve/exec: host app + WharfKit (see
              examples/wharfPropose.sketch.ts). Pure UI does not auto-broadcast.
            </p>
          </div>
        </div>

        {status && (
          <p className="mt-6 text-xs text-emerald-200/80" role="status">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
