# wax-multi-sig-proposal-builder-and-simulator — Multi-Sig Proposal Builder & Simulator

> **Status:** 🔄 In Active Deep Refinement (PX Perfection Standard)  
> **Category:** Authentication, Multi-Sig & Permission Management (Core Antelope/EOSIO)  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)
> **Benchmark Standard:** gkniftyheads-tracker quality + Pixel Journey retro-pixel excellence + PX Perfection Standard v1.0
> **Companions:** [wax-permission-visualizer-and-editor](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) + [wax-safe-key-rotation-assistant](https://github.com/pixel-journey/wax-safe-key-rotation-assistant)

**One-sentence goal:** A powerful yet safe builder and simulator for Antelope multi-sig proposals. Create, preview, validate, and simulate `eosio.msig` proposals with clear threshold math, risk analysis, approval visualization, and direct WharfKit execution — all client-side with zero custom contracts.

---

## 1. Educational Core — Why Multi-Sig Proposal Tooling Matters

Multi-sig (M-of-N) is one of the most powerful security features on WAX/Antelope, but creating and managing proposals is often error-prone and opaque. Many DAOs and teams lose time, funds, or momentum due to misconfigured proposals, insufficient approvals, or misunderstanding of permission requirements.

This tool makes multi-sig proposal creation visual, educational, and significantly safer.

### Key Concepts This Tool Teaches

- How `eosio.msig` proposals actually work (propose → approve → execute)
- Real-time threshold vs weight math
- The critical importance of using the correct permission when proposing
- Risk of insufficient approvals or wrong signer permission
- Simulation before broadcasting (prevent failed or dangerous proposals)

### Common Mistakes This Tool Helps Prevent

| Mistake                              | Consequence                        | How This Tool Helps                              |
|--------------------------------------|------------------------------------|--------------------------------------------------|
| Proposing with wrong permission      | Proposal fails or is invalid       | Clear permission selection + validation          |
| Insufficient approvals planned       | Proposal gets stuck                | Live simulation of required approvals            |
| Wrong threshold calculation          | Failed execution                   | Real-time threshold math with warnings           |
| Not understanding who can approve    | Governance confusion               | Visual approval graph + permission analysis      |

### Learning Outcomes

After using this blueprint, you will be able to:
- Confidently create and simulate multi-sig proposals
- Understand threshold math and approval requirements
- Identify risks before broadcasting
- Build or integrate multi-sig tooling into your own applications

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
  - "Support propose, approve, and execute flows with clear warnings"
```

---

## 4. Core Implementation

Full production code (types, simulation engine, beautiful wizard UI, live preview, approval graph) has been committed directly to the repo.

**Key Highlights**:
- Reuses design language and components from the companion Tier 1 tools for ecosystem consistency.
- Strong safety checks before any proposal is created.
- Clear simulation of who needs to approve and whether the threshold will be met.

---

## 5. How to Run Locally
```bash
git clone https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator.git
cd wax-multi-sig-proposal-builder-and-simulator
npm install
npm run dev
```

---

## 6. Ecosystem Position

This completes the core **Tier 1 Security Foundation** set:
1. Permission Visualizer & Editor
2. Safe Key Rotation Assistant
3. Multi-Sig Proposal Builder & Simulator

All three share the same high standards, retro-pixel aesthetic, and machine-optimized specs for maximum reusability and educational value.

---

## 7. Related Blueprints
Direct companions in the Tier 1 security family:
- `wax-permission-visualizer-and-editor`
- `wax-safe-key-rotation-assistant`
- `wax-account-permission-auditor`

---

## 8. License & Credits

MIT License — Built to make multi-sig safer and more accessible.
Pixel Journey — Beautiful, safe, educational interfaces for public blockchain data.

*Last updated: July 02, 2026 — Accelerated Deep Refinement Pass*