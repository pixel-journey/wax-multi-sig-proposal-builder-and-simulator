/** Optional proposal_hash checks for msig approve payloads. */

export type HashCheck =
  | { ok: true; normalized: string }
  | { ok: false; reason: string };

/**
 * Accept empty (optional field), or hex string (even length, ≥8 chars).
 * Strips optional 0x prefix.
 */
export function checkProposalHash(raw: string): HashCheck {
  const t = raw.trim();
  if (!t) return { ok: true, normalized: "" };
  let h = t.startsWith("0x") || t.startsWith("0X") ? t.slice(2) : t;
  h = h.toLowerCase();
  if (!/^[0-9a-f]+$/.test(h))
    return { ok: false, reason: "proposal hash must be hexadecimal" };
  if (h.length % 2 !== 0)
    return { ok: false, reason: "proposal hash length must be even" };
  if (h.length < 8)
    return { ok: false, reason: "proposal hash too short (min 4 bytes)" };
  return { ok: true, normalized: h };
}
