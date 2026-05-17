import { getMeta } from '@sortViz/sorting-algorithms/algo-metadata';
import { useActiveLine } from '@sortViz/store/active-line';
import classes from './pseudocode-panel.module.scss';

interface Props {
  algoName: string;
}

function PseudocodePanel({ algoName }: Props) {
  const meta = getMeta(algoName);
  const activeLine = useActiveLine();

  if (meta.pseudocode.length === 0) return null;

  return (
    <aside className={classes.panel} aria-label="Algorithm pseudocode">
      <div className={classes.header}>
        <h3>{meta.displayName}</h3>
        <span className={classes.tag}>Pseudocode</span>
      </div>

      {meta.description && (
        <p className={classes.description}>{meta.description}</p>
      )}

      <div className={classes.complexityRow}>
        <span>
          <strong>Best:</strong> {meta.best}
        </span>
        <span>
          <strong>Avg:</strong> {meta.average}
        </span>
        <span>
          <strong>Worst:</strong> {meta.worst}
        </span>
        <span>
          <strong>Space:</strong> {meta.space}
        </span>
      </div>

      <pre className={classes.code}>
        {meta.pseudocode.map((line, idx) => (
          <div
            key={idx}
            className={`${classes.line} ${
              idx === activeLine ? classes.activeLine : ''
            }`}
          >
            <span className={classes.lineNumber}>{idx + 1}</span>
            <code>{line}</code>
          </div>
        ))}
      </pre>
    </aside>
  );
}

export default PseudocodePanel;
