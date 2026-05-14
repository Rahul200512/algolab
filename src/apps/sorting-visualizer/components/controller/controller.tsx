import {
  setIsPlaying,
  setReset,
} from '@sortViz/store/sorting-visualizer.slice';

import ArrayInput from './array-input';
import Execution from './execution';
import SoundSwitch from './sound-switch';
import TypeSwitch from './type-switch';
import classes from './controls.module.scss';
import { useAppDispatch } from '@/host/store/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Controller() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [algoName, dispatch]);

  return (
    <section className={classes.controllerWrapper}>
      <div className={classes.controller} data-testid="controller">
        <ArrayInput />
        <Execution />
      </div>
      <div className={classes.switchContainer}>
        <TypeSwitch />
        <SoundSwitch />
      </div>
    </section>
  );
}

export default Controller;
