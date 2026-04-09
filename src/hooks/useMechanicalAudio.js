import { useRef, useCallback, useState, useEffect } from 'react';

export function useMechanicalAudio() {
  const audioCtx = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = useCallback(() => setSoundEnabled((prev) => !prev), []);

  // 1. Initialize and globally UNLOCK the audio context for iOS
  useEffect(() => {
    const unlockAudioContext = () => {
      if (!audioCtx.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtx.current = new AudioContext();
      }

      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }

      // Play a microscopic, silent tone to physically unlock the iOS audio hardware
      const osc = audioCtx.current.createOscillator();
      const gain = audioCtx.current.createGain();
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(audioCtx.current.destination);
      osc.start(0);
      osc.stop(0.001);

      // Clean up the listeners immediately after unlocking
      window.removeEventListener('touchstart', unlockAudioContext);
      window.removeEventListener('pointerdown', unlockAudioContext);
      window.removeEventListener('click', unlockAudioContext);
    };

    window.addEventListener('touchstart', unlockAudioContext, { once: true });
    window.addEventListener('pointerdown', unlockAudioContext, { once: true });
    window.addEventListener('click', unlockAudioContext, { once: true });

    return () => {
      window.removeEventListener('touchstart', unlockAudioContext);
      window.removeEventListener('pointerdown', unlockAudioContext);
      window.removeEventListener('click', unlockAudioContext);
    };
  }, []);

  // 2. Mobile-Optimized Thud (Heavy Paper)
  const playThud = useCallback(() => {
    if (!soundEnabled || !audioCtx.current || audioCtx.current.state !== 'running') return;
    const ctx = audioCtx.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // MUST be a triangle wave so mobile speakers can reproduce the upper harmonics
    osc.type = 'triangle';

    // Sharp attack from 300Hz down to 80Hz (phone speakers can actually play this)
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15); // Extended decay

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.16);
  }, [soundEnabled]);

  // 3. Mobile-Optimized Tick (Leica Dial)
  const playTick = useCallback(() => {
    if (!soundEnabled || !audioCtx.current || audioCtx.current.state !== 'running') return;
    const ctx = audioCtx.current;

    // Use a white noise buffer instead of an oscillator for a true mechanical "click"
    const bufferSize = ctx.sampleRate * 0.03;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 4000;

    const gain = ctx.createGain();

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(ctx.currentTime);
  }, [soundEnabled]);

  const initAudio = useCallback(() => {
    if (audioCtx.current && audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }
  }, []);

  return { initAudio, playThud, playTick, soundEnabled, toggleSound };
}