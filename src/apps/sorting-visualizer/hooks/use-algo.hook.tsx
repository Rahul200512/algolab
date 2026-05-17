import { useEffect, useRef, useState } from 'react';

import { SortAsyncGenerator } from '@sortViz/models/types';
import { getMeta } from '@sortViz/sorting-algorithms/algo-metadata';
import { resetActiveLine, setActiveLine } from '@sortViz/store/active-line';
import { simulator } from '@sortViz/store/global.state';
import { soundManager } from '@/lib/helpers/sound';

function useAlgo(
  array: number[],
  algorithm: (array: number[]) => SortAsyncGenerator,
  algoName?: string,
  trackLine = false
) {
  const [swaps, setSwaps] = useState([-1, -1]);
  const [moves, setMoves] = useState([-1, -1]);
  const [sorts, setSorts] = useState<number[]>([]);
  const [highlights, setHighlights] = useState([-1, -1]);
  const [pivot, setPivot] = useState<number>(-1);
  const [isCompleted, setIsCompleted] = useState(false);

  const it = useRef(algorithm(array));
  const swapCount = useRef(0);
  const compareCount = useRef(0);

  // Cache max value once for stable pitch mapping across the run.
  const maxValue = useRef(array.length ? Math.max(...array) : 1);
  const lineFor = useRef(algoName ? getMeta(algoName).lineFor : null);

  const fn = async () => {
    await simulator.isPlayingPromise;

    for await (const data of it.current) {
      setSwaps([-1, -1]);
      setHighlights([-1, -1]);
      setMoves([-1, -1]);

      if (trackLine && lineFor.current) {
        const line = lineFor.current[data.type];
        if (line >= 0) setActiveLine(line);
      }

      switch (data.type) {
        case 'swap':
          setHighlights(data.positions);
          setSwaps(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            swapCount.current++;
            soundManager.play(
              array[data.positions[0]] ?? 0,
              maxValue.current,
              'swap'
            );
          }
          break;
        case 'sort':
          setSorts((arr) => [...arr, data.position]);
          break;
        case 'highlight':
          setHighlights(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            compareCount.current++;
            soundManager.play(
              array[data.positions[0]] ?? 0,
              maxValue.current,
              'compare'
            );
          }
          break;
        case 'pivot':
          setPivot(data.position);
          break;
        case 'move':
          setHighlights([data.positions[0], data.positions[0] + 1]);
          setMoves(data.positions);
          if (data.positions[0] !== data.positions[1]) {
            swapCount.current++;
            soundManager.play(
              array[data.positions[0]] ?? 0,
              maxValue.current,
              'swap'
            );
          }
          break;
      }
    }

    if (trackLine) resetActiveLine();
    setIsCompleted(true);
  };

  useEffect(() => {
    if (trackLine) resetActiveLine();
    fn();
    return () => {
      if (trackLine) resetActiveLine();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pivot,
    isCompleted,
    swaps,
    sorts,
    highlights,
    moves,
    swapCount: swapCount.current,
    compareCount: compareCount.current,
  };
}

export default useAlgo;
