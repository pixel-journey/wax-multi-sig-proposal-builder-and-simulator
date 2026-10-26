'use client';

import React from 'react';
import type { PlainInnerAction } from './packProposeTrx';

export type InnerActionsFormProps = {
  proposer: string;
  actions: PlainInnerAction[];
  onChange: (actions: PlainInnerAction[]) => void;
};

function emptyTransfer(from: string): PlainInnerAction {
  return {
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{ actor: from, permission: 'active' }],
    data: {
      from,
      to: '',
      quantity: '0.00000001 WAX',
      memo: '',
    },
  };
}

/** Form editor for 1..N plain inner actions (default transfer-shaped). */
export function InnerActionsForm({
  proposer,
  actions,
  onChange,
}: InnerActionsFormProps) {
  const list = actions.length ? actions : [emptyTransfer(proposer)];

  const update = (idx: number, patch: Partial<PlainInnerAction>) => {
    const next = list.map((a, i) => (i === idx ? { ...a, ...patch } : a));
    onChange(next);
  };

  const updateData = (idx: number, key: string, value: string) => {
    const a = list[idx];
    update(idx, { data: { ...a.data, [key]: value } });
  };

  const add = () => onChange([...list, emptyTransfer(proposer)]);
  const remove = (idx: number) => {
    if (list.length <= 1) return;
    onChange(list.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] opacity-70 tracking-wide">INNER ACTIONS (FORM)</span>
        <button type="button" className="text-[10px] underline opacity-70" onClick={add}>
          + add action
        </button>
      </div>
      {list.map((a, idx) => (
        <div
          key={idx}
          className="border border-white/10 rounded-xl p-3 space-y-2 bg-black/40"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono opacity-50">#{idx + 1}</span>
            <button
              type="button"
              className="text-[10px] text-red-400 disabled:opacity-30"
              disabled={list.length <= 1}
              onClick={() => remove(idx)}
            >
              remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-[10px] opacity-60">
              account
              <input
                className="w-full mt-0.5 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[11px]"
                value={a.account}
                onChange={(e) => update(idx, { account: e.target.value })}
              />
            </label>
            <label className="text-[10px] opacity-60">
              name
              <input
                className="w-full mt-0.5 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[11px]"
                value={a.name}
                onChange={(e) => update(idx, { name: e.target.value })}
              />
            </label>
          </div>
          {a.name === 'transfer' && a.account === 'eosio.token' ? (
            <div className="grid grid-cols-2 gap-2">
              <label className="text-[10px] opacity-60">
                from
                <input
                  className="w-full mt-0.5 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[11px]"
                  value={String(a.data.from ?? '')}
                  onChange={(e) => updateData(idx, 'from', e.target.value)}
                />
              </label>
              <label className="text-[10px] opacity-60">
                to
                <input
                  className="w-full mt-0.5 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[11px]"
                  value={String(a.data.to ?? '')}
                  onChange={(e) => updateData(idx, 'to', e.target.value)}
                />
              </label>
              <label className="text-[10px] opacity-60">
                quantity
                <input
                  className="w-full mt-0.5 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[11px]"
                  value={String(a.data.quantity ?? '')}
                  onChange={(e) => updateData(idx, 'quantity', e.target.value)}
                />
              </label>
              <label className="text-[10px] opacity-60">
                memo
                <input
                  className="w-full mt-0.5 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[11px]"
                  value={String(a.data.memo ?? '')}
                  onChange={(e) => updateData(idx, 'memo', e.target.value)}
                />
              </label>
            </div>
          ) : (
            <label className="text-[10px] opacity-60 block">
              data (JSON object)
              <textarea
                rows={3}
                className="w-full mt-0.5 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-[10px]"
                value={JSON.stringify(a.data, null, 2)}
                onChange={(e) => {
                  try {
                    const data = JSON.parse(e.target.value) as Record<string, unknown>;
                    update(idx, { data });
                  } catch {
                    /* keep typing */
                  }
                }}
              />
            </label>
          )}
        </div>
      ))}
    </div>
  );
}
