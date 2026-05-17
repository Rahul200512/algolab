import { useEffect, useRef } from 'react';

import { HeaderProps } from '@sortViz/models/interfaces';
import classes from './header.module.scss';
import { getMeta } from '@sortViz/sorting-algorithms/algo-metadata';
import { useAppSelector } from '@/host/store/hooks';

interface ExtendedHeaderProps extends HeaderProps {
  /** Finish rank in race mode (1 = first). Undefined when not finished or not racing. */
  rank?: number;
}

function rankClass(rank?: number) {
  if (rank === 1) return classes.gold;
  if (rank === 2) return classes.silver;
  if (rank === 3) return classes.bronze;
  return '';
}

function rankLabel(rank: number) {
  if (rank === 1) return '🥇 1st';
  if (rank === 2) return '🥈 2nd';
  if (rank === 3) return '🥉 3rd';
  return `#${rank}`;
}

function Header({ algoName, isCompleted, rank }: ExtendedHeaderProps) {
  const time = useAppSelector((state) => state.sortViz.time);
  const completionTime = useRef(0);
  const meta = getMeta(algoName);

  useEffect(() => {
    if (isCompleted) {
      completionTime.current = time;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  return (
    <header className={classes.header}>
      <h2>{meta.displayName}</h2>

      <div className={classes.complexity} title="Time and space complexity">
        <span className={classes.badge}>
          <span className={classes.label}>avg</span>
          {meta.average}
        </span>
        <span className={classes.badge}>
          <span className={classes.label}>worst</span>
          {meta.worst}
        </span>
        <span className={`${classes.badge} ${classes.space}`}>
          <span className={classes.label}>space</span>
          {meta.space}
        </span>
      </div>

      <span>
        Time: <strong>{completionTime.current || time}</strong>
        {isCompleted && rank ? (
          <span className={`${classes.rank} ${rankClass(rank)}`}>
            {' '}
            {rankLabel(rank)}
          </span>
        ) : null}
      </span>
    </header>
  );
}

export default Header;
