import {
  buildApproveAction,
  buildCancelAction,
  buildExecAction,
  buildUnapproveAction,
  type ChainAction,
} from "./msigActions";
import type { Approval } from "./types";

export function buildLifecycleSketch(input: {
  proposer: string;
  proposalName: string;
  approvals: Approval[];
  executer?: string;
  canceler?: string;
  includeCancel?: boolean;
  includeUnapprove?: boolean;
  forceAllApproves?: boolean;
}): {
  approve: ChainAction[];
  unapprove?: ChainAction[];
  exec: ChainAction;
  cancel?: ChainAction;
} {
  const list = input.forceAllApproves
    ? input.approvals
    : input.approvals.filter((a) => a.hasApproved);
  const approve = list.map((a) =>
    buildApproveAction({
      proposer: input.proposer,
      proposalName: input.proposalName,
      level: {
        actor: a.account,
        permission: a.permission ?? "active",
      },
    })
  );
  const unapprove = input.includeUnapprove
    ? list.map((a) =>
        buildUnapproveAction({
          proposer: input.proposer,
          proposalName: input.proposalName,
          level: {
            actor: a.account,
            permission: a.permission ?? "active",
          },
        })
      )
    : undefined;
  const exec = buildExecAction({
    proposer: input.proposer,
    proposalName: input.proposalName,
    executer: input.executer ?? input.proposer,
  });
  const cancel = input.includeCancel
    ? buildCancelAction({
        proposer: input.proposer,
        proposalName: input.proposalName,
        canceler: input.canceler ?? input.proposer,
      })
    : undefined;
  return { approve, unapprove, exec, cancel };
}

export function lifecycleToJson(
  sketch: ReturnType<typeof buildLifecycleSketch>
): string {
  return JSON.stringify(sketch, null, 2);
}
