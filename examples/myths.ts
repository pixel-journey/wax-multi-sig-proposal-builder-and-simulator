export const MSIG_MYTHS = [
  {
    myth: "Account multi-sig and eosio.msig are the same thing",
    reality:
      "Weighted owner/active authorities are permanent permission structure. eosio.msig is a temporary named proposal with approve → exec.",
  },
  {
    myth: "Once approved, the proposal runs automatically",
    reality:
      "Someone must call exec after the requested approvals meet the threshold. Approvals alone do not push the inner trx.",
  },
  {
    myth: "This UI silently broadcasts on mainnet from unit tests",
    reality:
      "Pure engines never broadcast. LiveExecutionPanel requires explicit confirm and a WharfKit session (Anchor / My Cloud Wallet).",
  },
] as const;
