/**
 * SoundManager — lightweight Web Audio API tone generator for sort step feedback.
 *
 * Maps array values to a musical pitch range and plays short, percussive tones
 * synchronized to algorithm steps. Tones are reused via a shared AudioContext
 * so no audio files need to be bundled.
 */

type ToneKind = 'compare' | 'swap';

const MIN_FREQ = 220; // A3
const MAX_FREQ = 880; // A5
const TONE_DURATION = 0.06; // seconds

class SoundManager {
  private context: AudioContext | null = null;
  private enabled = false;

  /** Lazily create the AudioContext on first use (browser policy). */
  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.context) {
      const AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtor) return null;
      this.context = new AudioCtor();
    }
    if (this.context.state === 'suspended') {
      void this.context.resume();
    }
    return this.context;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      // Pre-warm the audio context so the first tone isn't delayed.
      this.getContext();
    }
  }

  isEnabled() {
    return this.enabled;
  }

  /**
   * Play a short tone whose pitch reflects the value's position within
   * the array's value range.
   */
  play(value: number, maxValue: number, kind: ToneKind = 'compare') {
    if (!this.enabled || maxValue <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const ratio = Math.max(0, Math.min(1, value / maxValue));
    const frequency = MIN_FREQ + (MAX_FREQ - MIN_FREQ) * ratio;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = kind === 'swap' ? 'square' : 'triangle';
    oscillator.frequency.value = frequency;

    const peak = kind === 'swap' ? 0.18 : 0.1;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + TONE_DURATION);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + TONE_DURATION);
  }
}

export const soundManager = new SoundManager();
