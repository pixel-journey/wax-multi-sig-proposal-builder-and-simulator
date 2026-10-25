# Multi-sig builder — frozen through Pass 15

**Trust label:** educational-reference  
**Updated:** 2026-10-25

| Pass | Delivered |
|------|-----------|
| 1 | Engines tests, WharfKit propose sketch, policy |
| 2 | UI ↔ engines, MD/JSON export |
| 3 | msig action builders, presets, localStorage |
| 4 | Validation, get_account probe |
| 5 | Table probe, CSV |
| 6 | Bulk approvals, risk score, WHARFKIT.md |
| 7 | Approvals table, richer export |
| 8 | Downloads, approve sequence, permission field |
| 9 | Undo stack, force-all sequence |
| 10 | Proposal row normalize/filter, vitest config |
| 11 | TableRowsPanel UI |
| 12 | Import draft JSON, pick name from row |
| 13 | RPC presets, lifecycle helpers |
| 14 | Lifecycle copy, include cancel, related blueprints |
| **15** | Freeze documentation snapshot |

**Still true**

- Pure simulation offline
- Live propose/approve/exec via host + **WharfKit** `session.transact`
- Features only added (clipboard, download, undo, probes, import/export)

```bash
npm install && npm test && npm run dev
```
