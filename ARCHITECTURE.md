# ARCHITECTURE.md — Multi-Sig Proposal Builder & Simulator

This document describes the architecture and design decisions for the Multi-Sig Proposal Builder & Simulator.

## Overview

The goal is to make creating and simulating `eosio.msig` proposals on WAX/Antelope visual, educational, and significantly safer. The tool provides live threshold math, approval graphs, risk analysis, and direct WharfKit execution — all client-side where possible.

## Core Principles

- **Safety first**: Never let users create proposals that are likely to fail or get stuck.
- **Visual clarity**: Approval requirements and thresholds should be immediately understandable.
- **Live simulation**: All calculations happen instantly in the browser.
- **Educational**: Help users understand multi-sig mechanics while using the tool.
- **Production-ready patterns**: Reusable components and hooks that can be integrated into other applications.

## High-Level Architecture

```
User Interface (Next.js + Tailwind + shadcn/ui)
          │
          ▼
Proposal Builder Form
          │
          ▼
Live Simulation Engine (threshold math + approval graph)
          │
          ▼
Risk Analysis Panel
          │
          ▼
WharfKit Execution Layer (propose / approve / execute)
          │
          ▼
Transaction Confirmation + Feedback
```

## Key Components

| Component                  | Responsibility                                           | Key Technologies             |
|----------------------------|----------------------------------------------------------|------------------------------|
| `ProposalBuilder`          | Form for creating multi-sig proposals                    | React + form state           |
| `ThresholdSimulator`       | Live calculation of required approvals                   | Pure client-side math        |
| `ApprovalGraph`            | Visual representation of who needs to approve            | Graph / tree visualization   |
| `RiskAnalysisPanel`        | Warnings and risk scoring                                | Rule-based analysis          |
| `ExecutionPanel`           | Safe proposal creation / approval / execution            | WharfKit                     |

## Data Flow

1. User configures proposal (actions, permissions, threshold)
2. Simulation engine calculates required approvals in real time
3. Visual approval graph updates instantly
4. Risk analysis provides warnings if the proposal is dangerous or likely to fail
5. User reviews and triggers execution via WharfKit
6. Transaction is previewed and submitted

## Integration with Real Contracts

This tool works directly with the native `eosio.msig` contract on WAX/Antelope. It also supports common patterns used by DAOs and teams.

## Error Handling & Safety

- Strong validation before any transaction is created
- Clear warnings when a proposal cannot be executed with current approvals
- Safe transaction previews via WharfKit
- Graceful handling of network and permission errors

## Accessibility & Performance

- All critical information is available in both visual and textual form
- Simulations run entirely client-side for instant feedback
- Components respect `prefers-reduced-motion`

## Future Extensions

- Batch proposal creation and simulation
- Governance analytics and historical proposal tracking
- Integration with permission visualizer tools
- Template library for common multi-sig actions
- Advanced risk scoring with historical data

This architecture prioritizes **safety, clarity, and education** while remaining flexible for different governance use cases on WAX.
