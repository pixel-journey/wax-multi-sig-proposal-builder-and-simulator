# Policy

**Threshold simulator** is pure math (safe offline).

**Live multi-sig** on WAX uses `eosio.msig` (propose / approve / exec) with a real **WharfKit** session — that path is **in scope** for host apps. See `examples/wharfPropose.sketch.ts`.

We do **not** silently broadcast from unit tests or the pure engine. We **do** document and test the `session.transact` call boundary so examples are real, not theatre.
