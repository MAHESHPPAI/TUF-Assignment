import { useRef, useCallback, useState } from 'react';

export function useMechanicalAudio() {
  const audioCtx = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = useCallback(() => setSoundEnabled((prev) => !prev), []);

  // Initialize context seamlessly
  const initAudio = useCallback(() => {
    if (!audioCtx.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx.current = new AudioContext();
      }
    }
    if (audioCtx.current && audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }
  }, []);

  const playThud = useCallback(() => {
    if (!soundEnabled || !audioCtx.current) return;
    const ctx = audioCtx.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(45, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.1);

    filter.type = 'lowpass';
    filter.frequency.value = 150;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1.5, ctx.currentTime + 0.02); // Short attack
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2); // Fast decay

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }, [soundEnabled]);

  const playTick = useCallback(() => {
    if (!soundEnabled || !audioCtx.current) return;
    const ctx = audioCtx.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // High frequency for mechanical click
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.02);

    filter.type = 'bandpass';
    filter.frequency.value = 2500;
    
    // Tiny pop contour
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.002); // microscopic attack
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03); // rapid microscopic decay

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  }, [soundEnabled]);

  return { initAudio, playThud, playTick, soundEnabled, toggleSound };
}
