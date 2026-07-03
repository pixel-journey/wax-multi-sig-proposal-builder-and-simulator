# wax-multi-sig-proposal-builder-and-simulator — Multi-Sig Proposal Builder & Simulator

> **Status:** 🔄 In Active Development (Pixel Journey Standard)  
> **Category:** Security & Multi-Sig (Core Antelope/WAX)  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**Goal:** Provide a high-quality, educational, and practical reference for building and simulating safe `eosio.msig` proposals on WAX/Antelope. Visual approval graphs, live threshold math, risk analysis, and direct WharfKit execution — all client-side.

This tool helps teams and DAOs create multi-sig proposals confidently and safely.

---

## Vision & Long-Term Participation Mindset

Multi-sig is one of the most powerful security features on WAX/Antelope, but creating proposals is often error-prone. Many teams lose time or funds due to misconfigured proposals or misunderstanding of requirements.

This blueprint makes multi-sig proposal creation visual, educational, and significantly safer — helping teams govern with confidence.

We build this for long-term participants who want their multi-sig governance to be reliable and transparent.

---

## Quick Start

**For Human Developers**
1. Read the Educational Core and Architecture sections.
2. Use the builder and simulator to create and test proposals.
3. Review the Integration Guide for embedding these patterns.

**For AI Agents & AI-Assisted Development**
- Start with `spec.yaml` for structured machine instructions.
- Use the simulation and safety patterns as high-quality context.

---

## Examples Folder

This repository includes a dedicated `/examples` folder with production-ready components:

- `ThresholdSimulator.tsx` — Live threshold calculation and progress
- `ApprovalGraph.tsx` — Visual representation of required approvals

More components (ProposalBuilder, RiskAnalysis, ExecutionPanel) will be added.

---

## 1. Educational Core — Why Multi-Sig Proposal Tooling Matters

Multi-sig proposal creation is complex and risky. This tool makes it visual and safe.

### Key Concepts

| Concept                        | Description                                              | Why It Matters                              |
|--------------------------------|----------------------------------------------------------|---------------------------------------------|
| eosio.msig Flow                | propose → approve → execute                              | Core governance mechanism                   |
| Threshold vs Weight Math       | Real-time calculation of required approvals              | Prevents failed or stuck proposals          |
| Permission Requirements        | Using the correct permission when proposing              | Critical for validity and security          |
| Risk Analysis                  | Identifying insufficient approvals or dangerous setups   | Protects funds and governance               |

### Common Mistakes This Tool Helps Prevent

| Mistake                              | Consequence                        | How This Tool Helps                              |
|--------------------------------------|------------------------------------|--------------------------------------------------|
| Proposing with wrong permission      | Proposal fails or is invalid       | Clear permission selection + validation          |
| Insufficient approvals planned       | Proposal gets stuck                | Live simulation of required approvals            |
| Wrong threshold calculation          | Failed execution                   | Real-time threshold math with warnings           |
| Not understanding who can approve    | Governance confusion               | Visual approval graph + permission analysis      |

### Learning Outcomes

After studying this repository, you should be able to:
- Confidently create and simulate multi-sig proposals
- Understand threshold math and approval requirements
- Identify risks before broadcasting
- Build or integrate multi-sig tooling into your own applications

---

## 2. Architecture & Design Decisions

### Recommended Tech Stack

- **Framework**: Next.js 15 + TypeScript (strict)
- **UI**: Tailwind + shadcn/ui + framer-motion
- **State**: Zustand
- **Simulation**: Pure client-side JavaScript + permission engine
- **Signing**: WharfKit
- **Design System**: Pixel Journey Design System

### Core Component Architecture

```
/components/
  ProposalBuilder.tsx
  ThresholdSimulator.tsx
  ApprovalGraph.tsx
  RiskAnalysisPanel.tsx
  ExecutionPanel.tsx
```

### Key Design Decisions

- Strong safety checks and live simulation before any proposal is created
- Clear visual approval graphs
- Real-time threshold math with warnings
- Reuses patterns from companion Tier 1 security tools
- Client-side simulation for instant, free feedback

---

## 3. Integration Guide

### How to Integrate This Pattern

1. Implement proposal builder with live simulation
2. Add clear approval visualization and threshold math
3. Include risk analysis and safety warnings
4. Connect to WharfKit for safe proposal creation and execution

### Integration Levels

- **Minimal**: Basic proposal form + simple simulation
- **Recommended**: Full builder + visual graphs + risk analysis + WharfKit integration
- **Advanced**: Advanced simulation, batch proposals, governance analytics

---

## 4. Best Practices

- Always simulate before broadcasting
- Clearly show who needs to approve and whether the threshold will be met
- Use strong warnings for risky configurations
- Make permission selection explicit and validated
- Provide clear explanations of why a proposal might fail
- Support both proposal creation and approval flows

### Anti-Patterns to Avoid
- Creating proposals without simulation
- Ignoring permission requirements
- Underestimating the number of required approvals

### Production Readiness Checklist

- [ ] Live simulation of approval thresholds before proposal creation
- [ ] Clear visual + textual representation of who needs to approve
- [ ] Strong warnings for risky or invalid configurations
- [ ] Safe transaction previews via WharfKit
- [ ] Graceful error handling and user-friendly messages
- [ ] Accessibility support (reduced motion, keyboard navigation)
- [ ] Examples demonstrate component composition
- [ ] Documentation explains adaptation for different governance setups

---

## 5. Code Examples

Real component examples are available in the `/examples` folder:

- `ThresholdSimulator.tsx` — Live threshold calculation and progress
- `ApprovalGraph.tsx` — Visual representation of required approvals

---

## 6. Machine Instructions (For AI Agents)

See `spec.yaml` for structured instructions.

Key instructions:
- Build multi-step proposal creator with live simulation
- Implement approval threshold checker and risk scoring
- Add visual approval graph using PermissionTree patterns
- Support propose, approve, and execute flows with clear warnings

---

## 7. Ecosystem Position

This completes the core **Tier 1 Security Foundation** set alongside:
- `wax-permission-visualizer-and-editor`
- `wax-safe-key-rotation-assistant`

All share the same high standards and machine-optimized specs.

Builds on the foundational layer:
- `pixel-journey-standards`
- `gitbook-docs`
- `pixel-journey-templates`
- `wax-ecosystem-blueprint-catalog`

---

## 8. License & Credits

MIT License

Pixel Journey — Educational, practical, and beautiful interfaces for public blockchain infrastructure.

*Last updated: July 2026*
