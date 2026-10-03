import { useCallback, useSyncExternalStore } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';
const ORDER: ThemePreference[] = ['system', 'light', 'dark'];

function readPreference(): ThemePreference {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage can be blocked (private mode); fall back to the system setting.
  }
  return 'system';
}

/** Toggles the `dark` class on <html>; the inline script in index.html applies it before first paint. */
function applyPreference(preference: ThemePreference): void {
  const dark =
    preference === 'dark' ||
    (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', dark ? '#26282c' : '#eeeeeb'));
}

// Module-level store so every toggle instance (desktop and mobile header) shows the same state.
let current: ThemePreference = typeof window === 'undefined' ? 'system' : readPreference();
const listeners = new Set<() => void>();

function setPreference(next: ThemePreference): void {
  current = next;
  try {
    if (next === 'system') window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice still applies for this visit.
  }
  applyPreference(next);
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
  applyPreference(current);
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => current === 'system' && applyPreference('system'));
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTheme(): { preference: ThemePreference; cycle: () => void } {
  const preference = useSyncExternalStore(subscribe, () => current, () => 'system' as ThemePreference);
  const cycle = useCallback(() => setPreference(ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]), []);
  return { preference, cycle };
}
