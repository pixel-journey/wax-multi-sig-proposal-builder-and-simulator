/** Drop `msig` from the address bar without full reload (browser only). */
export function clearShareQuery(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("msig")) return;
    url.searchParams.delete("msig");
    const next = url.pathname + (url.searchParams.toString() ? `?${url.searchParams}` : "") + url.hash;
    window.history.replaceState({}, "", next);
  } catch {
    /* ignore */
  }
}
