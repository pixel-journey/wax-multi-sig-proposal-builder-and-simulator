# Examples

This folder contains production-ready, reusable component examples for building and simulating safe multi-sig proposals on WAX/Antelope.

## Shared Types

See `types.ts` for common interfaces (`Approval`, `Risk`, `ProposalConfig`, etc.).

## Available Components

| File                      | Description                                           | Recommended Use Case                     |
|---------------------------|-------------------------------------------------------|------------------------------------------|
| `ThresholdSimulator.tsx`  | Live threshold calculation and progress visualization | Real-time approval math                  |
| `ApprovalGraph.tsx`       | Visual list of required approvals                     | Showing who needs to approve             |
| `RiskAnalysisPanel.tsx`   | Risk warnings and analysis                            | Safety and risk communication            |
| `demo.tsx`                | Full composition example                              | Seeing how everything works together     |

## How to Use

1. Copy the components you need.
2. Adapt styling to your design system.
3. Connect execution logic to WharfKit for real proposal creation.
4. Use shared types from `types.ts` for consistency.

These examples follow strict TypeScript and modern React + WharfKit patterns.
