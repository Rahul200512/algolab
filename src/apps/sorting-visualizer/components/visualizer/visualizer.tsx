import { useEffect, useRef } from 'react';

import Header from './header';
import VisualizerDisplay from './visualizer-display';
import { VisualizerProps } from '@sortViz/models/interfaces';
import classes from './visualizer.module.scss';
import useAlgo from '@sortViz/hooks/use-algo.hook';

interface RaceProps extends VisualizerProps {
  /** Finish position assigned by parent (1 = first). Optional — only used in race mode. */
  rank?: number;
  /** When true, publish the active pseudocode line (single-algorithm view only). */
  trackLine?: boolean;
  /** Quiz mode: hide the algorithm name/complexity so it isn't spoiled. */
  hideIdentity?: boolean;
}

const Visualizer = function Visualizer({
  array,
  algoFn,
  algoName = 'Bubble',
  onComplete,
  rank,
  trackLine = false,
  hideIdentity = false,
}: RaceProps) {
  const sortingArray = useRef([...array]);

  const {
    swapCount,
    compareCount,
    isCompleted,
    swaps,
    sorts,
    highlights,
    pivot,
    moves,
  } = useAlgo(sortingArray.current, algoFn, algoName, trackLine);

  useEffect(() => {
    if (isCompleted) {
      onComplete(algoName);
    }
  }, [isCompleted, onComplete, algoName]);

  return (
    <section className={classes.container}>
      <Header
        algoName={algoName}
        isCompleted={isCompleted}
        rank={rank}
        hideIdentity={hideIdentity}
      />

      <VisualizerDisplay
        pivot={pivot}
        array={sortingArray.current}
        swaps={swaps}
        highlights={highlights}
        sorts={sorts}
        moves={moves}
      />

      <footer>
        <span>
          Swaps: <strong>{swapCount}</strong>
        </span>
        <span>
          Comparisons: <strong>{compareCount}</strong>
        </span>
      </footer>
    </section>
  );
};

export default Visualizer;
