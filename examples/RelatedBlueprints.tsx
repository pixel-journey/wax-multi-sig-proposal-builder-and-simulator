"use client";

const LINKS = [
  {
    href: "https://github.com/pixel-journey/wax-permission-visualizer-and-editor",
    label: "Permission visualizer",
    why: "Tree + threshold before proposing",
  },
  {
    href: "https://github.com/pixel-journey/wax-account-permission-auditor",
    label: "Permission auditor",
    why: "Batch risk scores",
  },
  {
    href: "https://github.com/pixel-journey/wax-safe-key-rotation-assistant",
    label: "Key rotation assistant",
    why: "updateauth planning (not msig)",
  },
  {
    href: "https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools",
    label: "Social recovery",
    why: "Weighted helper design",
  },
  {
    href: "https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions",
    label: "WharfKit session keys",
    why: "Scoped hot authority",
  },
  {
    href: "https://github.com/pixel-journey/wax-offline-transaction-queue",
    label: "Offline transaction queue",
    why: "Queue actions offline",
  },
] as const;

export function RelatedBlueprints() {
  return (
    <section className="mt-10 text-xs opacity-70">
      <p className="tracking-widest text-emerald-400/80 mb-2">RELATED</p>
      <ul className="space-y-2">
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
            <p className="opacity-60 mt-0.5">{l.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
