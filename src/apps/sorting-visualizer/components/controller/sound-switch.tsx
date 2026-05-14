import { Volume2, VolumeX } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';

import classes from './controls.module.scss';
import { soundManager } from '@/lib/helpers/sound';
import { toggleSound } from '@sortViz/store/sorting-visualizer.slice';
import { useEffect } from 'react';

function SoundSwitch() {
  const dispatch = useAppDispatch();
  const soundEnabled = useAppSelector(
    (state) => state.sortViz.soundEnabled ?? false
  );

  // Keep the singleton SoundManager in sync with persisted Redux state.
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleSound())}
      className={classes.soundButton}
      title={soundEnabled ? 'Mute sound' : 'Enable sound'}
      aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
    >
      {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      <span>{soundEnabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}

export default SoundSwitch;
