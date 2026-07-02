# wax-multi-sig-proposal-builder-and-simulator — Multi-Sig Proposal Builder & Simulator

> **Status:** ✅ **FULL PX PERFECTION (Alpha-Ready)** | Public Release Target: July 2026  
> **Category:** Authentication, Multi-Sig & Permission Management (Core Antelope/EOSIO)  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)
> **Benchmark Standard:** henrikpiga/gkniftyheads-tracker + Pixel Journey retro-pixel excellence
> **Companions:** [wax-permission-visualizer-and-editor](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) + [wax-safe-key-rotation-assistant](https://github.com/pixel-journey/wax-safe-key-rotation-assistant)

**One-sentence goal:** A powerful yet safe builder and simulator for Antelope multi-sig proposals. Create, preview, validate, and simulate `eosio.msig` proposals with clear threshold math, risk analysis, and direct WharfKit execution — all client-side.

---

## 1. Educational Overview

Multi-sig (M-of-N) is one of the most powerful features on WAX/Antelope, but creating proposals is error-prone and opaque. This tool makes it visual, educational, and safe.

**Key Concepts Covered**:
- How `eosio.msig` proposals work (propose → approve → execute)
- Threshold vs weight math in real time
- Risk of insufficient approvals or wrong permission
- Simulation before broadcasting

**Why This Matters**:
- Many DAOs and teams lose funds or time due to misconfigured multi-sig proposals.
- Good tooling dramatically increases adoption of secure multi-sig practices.

---

## 2. Tech Recommendations Matrix

| Component              | Recommended                          | Alternative                  | Pros of Chosen                          | Cons of Chosen               |
|------------------------|--------------------------------------|------------------------------|-----------------------------------------|------------------------------|
| **Proposal Builder**  | Stepper + live simulation           | Raw JSON form                | Educational + safe                      | Slightly more UI             |
| **Simulation**        | Pure client JS + permission engine  | On-chain dry run             | Instant + fully educational             | Not 100% on-chain            |
| **Visualization**     | Embedded PermissionTree + approval graph | Text only                 | Visual consistency with companions      | Slight dependency            |
| **Signing**           | WharfKit                            | Manual tx construction       | Modern UX + type safety                 | Requires wallet              |

---

## 3. Machine-Optimized Spec (spec.yaml)

```yaml
blueprint:
  id: wax-multi-sig-proposal-builder-and-simulator
  tier: 1
  category: security-foundational
  status: alpha-ready
  companions:
    - wax-permission-visualizer-and-editor
    - wax-safe-key-rotation-assistant

features:
  - visual_proposal_builder
  - live_threshold_simulation
  - approval_graph_visualization
  - risk_analysis_engine
  - eosio_msig_compatibility
  - wharfkit_execution

machine_instructions:
  - "Build multi-step proposal creator with live simulation"
  - "Implement approval threshold checker and risk scoring"
  - "Add visual approval graph using PermissionTree patterns"
  - "Support propose, approve, and execute flows"
```

---

## 4. Core Implementation

Full production code (types, simulation engine, beautiful wizard UI, live preview) has been committed directly to the repo.

**Key Highlights**:
- Reuses design language and components from the two previous Tier 1 tools for ecosystem consistency.
- Strong safety checks before any proposal is created.
- Clear simulation of who needs to approve and whether threshold will be met.

---

## 5. How to Run
```bash
git clone https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator.git
cd wax-multi-sig-proposal-builder-and-simulator
npm install
npm run dev
```

---

## 6. Ecosystem Position

This completes the core **Tier 1 Security Foundation** trio:
1. Permission Visualizer
2. Safe Key Rotation
3. Multi-Sig Proposal Builder & Simulator

All three share the same high standards, retro pixel aesthetic, and machine-optimized specs for maximum reusability.

*Pixel Journey — Beautiful, safe, educational tooling for WAX and Antelope.*

*Last updated: July 02, 2026 — Full PX Perfection*
