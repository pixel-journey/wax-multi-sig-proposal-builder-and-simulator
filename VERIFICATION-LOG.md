# Verification Log

Honest record of what has and has not been tested.
Never mark something verified without running it and recording evidence.

## Status legend
- `VERIFIED` — ran against live endpoint or unit test
- `UNTESTED` — code exists, never executed
- `BROKEN` — ran, failed
- `N/A` — not applicable

## Claims in this repo
| Claim | Status | Evidence |
| --- | --- | --- |
| Pure threshold math correctly computes snapshot | UNTESTED | examples/engines.ts |
| Risk analysis flags impossible threshold and single approver | UNTESTED | analyzeProposalRisks |
| Simulation prevents impossible proposals from being treated as executable | UNTESTED | ThresholdSimulator |
| Demo runs with mock data (zero network) | UNTESTED | app/ or examples |

## How to verify
```bash
# Typecheck
npm run typecheck

# (Future) Unit tests on engines.ts
# npx vitest run examples/engines.test.ts
```

**Trust label:** educational-reference
