/**
 * WharfKit SessionKit factory for WAX mainnet.
 * Recommended wallets only: Anchor + My Cloud Wallet.
 * (Do not add abandoned / sold-off wallet plugins.)
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

export async function createWaxSessionKit(appName = "pxj-msig-builder"): Promise<{
  ok: true;
  kit: SessionKitLike;
  wallets: string[];
} | { ok: false; reason: string }> {
  try {
    const [{ SessionKit }, { WalletPluginAnchor }, { WebRenderer }] =
      await Promise.all([
        import("@wharfkit/session"),
        import("@wharfkit/wallet-plugin-anchor"),
        import("@wharfkit/web-renderer"),
      ]);

    const walletPlugins: unknown[] = [new WalletPluginAnchor()];
    const wallets = ["anchor"];

    try {
      const { WalletPluginCloudWallet } = await import(
        "@wharfkit/wallet-plugin-cloudwallet"
      );
      walletPlugins.push(
        new WalletPluginCloudWallet({
          supportedChains: [WAX_MAINNET_CHAIN_ID],
        })
      );
      wallets.push("cloudwallet");
    } catch {
      /* Cloud Wallet plugin optional if install failed */
    }

    const kit = new SessionKit({
      appName,
      chains: [WAX_MAINNET],
      ui: new WebRenderer(),
      walletPlugins,
    }) as unknown as SessionKitLike;
    return { ok: true, kit, wallets };
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
