'use client';

import React, { useState } from 'react';
import {
  buildApproveAction,
  buildCancelAction,
  buildExecAction,
  type ChainAction,
} from './msigActions';
import { buildProposeEnvelope, transactSimpleAction } from './proposeTrx';
import {
  actorString,
  createWaxSessionKit,
  type SessionLike,
} from './sessionKit';

export type LiveExecutionPanelProps = {
  proposer: string;
  proposalName: string;
  requested: { actor: string; permission: string }[];
  actionSummary?: string;
  transferTo?: string;
  transferQuantity?: string;
  className?: string;
};

/**
 * Guarded live path: login optional, every broadcast needs explicit confirm.
 * Propose still requires host-grade trx serialization for production success;
 * this panel surfaces the real session.transact call path educationally.
 */
export function LiveExecutionPanel(props: LiveExecutionPanelProps) {
  const [session, setSession] = useState<SessionLike | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState<'propose' | 'approve' | 'exec' | 'cancel'>(
    'propose'
  );

  const login = async () => {
    setBusy(true);
    const r = await createWaxSessionKit();
    if (!r.ok) {
      setStatus(r.reason);
      setBusy(false);
      return;
    }
    try {
      const { session: s } = await r.kit.login();
      setSession(s);
      setStatus(`Logged in as ${actorString(s)}`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'login failed');
    }
    setBusy(false);
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
      const env = buildProposeEnvelope({
        proposer: props.proposer,
        proposalName: props.proposalName,
        requested: props.requested,
        inner: {
          from: props.proposer,
          to: props.transferTo ?? 'bob.wam',
          quantity: props.transferQuantity ?? '0.00000001 WAX',
          memo: props.actionSummary ?? 'msig educational',
        },
      });
      action = env.outer;
      setStatus(
        'Note: propose.trx may still need full WharfKit serialization for chain accept — see WHARFKIT.md'
      );
    } else if (step === 'approve') {
      const actor = actorString(session);
      action = buildApproveAction({
        proposer: props.proposer,
        proposalName: props.proposalName,
        level: { actor, permission: 'active' },
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

  return (
    <div
      className={`rounded-2xl border border-amber-500/40 bg-black/50 p-4 space-y-3 ${
        props.className ?? ''
      }`}
    >
      <h3 className="text-sm tracking-widest text-amber-400">LIVE WHARFKIT (GUARDED)</h3>
      <p className="text-[11px] opacity-70">
        Explicit confirm required. No auto-broadcast. Propose may need packed trx serialization for mainnet success.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void login()}
          className="px-3 py-2 rounded-xl text-sm bg-sky-900 disabled:opacity-50"
        >
          {session ? `Session: ${actorString(session)}` : 'Login (Anchor)'}
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
      {status && (
        <p className="text-[11px] text-emerald-200/80 font-mono" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
