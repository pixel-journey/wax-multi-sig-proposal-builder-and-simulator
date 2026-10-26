/**
 * WharfKit SessionKit factory for WAX mainnet.
 * Optional peer path — app still runs offline without a live wallet.
 */

import { WAX_MAINNET_CHAIN_ID } from "./chainId";

export const WAX_MAINNET = {
  id: WAX_MAINNET_CHAIN_ID,
  url: "https://wax.greymass.com",
} as const;

export type SessionLike = {
  actor: { toString(): string } | string;
  permission: { toString(): string } | string;
  permissionLevel?: unknown;
  transact: (args: {
    action?: unknown;
    actions?: unknown[];
  }) => Promise<unknown>;
};

export type SessionKitLike = {
  login: (args?: unknown) => Promise<{ session: SessionLike }>;
  logout: () => Promise<void>;
  restore: () => Promise<SessionLike | undefined>;
};

/**
 * Build a SessionKit for browser hosts.
 * Dynamic-imports WharfKit so vitest/offline paths stay light.
 */
export async function createWaxSessionKit(appName = "pxj-msig-builder"): Promise<{
  ok: true;
  kit: SessionKitLike;
} | { ok: false; reason: string }> {
  try {
    const [{ SessionKit }, { WalletPluginAnchor }, { WebRenderer }] =
      await Promise.all([
        import("@wharfkit/session"),
        import("@wharfkit/wallet-plugin-anchor"),
        import("@wharfkit/web-renderer"),
      ]);
    const kit = new SessionKit({
      appName,
      chains: [WAX_MAINNET],
      ui: new WebRenderer(),
      walletPlugins: [new WalletPluginAnchor()],
    }) as unknown as SessionKitLike;
    return { ok: true, kit };
  } catch (e) {
    return {
      ok: false,
      reason:
        e instanceof Error
          ? e.message
          : "WharfKit packages unavailable — run npm install",
    };
  }
}

export function actorString(session: SessionLike): string {
  return String(session.actor);
}
