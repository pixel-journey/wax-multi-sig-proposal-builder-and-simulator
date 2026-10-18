# AI_PROMPTS.md — Multi-Sig Proposal Builder

## 1. Simulate a config

```
Using computeThresholdSnapshot and analyzeProposalRisks on this ProposalConfig [JSON],
report progress, remaining weight, and all risks with triggers.
```

## 2. Design M-of-N

```
Suggest weights for a 3-of-5 treasury multi-sig where no single key meets threshold.
Flag if any one weight >= threshold.
```

## 3. Execution safety

```
List confirmation steps before WharfKit propose/approve/execute.
Separate simulation UI from broadcast actions.
```
