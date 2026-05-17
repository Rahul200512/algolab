import { useSyncExternalStore } from 'react';

/**
 * Tiny external store for the currently-executing pseudocode line.
 *
 * Intentionally NOT in Redux: the sort loop fires hundreds of step events and
 * the sortViz slice is persisted, so routing this through Redux would hammer
 * localStorage. This is a simple pub/sub read by the Pseudocode panel only.
 */

let activeLine = -1;
const listeners = new Set<() => void>();

export function setActiveLine(line: number) {
  if (line === activeLine) return;
  activeLine = line;
  listeners.forEach((l) => l());
}

export function resetActiveLine() {
  setActiveLine(-1);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return activeLine;
}

export function useActiveLine() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
