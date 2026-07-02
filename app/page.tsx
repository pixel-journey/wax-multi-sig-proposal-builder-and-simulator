'use client';

import React, { useState } from 'react';

interface Proposal {
  proposer: string;
  proposal_name: string;
  requested: Array<{ actor: string; permission: string }>;
  trx: any;
}

export default function MultiSigProposalBuilder() {
  const [proposer, setProposer] = useState('pxjourney');
  const [proposalName, setProposalName] = useState('upgrade-contract-v1');
  const [requested, setRequested] = useState([
    { actor: 'pxjourney', permission: 'active' },
    { actor: 'partneraccount', permission: 'active' },
  ]);
  const [threshold, setThreshold] = useState(2);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const simulate = () => {
    const approvalsNeeded = requested.length;
    const canPass = approvalsNeeded >= threshold;
    setSimulationResult({
      canPass,
      approvalsNeeded,
      threshold,
      risk: canPass ? 'low' : 'high',
      message: canPass 
        ? 'This proposal can pass with current requested approvers.' 
        : 'Not enough approvers to meet threshold. Add more or lower threshold.',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="font-press-start text-2xl tracking-widest text-emerald-400 mb-2">MULTI-SIG PROPOSAL BUILDER</div>
        <div className="text-xs opacity-60 mb-8">Pixel Journey • Tier 1 Security • Companion to Visualizer + Rotation Assistant</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Builder Form */}
          <div className="glassmorphic-crt pixel-border p-6 rounded-2xl">
            <h3 className="font-press-start text-sm mb-4">CREATE PROPOSAL</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs opacity-70">Proposer Account</label>
                <input value={proposer} onChange={e => setProposer(e.target.value)} className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm" />
              </div>

              <div>
                <label className="text-xs opacity-70">Proposal Name</label>
                <input value={proposalName} onChange={e => setProposalName(e.target.value)} className="w-full mt-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm" />
              </div>

              <div>
                <label className="text-xs opacity-70">Requested Approvers (M-of-N)</label>
                <div className="mt-2 space-y-2">
                  {requested.map((r, i) => (
                    <div key={i} className="flex gap-2 text-sm font-mono bg-black/40 px-3 py-2 rounded">
                      {r.actor}@{r.permission}
                    </div>
                  ))}
                </div>
                <button onClick={() => setRequested([...requested, { actor: 'newaccount', permission: 'active' }])} className="mt-2 text-xs underline">+ Add Approver</button>
              </div>

              <div>
                <label className="text-xs opacity-70">Approval Threshold</label>
                <input type="number" value={threshold} onChange={e => setThreshold(parseInt(e.target.value))} className="w-24 mt-1 bg-black/60 border border-white/10 px-4 py-2 rounded-xl font-mono" />
              </div>

              <button onClick={simulate} className="w-full mt-4 py-3 bg-emerald-600 rounded-2xl font-medium">SIMULATE PROPOSAL</button>
            </div>
          </div>

          {/* Simulation Panel */}
          <div className="glassmorphic-crt pixel-border p-6 rounded-2xl">
            <h3 className="font-press-start text-sm mb-4">LIVE SIMULATION</h3>
            {!simulationResult ? (
              <div className="text-sm opacity-60">Click "Simulate Proposal" to see if this multi-sig can pass and what the risks are.</div>
            ) : (
              <div>
                <div className={`p-4 rounded-xl mb-4 ${simulationResult.canPass ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {simulationResult.message}
                </div>

                <div className="text-xs space-y-1 opacity-80">
                  <div>Approvers requested: {simulationResult.approvalsNeeded}</div>
                  <div>Threshold needed: {simulationResult.threshold}</div>
                  <div>Risk level: <span className="font-mono">{simulationResult.risk}</span></div>
                </div>

                <button className="mt-6 w-full py-3 border border-emerald-400 rounded-2xl text-sm">PROPOSE ON-CHAIN (WharfKit)</button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] opacity-50">Built to gkniftyheads-tracker + Pixel Journey standards • Full ecosystem synergy with Visualizer and Rotation tools</div>
      </div>
    </div>
  );
}
