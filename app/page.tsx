'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { clearApprovals, setAllApproved } from '../examples/bulkApprovals';
import { probeGetAccount } from '../examples/chainProbe';
import { exportApproversCsv } from '../examples/csvExport';
import {
  analyzeProposalRisks,
  computeThresholdSnapshot,
  toggleApproval,
} from '../examples/engines';
import {
  exportProposalJson,
  exportProposalMarkdown,
} from '../examples/exportPlan';
import {
  buildApproveAction,
  buildExecAction,
  buildProposeAction,
  exampleInnerTransfer,
} from '../examples/msigActions';
import {
  approvalsByProposerRequest,
  fetchTableRows,
  proposalsByProposerRequest,
} from '../examples/msigTableProbe';
import { PRESETS } from '../examples/presets';
import { aggregateRiskScore } from '../examples/riskScore';
import { clearDraft, loadDraft, saveDraft } from '../examples/storage';
import type { Approval, ProposalConfig } from '../examples/types';
import { validateDraft } from '../examples/validate';

const defaultApprovals: Approval[] = PRESETS[0].config.approvals;

export default function MultiSigProposalBuilder() {
  const [proposer, setProposer] = useState('alice.wam');
  const [proposalName, setProposalName] = useState('ops2of3');
  const [threshold, setThreshold] = useState(2);
  const [approvals, setApprovals] = useState<Approval[]>(defaultApprovals);
  const [newActor, setNewActor] = useState('');
  const [actionSummary, setActionSummary] = useState(
    'eosio.token::transfer (example)'
  );
  const [status, setStatus] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [probing, setProbing] = useState(false);
  const [tableRows, setTableRows] = useState<unknown[] | null>(null);
  const [tableLabel, setTableLabel] = useState('proposal');

  useEffect(() => {
    const d = loadDraft();
    if (d.ok && d.value) {
      setProposer(d.value.proposer);
      setProposalName(d.value.config.proposalName);
      setThreshold(d.value.config.threshold);
      setApprovals(d.value.config.approvals);
      if (d.value.config.actionSummary)
        setActionSummary(d.value.config.actionSummary);
      setStatus('Restored draft from localStorage');
    }
    setHydrated(true);
  }, []);

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
  const riskAgg = useMemo(() => aggregateRiskScore(risks), [risks]);
  const issues = useMemo(
    () =>
      validateDraft({
        proposer,
        proposalName,
        threshold,
        accounts: approvals.map((a) => a.account),
      }),
    [proposer, proposalName, threshold, approvals]
  );

  const actionSketches = useMemo(() => {
    const requested = approvals.map((a) => ({
      actor: a.account,
      permission: 'active',
    }));
    const inner = exampleInnerTransfer({
      from: proposer,
      to: 'bob.wam',
      quantity: '1.00000000 WAX',
      memo: actionSummary,
    });
    const propose = buildProposeAction({
      proposer,
      proposalName,
      requested,
      trx: { actions: [inner], note: 'Host must serialize trx via WharfKit' },
    });
    const approve =
      approvals[0] &&
      buildApproveAction({
        proposer,
        proposalName,
        level: { actor: approvals[0].account, permission: 'active' },
      });
    const exec = buildExecAction({
      proposer,
      proposalName,
      executer: proposer,
    });
    return { propose, approve, exec, inner };
  }, [approvals, proposer, proposalName, actionSummary]);

  const copy = async (text: string, ok: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(ok);
    } catch {
      setStatus('Clipboard unavailable');
    }
  };

  const persist = () => {
    const r = saveDraft({ proposer, config });
    setStatus(r.ok ? 'Draft saved' : r.reason ?? 'Save failed');
  };

  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setProposalName(p.config.proposalName.replace(/-/g, '').slice(0, 12));
    setThreshold(p.config.threshold);
    setApprovals(p.config.approvals.map((a) => ({ ...a })));
    if (p.config.actionSummary) setActionSummary(p.config.actionSummary);
    setStatus(`Preset: ${p.label}`);
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

  const probeProposer = async () => {
    setProbing(true);
    const r = await probeGetAccount(proposer.trim());
    setProbing(false);
    setStatus(
      r.ok
        ? `get_account ok · ${r.account}${r.created ? ` · created ${r.created}` : ''}`
        : `Probe soft-fail: ${r.reason}`
    );
  };

  const probeTable = async (kind: 'proposal' | 'approvals') => {
    setProbing(true);
    const req =
      kind === 'proposal'
        ? proposalsByProposerRequest(proposer.trim())
        : approvalsByProposerRequest(proposer.trim());
    const r = await fetchTableRows(req);
    setProbing(false);
    if (!r.ok) {
      setTableRows(null);
      setStatus(`Table probe soft-fail: ${r.reason}`);
      return;
    }
    setTableLabel(kind);
    setTableRows(r.rows);
    setStatus(
      `eosio.msig::${kind} rows: ${r.rows.length}${r.more ? ' (more)' : ''}`
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          MULTI-SIG PROPOSAL BUILDER
        </div>
        <div className="text-xs opacity-60 mb-2">
          Pass 7 · approvals table · richer export
          {!hydrated && ' · hydrating…'}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id)}
              className="px-2 py-1 rounded-lg text-xs bg-white/10"
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={persist}
            className="px-2 py-1 rounded-lg text-xs bg-violet-800"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={() => {
              clearDraft();
              setStatus('Draft cleared');
            }}
            className="px-2 py-1 rounded-lg text-xs bg-white/10"
          >
            Clear storage
          </button>
          <button
            type="button"
            disabled={probing}
            onClick={probeProposer}
            className="px-2 py-1 rounded-lg text-xs bg-sky-900 disabled:opacity-50"
          >
            {probing ? 'Probing…' : 'Probe get_account'}
          </button>
          <button
            type="button"
            disabled={probing}
            onClick={() => probeTable('proposal')}
            className="px-2 py-1 rounded-lg text-xs bg-sky-800 disabled:opacity-50"
          >
            Probe proposals table
          </button>
          <button
            type="button"
            disabled={probing}
            onClick={() => probeTable('approvals')}
            className="px-2 py-1 rounded-lg text-xs bg-sky-700 disabled:opacity-50"
          >
            Probe approvals table
          </button>
        </div>

        {issues.length > 0 && (
          <ul className="mb-4 text-xs space-y-1">
            {issues.map((i, idx) => (
              <li
                key={`${i.field}-${idx}`}
                className={
                  i.level === 'error' ? 'text-red-400' : 'text-amber-400'
                }
              >
                [{i.level}] {i.field}: {i.message}
              </li>
            ))}
          </ul>
        )}

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
              Proposal name (a-z1-5., ≤12)
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
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs opacity-70">Approvers</span>
                <button
                  type="button"
                  className="text-[10px] underline opacity-60"
                  onClick={() => setApprovals(setAllApproved(approvals, true))}
                >
                  approve all
                </button>
                <button
                  type="button"
                  className="text-[10px] underline opacity-60"
                  onClick={() => setApprovals(clearApprovals(approvals))}
                >
                  clear all
                </button>
              </div>
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
                        setApprovals(
                          approvals.filter((x) => x.account !== a.account)
                        )
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
                Risk score:{' '}
                <span
                  className={
                    riskAgg.label === 'critical' || riskAgg.label === 'high'
                      ? 'text-red-400'
                      : riskAgg.label === 'moderate'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                  }
                >
                  {riskAgg.score} ({riskAgg.label})
                </span>
              </div>
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
                  copy(exportProposalJson(config, proposer), 'JSON plan copied')
                }
                className="px-4 py-2 rounded-xl bg-sky-900 text-sm"
              >
                Copy JSON
              </button>
              <button
                type="button"
                onClick={() =>
                  copy(exportApproversCsv(config, proposer), 'CSV copied')
                }
                className="px-4 py-2 rounded-xl bg-teal-800 text-sm"
              >
                Copy CSV
              </button>
              <button
                type="button"
                onClick={() =>
                  copy(
                    JSON.stringify(actionSketches, null, 2),
                    'msig action sketches copied'
                  )
                }
                className="px-4 py-2 rounded-xl bg-indigo-900 text-sm"
              >
                Copy msig actions
              </button>
            </div>
            {tableRows && (
              <details className="text-[10px] opacity-60" open>
                <summary>
                  On-chain {tableLabel} rows ({tableRows.length})
                </summary>
                <pre className="overflow-x-auto mt-2 max-h-40">
                  {JSON.stringify(tableRows, null, 2)}
                </pre>
              </details>
            )}
            <p className="text-[10px] opacity-50">
              Live path: see WHARFKIT.md · host + session.transact
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
