# A named eosio.msig proposal — not an account threshold

> **Trust:** `educational-reference`  
> **Course:** [examples/EDUCATION.md](examples/EDUCATION.md)

**One-sentence goal:** Tell a permission weight apart from an `eosio.msig` proposal, and lock the arithmetic: one of three approvals at threshold 2 is 50% and still needs 1 more weight. Majority of three equal weights is 2. Supermajority of those same three is also 2.

**Code under test:** `npm test` (56). Action bodies are shapes. The tests do not broadcast.

The WAX mainnet chain id in this repo matches `get_info` on `wax.greymass.com` as of 2026-11-20:

`1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4`

The previous constant in this file did not. The test now pins the full string.

Contract reference: [eosio.msig](https://github.com/AntelopeIO/reference-contracts/tree/main/contracts/eosio.msig). Permission model: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions). Wallet path, if you later sign: [WharfKit](https://wharfkit.com/).

## Related

- [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) — the account-weight kind
- [visualizer](https://github.com/pixel-journey/wax-permission-visualizer-and-editor)
- [auditor](https://github.com/pixel-journey/wax-account-permission-auditor)
- [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant)
- [hardware](https://github.com/pixel-journey/wax-hardware-wallet-integration-patterns)
- [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions)

```bash
npm test
```

MIT — Pixel Journey
