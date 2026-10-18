# wax-multi-sig-proposal-builder-and-simulator

> **Trust Label:** `educational-reference`  
> **Verification:** See [VERIFICATION-LOG.md](VERIFICATION-LOG.md) for honest status of all claims (currently UNTESTED).

> **Status:** 🔄 Deep Refinement (PX Perfection Standard)  
> **Category:** Security & Multi-Sig (Core Antelope/WAX)  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)  
> **Resilience:** [ECOSYSTEM-RESILIENCE.md](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/ECOSYSTEM-RESILIENCE.md)

**Goal:** Educational, production-minded reference for building and **simulating** safe multi-sig proposals (`eosio.msig`-style) on WAX/Antelope — threshold math, approval graphs, risk analysis, and gated execution patterns.

When vendor frontends disappear, **multi-sig + published action recipes** are how treasuries and DAOs keep moving without trusting a single domain.

---

## Vision

Multi-sig is powerful and easy to misconfigure. Stuck proposals, single-key “multi-sig,” and impossible thresholds burn time and trust.

This blueprint prioritizes:

- **Pure threshold math** before any broadcast
- **Cited risks** (impossible threshold, single approver, one-key threshold)
- **Visual + textual** approval state
- **Execution as a separate, confirmed step** — not one-click from a monitoring screen

---

## Quick Starts

### Humans
1. Read threshold vs total weight in §1.
2. Use `/examples` — `engines.ts`, simulator, graph, risks, builder, execution panel.
3. Pair with `wax-permission-visualizer-and-editor` for account authority design.

### AI agents
1. Load `spec.yaml`.
2. Use `computeThresholdSnapshot` and `analyzeProposalRisks` from `examples/engines.ts`.
3. Never invent permission structures; verify on explorer.

---

## 1. Educational Core

| Concept | Why it matters |
|---------|----------------|
| **propose → approve → execute** | Native msig lifecycle |
| **Threshold vs total weight** | Impossible configs fail forever |
| **Weight concentration** | One signer meeting threshold ≠ multi-party security |
| **Stuck proposals** | No remaining approvers below threshold |

### Common mistakes

| Mistake | Tool response |
|---------|----------------|
| Threshold > sum of weights | High risk: impossible |
| Single approver | High risk: not resilient |
| One weight ≥ threshold | Medium risk: false multi-sig |
| Execute without simulation | Anti-pattern — always simulate first |

---

## 2. Architecture

```
ProposalConfig
  → engines (computeThresholdSnapshot, analyzeProposalRisks)
  → ThresholdSimulator / ApprovalGraph / RiskAnalysisPanel
  → ProposalBuilder / ExecutionPanel (WharfKit, gated)
```

Pure engines live in `examples/engines.ts`. UI components consume snapshots only.

---

## 3. Integration levels

| Level | Scope |
|-------|--------|
| **Minimal** | Threshold snapshot + risk list |
| **Recommended** | Builder + graph + risks + confirmed execute |
| **Advanced** | Live account permission import, batch proposes |

---

## 4. Best practices

**Do** simulate; show remaining weight; keep proposal text/actions in git as well as UI.  
**Don’t** treat a green progress bar as permission to skip ABI review.

See catalog **ECOSYSTEM-RESILIENCE.md** — multi-sig is the durable path when SaaS frontends die.

---

## 5. Ecosystem position

Tier-1 security companion to:

- `wax-permission-visualizer-and-editor`
- `wax-safe-key-rotation-assistant`
- `wax-secure-key-management-and-privacy-tools`
- DAO treasury & governance blueprints (execute after vote)

---

## 6. License

MIT — **Pixel Journey**

*Exemplifies the [PX Perfection Standard](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/PX-PERFECTION-STANDARD.md).*

*Last major refinement pass: October 2026*
