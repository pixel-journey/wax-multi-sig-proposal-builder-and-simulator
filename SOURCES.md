# Sources

| Source | Use |
| --- | --- |
| [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) | Account thresholds |
| [eosio.msig](https://github.com/AntelopeIO/reference-contracts/tree/main/contracts/eosio.msig) | Named proposals |
| [endpoint failover](https://github.com/pixel-journey/wax-public-endpoint-failover) | Same pinned chain id |

## Product facts locked by tests

- Progress 50% when 1 of 2 weight approved.
- Threshold 10 with one weight-1 approver → score **60**, label **high** (critical ≥75).
- Majority / supermajority of three equal weights both suggest **2**.
- Mainnet chain id: `1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4`.
- Action shapes are **unsent** in unit tests.
