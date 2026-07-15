/**
 * The one fetch of the global visit count (`/api/visits`, Upstash Redis),
 * shared by everything that reads it — the visit odometer, the colophon
 * admission, and the yard's passers-by scatter. Memoized at module scope so
 * concurrent consumers (and StrictMode double-mounts) ride a single request.
 * Resolves null when Redis is unreachable; consumers degrade gracefully.
 */
let pending: Promise<number | null> | null = null;

export function getGlobalVisits(): Promise<number | null> {
  if (!pending) {
    pending = fetch("/api/visits")
      .then((r) => r.json())
      .then((data: { total?: number }) => {
        const n = Number(data?.total);
        return Number.isFinite(n) && n > 0 ? n : null;
      })
      .catch(() => null);
  }
  return pending;
}
