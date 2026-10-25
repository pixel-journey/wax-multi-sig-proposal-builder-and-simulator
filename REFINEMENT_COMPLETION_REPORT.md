# Multi-sig builder — frozen through Pass 20

**Trust label:** educational-reference  
**Updated:** 2026-10-25

| Pass | Delivered |
|------|-----------|
| 1–15 | Core freeze (engines, UI, probes, export, WharfKit path) |
| 16 | `get_info` probe, lifecycle download |
| 17 | WAX chain-id label, unapprove in lifecycle |
| 18 | Off-chain notes, optional `proposal_hash` |
| 19 | Hash validation, single-action copy helpers |
| **20** | Documentation freeze snapshot |

**Still true**

- Offline pure simulation + soft-fail chain probes
- Live propose / approve / unapprove / cancel / exec via host + **WharfKit** `session.transact`
- No feature removals (clipboard, download, undo, import, RPC presets)

```bash
npm install && npm test && npm run dev
```
