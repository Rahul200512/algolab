import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import Visualizer from '@sortViz/components/visualizer/visualizer';
import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import classes from './quiz.module.scss';
import { getMeta } from '@sortViz/sorting-algorithms/algo-metadata';
import { initialArray } from '@sortViz/config';
import {
  setArray,
  setIsPlaying,
  setReset,
} from '@sortViz/store/sorting-visualizer.slice';

const OPTIONS = ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'];

/** Canonical average-complexity answer derived from the efficiency tier. */
function answerFor(algoName: string): string {
  return getMeta(algoName).tier === 'fast' ? 'O(n log n)' : 'O(n²)';
}

function randomIndex() {
  return Math.floor(Math.random() * algoList.length);
}

function shuffledArray() {
  const arr = [...initialArray];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function QuizPage() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);

  const [algoIdx, setAlgoIdx] = useState(randomIndex);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [questionId, setQuestionId] = useState(0);

  const algo = algoList[algoIdx];
  const correct = useMemo(() => answerFor(algo.name), [algo.name]);

  // Start a fresh shuffled run and auto-play whenever a new question loads.
  useEffect(() => {
    dispatch(setArray(shuffledArray()));
    dispatch(setReset());
    const id = setTimeout(() => dispatch(setIsPlaying(true)), 150);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const handleAnswer = useCallback(
    (option: string) => {
      if (picked) return;
      setPicked(option);
      setAnswered((a) => a + 1);
      if (option === correct) setScore((s) => s + 1);
      dispatch(setIsPlaying(false));
    },
    [picked, correct, dispatch]
  );

  const nextQuestion = useCallback(() => {
    setPicked(null);
    setAlgoIdx(randomIndex());
    setQuestionId((q) => q + 1);
  }, []);

  return (
    <>
      <Toaster richColors duration={2500} />
      <div className={classes.quiz}>
        <div className={classes.topBar}>
          <Link to="/" className={classes.back}>
            ← Home
          </Link>
          <h1>Quiz Mode</h1>
          <span className={classes.score}>
            Score: <strong>{score}</strong> / {answered}
          </span>
        </div>

        <p className={classes.prompt}>
          Watch the algorithm run, then guess its{' '}
          <strong>average time complexity</strong>.
        </p>

        {array.length > 0 && (
          <Visualizer
            key={`quiz-${questionId}-${algo.name}`}
            array={array}
            algoName={algo.name}
            algoFn={algo.fn}
            onComplete={() => {}}
            hideIdentity={!picked}
          />
        )}

        <div className={classes.options}>
          {OPTIONS.map((option) => {
            const isCorrect = option === correct;
            const isPicked = option === picked;
            let state = '';
            if (picked) {
              if (isCorrect) state = classes.correct;
              else if (isPicked) state = classes.wrong;
            }
            return (
              <button
                key={option}
                className={`${classes.option} ${state}`}
                onClick={() => handleAnswer(option)}
                disabled={!!picked}
              >
                {option}
              </button>
            );
          })}
        </div>

        {picked && (
          <div className={classes.result}>
            {picked === correct ? (
              <p className={classes.win}>✅ Correct!</p>
            ) : (
              <p className={classes.lose}>
                ❌ Not quite — the answer is <strong>{correct}</strong>
              </p>
            )}
            <p className={classes.reveal}>
              That was <strong>{getMeta(algo.name).displayName}</strong>.{' '}
              {getMeta(algo.name).description}
            </p>
            <button className={classes.next} onClick={nextQuestion}>
              Next question →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default QuizPage;
