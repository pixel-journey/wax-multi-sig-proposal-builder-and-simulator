"use client";

const LINKS = [
  {
    href: "https://github.com/pixel-journey/wax-permission-visualizer-and-editor",
    label: "Permission visualizer",
  },
  {
    href: "https://github.com/pixel-journey/wax-account-permission-auditor",
    label: "Permission auditor",
  },
  {
    href: "https://github.com/pixel-journey/wax-safe-key-rotation-assistant",
    label: "Key rotation assistant",
  },
  {
    href: "https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions",
    label: "WharfKit session keys",
  },
  {
    href: "https://github.com/pixel-journey/wax-offline-transaction-queue",
    label: "Offline transaction queue",
  },
] as const;

export function RelatedBlueprints() {
  return (
    <section className="mt-10 text-xs opacity-70">
      <p className="tracking-widest text-emerald-400/80 mb-2">RELATED</p>
      <ul className="space-y-1">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              className="underline hover:text-emerald-300"
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
