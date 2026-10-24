import type { ProposalConfig } from "./types";

export const PRESETS: Array<{ id: string; label: string; config: ProposalConfig }> = [
  {
    id: "2of3",
    label: "2-of-3 equal weight",
    config: {
      proposalName: "ops-2of3",
      threshold: 2,
      actionSummary: "Treasury ops (example)",
      approvals: [
        { account: "alice.wam", weight: 1, hasApproved: false },
        { account: "bob.wam", weight: 1, hasApproved: false },
        { account: "carol.wam", weight: 1, hasApproved: false },
      ],
    },
  },
  {
    id: "3of5",
    label: "3-of-5 council",
    config: {
      proposalName: "council-3of5",
      threshold: 3,
      actionSummary: "Council spend",
      approvals: [
        { account: "a1.wam", weight: 1, hasApproved: false },
        { account: "a2.wam", weight: 1, hasApproved: false },
        { account: "a3.wam", weight: 1, hasApproved: false },
        { account: "a4.wam", weight: 1, hasApproved: false },
        { account: "a5.wam", weight: 1, hasApproved: false },
      ],
    },
  },
  {
    id: "weighted",
    label: "Weighted (2+1+1, threshold 3)",
    config: {
      proposalName: "weighted-ops",
      threshold: 3,
      actionSummary: "Weighted multi-sig",
      approvals: [
        { account: "lead.wam", weight: 2, hasApproved: false },
        { account: "ops.wam", weight: 1, hasApproved: false },
        { account: "sec.wam", weight: 1, hasApproved: false },
      ],
    },
  },
];
