import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tracks completion across one or more parallel sort visualizers.
 *
 * - In single-algorithm mode, just signals when the algorithm finishes.
 * - In race mode, records the order each algorithm finishes so the UI can
 *   render 🥇 / 🥈 / 🥉 badges.
 */
function useCompletion(count: number, reset: boolean) {
  const [isComplete, setIsComplete] = useState(false);
  const [finishOrder, setFinishOrder] = useState<string[]>([]);
  const seen = useRef<Set<string>>(new Set());
  const completionCount = useRef(0);

  useEffect(() => {
    completionCount.current = 0;
    seen.current = new Set();
    setIsComplete(false);
    setFinishOrder([]);
  }, [reset]);

  const onComplete = useCallback(
    (algoName?: string) => {
      completionCount.current++;
      if (algoName && !seen.current.has(algoName)) {
        seen.current.add(algoName);
        setFinishOrder((prev) => [...prev, algoName]);
      }
      if (completionCount.current === count) {
        setIsComplete(true);
      }
    },
    [count]
  );

  /** 1-based rank of an algorithm in the finish order, or undefined if not yet finished. */
  const getRank = useCallback(
    (algoName: string): number | undefined => {
      const idx = finishOrder.indexOf(algoName);
      return idx === -1 ? undefined : idx + 1;
    },
    [finishOrder]
  );

  return { onComplete, isComplete, finishOrder, getRank };
}

export default useCompletion;
