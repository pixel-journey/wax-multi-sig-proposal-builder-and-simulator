'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  buildApproveSequence,
  sequenceSummary,
} from '../examples/approveSequence';
import { clearApprovals, setAllApproved } from '../examples/bulkApprovals';
import { probeGetAccount } from '../examples/chainProbe';
import { chainIdLabel } from '../examples/chainId';
import { clearShareQuery } from '../examples/clearShareQuery';
import { exportApproversCsv } from '../examples/csvExport';
import { downloadTextFile, exportBasename } from '../examples/download';
import {
  analyzeProposalRisks,
  computeThresholdSnapshot,
  toggleApproval,
} from '../examples/engines';
import { equalizeWeights } from '../examples/equalizeWeights';
import {
  exportProposalJson,
  exportProposalMarkdown,
} from '../examples/exportPlan';
import { probeGetInfo } from '../examples/getInfoProbe';
import { importDraftJson } from '../examples/importDraft';
import { checkThresholdFeasibility } from '../examples/impossibleThreshold';
import {
  suggestMajorityThreshold,
  suggestSupermajorityThreshold,
} from '../examples/majorityThreshold';
import {
  buildLifecycleSketch,
  lifecycleToJson,
} from '../examples/lifecycleSequence';
import { RelatedBlueprints } from '../examples/RelatedBlueprints';
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
import { checkProposalHash } from '../examples/proposalHash';
import { remainingLine } from '../examples/remainingWeight';
import { buildShareSearchParam, decodeSharePayload } from '../examples/shareUrl';
import { PRESETS } from '../examples/presets';
import {
  buildSingleApprove,
  buildSingleCancel,
  buildSingleExec,
  buildSinglePropose,
} from '../examples/singleActions';
import { aggregateRiskScore } from '../examples/riskScore';
import { DEFAULT_RPC, RPC_PRESETS, normalizeRpcBase } from '../examples/rpcEndpoints';
import { clearDraft, loadDraft, saveDraft } from '../examples/storage';
import { TableRowsPanel } from '../examples/TableRowsPanel';
import type { Approval, ProposalConfig } from '../examples/types';
import {
  emptyUndo,
  popUndo,
  pushUndo,
  undoDepth,
  type UndoStack,
} from '../examples/undo';
import { validateDraft } from '../examples/validate';

const defaultApprovals: Approval[] = PRESETS[0].config.approvals;

export default function MultiSigProposalBuilder() {
  const [proposer, setProposer] = useState('alice.wam');
  const [proposalName, setProposalName] = useState('ops2of3');
  const [threshold, setThreshold] = useState(2);
  const [approvals, setApprovals] = useState<Approval[]>(defaultApprovals);
  const [newActor, setNewActor] = useState('');
  const [actionSummary, setActionSummary] = useState('eosio.token::transfer (example)');
  const [status, setStatus] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [probing, setProbing] = useState(false);
  const [tableRows, setTableRows] = useState<unknown[] | null>(null);
  const [tableLabel, setTableLabel] = useState('proposal');
  const [undo, setUndo] = useState<UndoStack>(() => emptyUndo());
  const [seqMode, setSeqMode] = useState<'checked' | 'all'>('checked');
  const [importText, setImportText] = useState('');
  const [rpcBase, setRpcBase] = useState(DEFAULT_RPC);
  const [includeCancel, setIncludeCancel] = useState(false);
  const [includeUnapprove, setIncludeUnapprove] = useState(false);
  const [notes, setNotes] = useState('');
  const [proposalHash, setProposalHash] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('msig');
      if (q) {
        const shared = decodeSharePayload(q);
        if (shared) {
          setProposer(shared.proposer);
          setProposalName(shared.config.proposalName);
          setThreshold(shared.config.threshold);
          setApprovals(shared.config.approvals);
          if (shared.config.actionSummary) setActionSummary(shared.config.actionSummary);
          if (shared.config.notes) setNotes(shared.config.notes);
          if (shared.config.proposalHash) setProposalHash(shared.config.proposalHash);
          setStatus('Loaded draft from share URL');
          clearShareQuery();
          setHydrated(true);
          return;
        }
      }
    }
    const d = loadDraft();
    if (d.ok && d.value) {
      setProposer(d.value.proposer);
      setProposalName(d.value.config.proposalName);
      setThreshold(d.value.config.threshold);
      setApprovals(d.value.config.approvals);
      if (d.value.config.actionSummary) setActionSummary(d.value.config.actionSummary);
      if (d.value.config.notes) setNotes(d.value.config.notes);
      if (d.value.config.proposalHash) setProposalHash(d.value.config.proposalHash);
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
      notes: notes || undefined,
      proposalHash: proposalHash || undefined,
    }),
    [proposalName, threshold, approvals, actionSummary, notes, proposalHash]
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
  const hashCheck = useMemo(() => checkProposalHash(proposalHash), [proposalHash]);
  const feasibility = useMemo(() => checkThresholdFeasibility(config), [config]);

  const approveSeq = useMemo(
    () =>
      buildApproveSequence({
        proposer,
        proposalName,
        approvals,
        forceAll: seqMode === 'all',
        proposalHash:
          hashCheck.ok && hashCheck.normalized
            ? hashCheck.normalized
            : undefined,
      }),
    [proposer, proposalName, approvals, seqMode, hashCheck]
  );

  const lifecycle = useMemo(
    () =>
      buildLifecycleSketch({
        proposer,
        proposalName,
        approvals,
        forceAllApproves: seqMode === 'all',
        includeCancel,
        includeUnapprove,
      }),
    [proposer, proposalName, approvals, seqMode, includeCancel, includeUnapprove]
  );

  const recordUndo = () => {
    setUndo((u) =>
      pushUndo(u, {
        proposer,
        config: {
          proposalName,
          threshold,
          approvals,
          actionSummary,
          notes: notes || undefined,
          proposalHash: proposalHash || undefined,
        },
      })
    );
  };

  const doUndo = () => {
    const r = popUndo(undo);
    if (!r.ok) {
      setStatus(r.reason);
      return;
    }
    setUndo(r.stack);
    setProposer(r.snap.proposer);
    setProposalName(r.snap.config.proposalName);
    setThreshold(r.snap.config.threshold);
    setApprovals(r.snap.config.approvals);
    if (r.snap.config.actionSummary) setActionSummary(r.snap.config.actionSummary);
    setNotes(r.snap.config.notes ?? '');
    setProposalHash(r.snap.config.proposalHash ?? '');
    setStatus(`Undid · depth ${undoDepth(r.stack)}`);
  };

  const actionSketches = useMemo(() => {
    const requested = approvals.map((a) => ({
      actor: a.account,
      permission: a.permission ?? 'active',
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
        level: {
          actor: approvals[0].account,
          permission: approvals[0].permission ?? 'active',
        },
        proposal_hash:
          hashCheck.ok && hashCheck.normalized
            ? hashCheck.normalized
            : undefined,
      });
    const exec = buildExecAction({
      proposer,
      proposalName,
      executer: proposer,
    });
    return { propose, approve, exec, inner, approveSequence: approveSeq };
  }, [approvals, proposer, proposalName, actionSummary, approveSeq, hashCheck]);

  const copy = async (text: string, ok: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(ok);
    } catch {
      setStatus('Clipboard unavailable');
    }
  };

  const dl = (filename: string, content: string, mime: string) => {
    const r = downloadTextFile(filename, content, mime);
    setStatus(r.ok ? `Downloaded ${filename}` : r.reason);
  };

  const persist = () => {
    const r = saveDraft({ proposer, config });
    setStatus(r.ok ? 'Draft saved' : r.reason ?? 'Save failed');
  };

  const applyPreset = (id: string) => {
    recordUndo();
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
    recordUndo();
    setApprovals([
      ...approvals,
      { account: a, weight: 1, hasApproved: false, permission: 'active' },
    ]);
    setNewActor('');
  };

  const probeProposer = async () => {
    setProbing(true);
    const r = await probeGetAccount(proposer.trim(), rpcBase);
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
        ? proposalsByProposerRequest(proposer.trim(), rpcBase)
        : approvalsByProposerRequest(proposer.trim(), rpcBase);
    const r = await fetchTableRows(req);
    setProbing(false);
    if (!r.ok) {
      setTableRows(null);
      setStatus(`Table probe soft-fail: ${r.reason}`);
      return;
    }
    setTableLabel(kind);
    setTableRows(r.rows);
    setStatus(`eosio.msig::${kind} rows: ${r.rows.length}${r.more ? ' (more)' : ''}`);
  };

  const probeInfo = async () => {
    setProbing(true);
    const r = await probeGetInfo(rpcBase);
    setProbing(false);
    setStatus(
      r.ok
        ? `get_info ok · head ${r.headBlockNum} · ${chainIdLabel(r.chainId)}`
        : `get_info soft-fail: ${r.reason}`
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">MULTI-SIG PROPOSAL BUILDER</div>
        <div className="text-xs opacity-60 mb-2">Pass 27 · equalize weights{!hydrated && ' · hydrating…'}</div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map((p) => (
            <button key={p.id} type="button" onClick={() => applyPreset(p.id)} className="px-2 py-1 rounded-lg text-xs bg-white/10">{p.label}</button>
          ))}
          <button type="button" onClick={doUndo} disabled={undoDepth(undo) === 0} className="px-2 py-1 rounded-lg text-xs bg-amber-900 disabled:opacity-40">Undo ({undoDepth(undo)})</button>
          <button type="button" onClick={persist} className="px-2 py-1 rounded-lg text-xs bg-violet-800">Save draft</button>
          <button type="button" onClick={() => {
            const param = buildShareSearchParam({ proposer, config });
            const url = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?${param}` : `?${param}`;
            void copy(url, 'Share URL copied');
          }} className="px-2 py-1 rounded-lg text-xs bg-emerald-900">Copy share URL</button>
          <button type="button" onClick={() => { clearDraft(); setStatus('Draft cleared'); }} className="px-2 py-1 rounded-lg text-xs bg-white/10">Clear storage</button>
          <button type="button" disabled={probing} onClick={probeProposer} className="px-2 py-1 rounded-lg text-xs bg-sky-900 disabled:opacity-50">{probing ? 'Probing…' : 'Probe get_account'}</button>
          <button type="button" disabled={probing} onClick={() => probeTable('proposal')} className="px-2 py-1 rounded-lg text-xs bg-sky-800 disabled:opacity-50">Probe proposals</button>
          <button type="button" disabled={probing} onClick={() => probeTable('approvals')} className="px-2 py-1 rounded-lg text-xs bg-sky-700 disabled:opacity-50">Probe approvals</button>
          <button type="button" disabled={probing} onClick={probeInfo} className="px-2 py-1 rounded-lg text-xs bg-cyan-900 disabled:opacity-50">Probe get_info</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 items-center text-[10px]">
          <span className="opacity-50">RPC</span>
          {RPC_PRESETS.map((p) => (
            <button key={p.id} type="button" className={`px-2 py-1 rounded-lg ${normalizeRpcBase(rpcBase) === normalizeRpcBase(p.url) ? 'bg-emerald-800' : 'bg-white/10'}`} onClick={() => setRpcBase(p.url)}>{p.label}</button>
          ))}
          <input value={rpcBase} onChange={(e) => setRpcBase(e.target.value)} className="flex-1 min-w-[12rem] bg-black/60 border border-white/10 rounded px-2 py-1 font-mono" />
        </div>

        {issues.length > 0 && (
          <ul className="mb-4 text-xs space-y-1">
            {issues.map((i, idx) => (
              <li key={`${i.field}-${idx}`} className={i.level === 'error' ? 'text-red-400' : 'text-amber-400'}>[{i.level}] {i.field}: {i.message}</li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-white/10 bg-black/40 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm tracking-widest text-emerald-400">BUILD</h3>
            <label className="block text-xs opacity-70">Proposer<input value={proposer} onChange={(e) => setProposer(e.target.value)} className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm" /></label>
            <label className="block text-xs opacity-70">Proposal name (a-z1-5., ≤12)<input value={proposalName} onChange={(e) => setProposalName(e.target.value)} className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm" /></label>
            <label className="block text-xs opacity-70">Action summary<input value={actionSummary} onChange={(e) => setActionSummary(e.target.value)} className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl text-sm" /></label>
            <label className="block text-xs opacity-70">Notes (off-chain)<textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full mt-1 bg-black/60 border border-white/10 px-3 py-2 rounded-xl text-sm" /></label>
            <label className="block text-xs opacity-70">Proposal hash (optional for approve)<input value={proposalHash} onChange={(e) => setProposalHash(e.target.value)} className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-2 rounded-xl font-mono text-sm" placeholder="hex hash if required" /></label>
            {!hashCheck.ok && <p className="text-[10px] text-amber-400">{hashCheck.reason}</p>}
            <label className="block text-xs opacity-70">Threshold weight<input type="number" min={1} value={threshold} onChange={(e) => setThreshold(Number(e.target.value) || 0)} className="w-28 mt-1 bg-black/60 border border-white/10 px-4 py-2 rounded-xl font-mono" /></label>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <button type="button" className="underline opacity-70" onClick={() => { recordUndo(); setThreshold(suggestMajorityThreshold(approvals)); }}>use majority</button>
              <button type="button" className="underline opacity-70" onClick={() => { recordUndo(); setThreshold(suggestSupermajorityThreshold(approvals)); }}>use ~2/3</button>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs opacity-70">Approvers</span>
                <button type="button" className="text-[10px] underline opacity-60" onClick={() => { recordUndo(); setApprovals(setAllApproved(approvals, true)); }}>approve all</button>
                <button type="button" className="text-[10px] underline opacity-60" onClick={() => { recordUndo(); setApprovals(clearApprovals(approvals)); }}>clear all</button>
                <button type="button" className="text-[10px] underline opacity-60" onClick={() => { recordUndo(); setApprovals(equalizeWeights(approvals, 1)); }}>equalize weights</button>
              </div>
              <ul className="space-y-2">
                {approvals.map((a) => (
                  <li key={a.account} className="flex flex-wrap items-center gap-2 bg-black/40 px-3 py-2 rounded-lg text-sm font-mono">
                    <button type="button" onClick={() => { recordUndo(); setApprovals(toggleApproval(approvals, a.account)); }} className={a.hasApproved ? 'text-emerald-400' : 'text-white/40'}>{a.hasApproved ? '✓' : '○'}</button>
                    <span className="flex-1 min-w-[6rem]">{a.account}</span>
                    <input title="weight" type="number" min={1} value={a.weight} onChange={(e) => setApprovals(approvals.map((x) => x.account === a.account ? { ...x, weight: Number(e.target.value) || 0 } : x))} className="w-12 bg-black/60 border border-white/10 rounded px-1 py-0.5" />
                    <input title="permission" value={a.permission ?? 'active'} onChange={(e) => setApprovals(approvals.map((x) => x.account === a.account ? { ...x, permission: e.target.value } : x))} className="w-16 bg-black/60 border border-white/10 rounded px-1 py-0.5 text-[10px]" />
                    <button type="button" className="text-red-400 text-xs" onClick={() => { recordUndo(); setApprovals(approvals.filter((x) => x.account !== a.account)); }}>remove</button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-2">
                <input value={newActor} onChange={(e) => setNewActor(e.target.value)} placeholder="newaccount" className="flex-1 bg-black/60 border border-white/10 px-3 py-2 rounded-xl font-mono text-sm" />
                <button type="button" onClick={addApprover} className="px-3 py-2 rounded-xl bg-white/10 text-sm">Add</button>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-black/40 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm tracking-widest text-emerald-400">SIMULATION</h3>
            <div className="text-sm space-y-1 font-mono">
              <div>Progress: <span className="text-emerald-400">{snap.progressPercent}%</span> ({snap.approvedWeight}/{snap.threshold})</div>
              <div>Total weight: {snap.totalWeight}</div>
              <div>Risk score: <span className={riskAgg.label === 'critical' || riskAgg.label === 'high' ? 'text-red-400' : riskAgg.label === 'moderate' ? 'text-amber-400' : 'text-emerald-400'}>{riskAgg.score} ({riskAgg.label})</span></div>
              <div>Threshold met: <span className={snap.thresholdMet ? 'text-emerald-400' : 'text-amber-400'}>{snap.thresholdMet ? 'yes' : 'no'}</span></div>
              <div className="text-[11px] opacity-70">{remainingLine(snap)}</div>
              {!feasibility.ok && (
                <div className="text-[11px] text-red-400">{feasibility.reason}</div>
              )}
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all" style={{ width: `${snap.progressPercent}%` }} /></div>
            <ul className="text-xs space-y-2">{risks.map((r) => (<li key={r.id} className={r.level === 'high' ? 'text-red-400' : r.level === 'medium' ? 'text-amber-400' : 'text-emerald-400/80'}>[{r.level}] {r.message}</li>))}</ul>
            <div className="flex gap-2 text-[10px]">
              <button type="button" className={`px-2 py-1 rounded ${seqMode === 'checked' ? 'bg-emerald-800' : 'bg-white/10'}`} onClick={() => setSeqMode('checked')}>Sequence: checked only</button>
              <button type="button" className={`px-2 py-1 rounded ${seqMode === 'all' ? 'bg-emerald-800' : 'bg-white/10'}`} onClick={() => setSeqMode('all')}>Sequence: force all</button>
            </div>
            {approveSeq.length > 0 && (<pre className="text-[10px] opacity-60 whitespace-pre-wrap">{sequenceSummary(approveSeq)}</pre>)}
            <div className="flex flex-wrap gap-2 pt-2">
              <button type="button" onClick={() => copy(exportProposalMarkdown(config, proposer), 'Markdown plan copied')} className="px-3 py-2 rounded-xl bg-emerald-800 text-sm">Copy MD</button>
              <button type="button" onClick={() => copy(exportProposalJson(config, proposer), 'JSON copied')} className="px-3 py-2 rounded-xl bg-sky-900 text-sm">Copy JSON</button>
              <button type="button" onClick={() => copy(exportApproversCsv(config, proposer), 'CSV copied')} className="px-3 py-2 rounded-xl bg-teal-800 text-sm">Copy CSV</button>
              <button type="button" onClick={() => copy(JSON.stringify(actionSketches, null, 2), 'msig actions copied')} className="px-3 py-2 rounded-xl bg-indigo-900 text-sm">Copy msig actions</button>
              <button type="button" onClick={() => copy(JSON.stringify(buildSinglePropose({ proposer, proposalName, approvals, actionSummary }), null, 2), 'propose action copied')} className="px-3 py-2 rounded-xl bg-stone-800 text-sm">Copy propose</button>
              <button type="button" onClick={() => {
                const a = approvals[0];
                if (!a) { setStatus('Add an approver first'); return; }
                copy(JSON.stringify(buildSingleApprove({
                  proposer,
                  proposalName,
                  account: a.account,
                  permission: a.permission,
                  proposalHash: hashCheck.ok && hashCheck.normalized ? hashCheck.normalized : undefined,
                }), null, 2), 'approve action copied');
              }} className="px-3 py-2 rounded-xl bg-stone-700 text-sm">Copy 1st approve</button>
              <button type="button" onClick={() => copy(JSON.stringify(buildSingleExec({ proposer, proposalName }), null, 2), 'exec action copied')} className="px-3 py-2 rounded-xl bg-stone-600 text-sm">Copy exec</button>
              <button type="button" onClick={() => copy(JSON.stringify(buildSingleCancel({ proposer, proposalName }), null, 2), 'cancel action copied')} className="px-3 py-2 rounded-xl bg-stone-500 text-sm">Copy cancel</button>
              <button type="button" onClick={() => copy(lifecycleToJson(lifecycle), 'Lifecycle JSON copied')} className="px-3 py-2 rounded-xl bg-fuchsia-900 text-sm">Copy lifecycle</button>
              <label className="flex items-center gap-1 text-[10px] opacity-70 px-2"><input type="checkbox" checked={includeCancel} onChange={(e) => setIncludeCancel(e.target.checked)} />include cancel</label>
              <label className="flex items-center gap-1 text-[10px] opacity-70 px-2"><input type="checkbox" checked={includeUnapprove} onChange={(e) => setIncludeUnapprove(e.target.checked)} />include unapprove</label>
              <button type="button" onClick={() => { const b = exportBasename('msig-proposal', proposalName); dl(`${b}.md`, exportProposalMarkdown(config, proposer), 'text/markdown'); }} className="px-3 py-2 rounded-xl bg-indigo-800 text-sm">Download MD</button>
              <button type="button" onClick={() => { const b = exportBasename('msig-proposal', proposalName); dl(`${b}.json`, exportProposalJson(config, proposer), 'application/json'); }} className="px-3 py-2 rounded-xl bg-indigo-700 text-sm">Download JSON</button>
              <button type="button" onClick={() => { const b = exportBasename('msig-proposal', proposalName); dl(`${b}.csv`, exportApproversCsv(config, proposer), 'text/csv'); }} className="px-3 py-2 rounded-xl bg-indigo-600 text-sm">Download CSV</button>
              <button type="button" onClick={() => { const b = exportBasename('msig-lifecycle', proposalName); dl(`${b}.json`, lifecycleToJson(lifecycle), 'application/json'); }} className="px-3 py-2 rounded-xl bg-fuchsia-800 text-sm">Download lifecycle</button>
            </div>
            <TableRowsPanel label={tableLabel} rows={tableRows} onPickProposalName={(name) => { recordUndo(); setProposalName(name); setStatus(`Loaded proposal name ${name}`); }} />
          </div>
        </div>

        <section className="mt-8 border border-white/10 bg-black/40 p-4 rounded-2xl space-y-2">
          <p className="text-xs opacity-60">Import draft JSON (export format or {'{'} proposer, config {'}'})</p>
          <textarea value={importText} onChange={(e) => setImportText(e.target.value)} rows={3} className="w-full font-mono text-[10px] bg-black/60 border border-white/10 rounded-lg p-2" />
          <button type="button" className="px-3 py-2 rounded-xl text-sm bg-violet-900" onClick={() => {
              const r = importDraftJson(importText);
              if (!r.ok) { setStatus(r.reason); return; }
              recordUndo();
              setProposer(r.proposer);
              setProposalName(r.config.proposalName);
              setThreshold(r.config.threshold);
              setApprovals(r.config.approvals);
              if (r.config.actionSummary) setActionSummary(r.config.actionSummary);
              setNotes(r.config.notes ?? '');
              setProposalHash(r.config.proposalHash ?? '');
              setStatus('Imported draft JSON');
            }}>Import JSON</button>
        </section>

        {status && (<p className="mt-6 text-xs text-emerald-200/80" role="status">{status}</p>)}
        <RelatedBlueprints />
      </div>
    </div>
  );
}
