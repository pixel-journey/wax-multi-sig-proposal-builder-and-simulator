# Verification Log

**Trust label:** educational-reference  
**Updated:** 2026-10-25 (Pass 5)

| Claim | Status | Evidence |
| --- | --- | --- |
| Engines / export / msig / validate | unit | Pass 1–4 |
| Table request builders | **verified** | msigTableProbe.test.ts |
| CSV export | **verified** | csvExport.test.ts |
| Live table fetch | soft-fail UI | optional |
| Live msig broadcast | host + WharfKit | example path |

```bash
npm install && npm test
```
