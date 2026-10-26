# Multi-sig builder — frozen through Pass 30

**Trust label:** educational-reference  
**Updated:** 2026-10-26

| Pass | Delivered |
|------|-----------|
| 1–15 | Core freeze (engines, UI, probes, export, WharfKit) |
| 16–20 | get_info, chain-id, notes/hash, single actions |
| 21–25 | Share URL, remaining weight, export names, feasibility, freeze |
| 26 | Majority / ~2/3 threshold suggestions |
| 27 | Equalize approver weights |
| 28 | Sort approvers (weight / name) |
| 29 | Normalize permissions + copy 1st unapprove |
| **30** | Documentation freeze snapshot |

**Still true**

- Offline pure simulation + soft-fail chain probes
- Live propose / approve / unapprove / cancel / exec via host + **WharfKit** `session.transact`
- No feature removals

```bash
npm install && npm test && npm run dev
```
