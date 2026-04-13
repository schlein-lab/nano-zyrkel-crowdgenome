// =====================================================================
// reduce.js — central prefers-reduced-motion watcher
// ---------------------------------------------------------------------
// Single source of truth for "should motion run". Other modules import
// `reduced()` and optionally `onChange(cb)` — nobody else calls matchMedia
// directly. Toggles `html[data-reduced-motion]` so CSS can branch too.
// =====================================================================

const mql = matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new Set();

function apply(ev) {
  const isReduced = (ev?.matches ?? mql.matches) === true;
  document.documentElement.dataset.reducedMotion = isReduced ? 'true' : 'false';
  for (const cb of listeners) {
    try { cb(isReduced); } catch { /* swallow */ }
  }
}

// subscribe to OS-level changes (user flips the switch mid-session).
mql.addEventListener?.('change', apply);

// paint the initial value synchronously so modules that import us see it.
apply();

/** @returns {boolean} */
export function reduced() {
  return mql.matches === true;
}

/** Subscribe. Returns an unsubscribe fn. */
export function onChange(cb) {
  if (typeof cb !== 'function') return () => {};
  listeners.add(cb);
  return () => listeners.delete(cb);
}
