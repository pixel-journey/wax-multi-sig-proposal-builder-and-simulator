'use client';

import React, { useState } from 'react';
import {
  buildApproveAction,
  buildCancelAction,
  buildExecAction,
  type ChainAction,
} from './msigActions';
import { packProposeActions, packProposeTransfer } from './packProposeTrx';
import { parseInnerActionsJson } from './parseInnerActions';
import { transactSimpleAction } from './proposeTrx';
import {
  actorString,
  createWaxSessionKit,
  type SessionLike,
} from './sessionKit';
import { DEFAULT_RPC } from './rpcEndpoints';

export type LiveExecutionPanelProps = {
  proposer: string;
  proposalName: string;
  requested: { actor: string; permission: string }[];
  actionSummary?: string;
  transferTo?: string;
  transferQuantity?: string;
  rpcBase?: string;
  className?: string;
};

const SAMPLE_MULTI = `[\n  {\n    "account": "eosio.token",\n    "name": "transfer",\n    "authorization": [{ "actor": "alice.wam", "permission": "active" }],\n    "data": {\n      "from": "alice.wam",\n      "to": "bob.wam",\n      "quantity": "0.00000001 WAX",\n      "memo": "msig-a"\n    }\n  },\n  {\n    "account": "eosio.token",\n    "name": "transfer",\n    "data": {\n      "from": "alice.wam",\n      "to": "carol.wam",\n      "quantity": "0.00000001 WAX",\n      "memo": "msig-b"\n    }\n  }\n]`;

export function LiveExecutionPanel(props: LiveExecutionPanelProps) {
  const [session, setSession] = useState<SessionLike | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState<'propose' | 'approve' | 'exec' | 'cancel'>(
    'propose'
  );
  const [lastTrxPreview, setLastTrxPreview] = useState<string | null>(null);
  const [proposalHash, setProposalHash] = useState<string | undefined>();
  const [wallets, setWallets] = useState<string[]>([]);
  const [innerJson, setInnerJson] = useState('');

  const fallbackTransfer = {
    from: props.proposer,
    to: props.transferTo ?? 'bob.wam',
    quantity: props.transferQuantity ?? '0.00000001 WAX',
    memo: props.actionSummary ?? 'msig educational',
  };

  const login = async () => {
    setBusy(true);
    const r = await createWaxSessionKit();
    if (!r.ok) {
      setStatus(r.reason);
      setBusy(false);
      return;
    }
    setWallets(r.wallets);
    try {
      const { session: s } = await r.kit.login();
      setSession(s);
      setStatus(`Logged in as ${actorString(s)} · wallets: ${r.wallets.join(', ')}`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'login failed');
    }
    setBusy(false);
  };

  const packNow = async () => {
    const parsed = parseInnerActionsJson(innerJson, fallbackTransfer);
    if (!parsed.ok) return parsed;
    const packed = await packProposeActions({
      proposer: props.proposer,
      proposalName: props.proposalName,
      requested: props.requested,
      rpcBase: props.rpcBase ?? DEFAULT_RPC,
      actions: parsed.actions,
    });
    return packed;
  };

  const run = async () => {
    if (!session) {
      setStatus('Login with WharfKit first');
      return;
    }
    if (!confirmed) {
      setStatus('Check the confirm box before broadcasting');
      return;
    }
    setBusy(true);
    let action: ChainAction;

    if (step === 'propose') {
      const packed = await packNow();
      if (!packed.ok) {
        setStatus(`pack propose soft-fail: ${packed.reason}`);
        setBusy(false);
        setConfirmed(false);
        return;
      }
      action = packed.proposeAction;
      setProposalHash(packed.proposalHash);
      setLastTrxPreview(
        JSON.stringify(packed.trxObject, null, 2).slice(0, 1200)
      );
      setStatus(
        packed.proposalHash
          ? `Packed · proposal_hash ${packed.proposalHash.slice(0, 16)}… — broadcasting propose…`
          : 'Packed inner trx — broadcasting propose…'
      );
    } else if (step === 'approve') {
      const actor = actorString(session);
      action = buildApproveAction({
        proposer: props.proposer,
        proposalName: props.proposalName,
        level: { actor, permission: 'active' },
        proposal_hash: proposalHash,
      });
    } else if (step === 'exec') {
      action = buildExecAction({
        proposer: props.proposer,
        proposalName: props.proposalName,
        executer: actorString(session),
      });
    } else {
      action = buildCancelAction({
        proposer: props.proposer,
        proposalName: props.proposalName,
        canceler: actorString(session),
      });
    }

    const r = await transactSimpleAction(session, action);
    setStatus(
      r.ok
        ? `${step} submitted (check wallet / explorer)`
        : `${step} soft-fail: ${r.reason}`
    );
    setConfirmed(false);
    setBusy(false);
  };

  const previewPack = async () => {
    setBusy(true);
    const packed = await packNow();
    setBusy(false);
    if (!packed.ok) {
      setStatus(`pack preview soft-fail: ${packed.reason}`);
      return;
    }
    setProposalHash(packed.proposalHash);
    setLastTrxPreview(JSON.stringify(packed.trxObject, null, 2).slice(0, 2000));
    setStatus(packed.note);
  };

  return (
    <div
      className={`rounded-2xl border border-amber-500/40 bg-black/50 p-4 space-y-3 ${
        props.className ?? ''
      }`}
    >
      <h3 className="text-sm tracking-widest text-amber-400">LIVE WHARFKIT (GUARDED)</h3>
      <p className="text-[11px] opacity-70">
        Anchor / Cloud Wallet / Wombat when installed. Empty inner JSON → single transfer; or paste multi-action array.
      </p>
      <label className="block text-[10px] opacity-70">
        Inner actions JSON (optional multi-action)
        <textarea
          value={innerJson}
          onChange={(e) => setInnerJson(e.target.value)}
          rows={6}
          placeholder="[] = use single transfer fallback"
          className="w-full mt-1 font-mono text-[10px] bg-black/60 border border-white/10 rounded-lg p-2"
        />
      </label>
      <button
        type="button"
        className="text-[10px] underline opacity-70"
        onClick={() => setInnerJson(SAMPLE_MULTI)}
      >
        load sample 2× transfer
      </button>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void login()}
          className="px-3 py-2 rounded-xl text-sm bg-sky-900 disabled:opacity-50"
        >
          {session
            ? `Session: ${actorString(session)}`
            : 'Login (Anchor / Cloud / Wombat)'}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void previewPack()}
          className="px-3 py-2 rounded-xl text-sm bg-violet-900 disabled:opacity-50"
        >
          Preview packed propose.trx
        </button>
        {(['propose', 'approve', 'exec', 'cancel'] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`px-2 py-1 rounded text-[10px] ${
              step === s ? 'bg-emerald-800' : 'bg-white/10'
            }`}
            onClick={() => setStep(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {wallets.length > 0 && (
        <p className="text-[10px] opacity-50">Plugins: {wallets.join(', ')}</p>
      )}
      {proposalHash && (
        <p className="text-[10px] font-mono opacity-60">
          proposal_hash: {proposalHash}
        </p>
      )}
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        I understand this may broadcast a real WAX transaction for step:{' '}
        <span className="font-mono text-amber-300">{step}</span>
      </label>
      <button
        type="button"
        disabled={busy || !session || !confirmed}
        onClick={() => void run()}
        className="w-full px-4 py-3 rounded-xl bg-amber-700 disabled:opacity-40 text-sm font-medium"
      >
        {busy ? 'Working…' : `Broadcast ${step}`}
      </button>
      {lastTrxPreview && (
        <pre className="text-[9px] opacity-60 overflow-auto max-h-40 whitespace-pre-wrap font-mono">
          {lastTrxPreview}
        </pre>
      )}
      {status && (
        <p className="text-[11px] text-emerald-200/80 font-mono" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
