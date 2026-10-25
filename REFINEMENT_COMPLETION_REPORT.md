# Multi-sig builder — frozen through Pass 25

**Trust label:** educational-reference  
**Updated:** 2026-10-25

| Pass | Delivered |
|------|-----------|
| 1–15 | Core freeze (engines, UI, probes, export, WharfKit) |
| 16–20 | get_info, chain-id, notes/hash, single actions, freeze |
| 21 | Shareable draft URL (`?msig=`) |
| 22 | Remaining weight line + clear share query |
| 23 | Proposal-aware export filenames |
| 24 | Impossible threshold (threshold > total weight) |
| **25** | Documentation freeze snapshot |

**Still true**

- Offline pure simulation + soft-fail chain probes
- Live propose / approve / unapprove / cancel / exec via host + **WharfKit** `session.transact`
- No feature removals

```bash
npm install && npm test && npm run dev
```
