let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

interface TransmissionCallbacks {
  onPulse?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
}

/**
 * Synthesizes a cinematic "bat-signal rising" rumble using the Web Audio API,
 * then follows up with a deep synthesized voice line via SpeechSynthesis.
 * No external audio files required.
 */
export function playBatTransmission(callbacks?: TransmissionCallbacks) {
  try {
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    callbacks?.onStart?.();

    // Deep cinematic rumble
    const rumble = ctx.createOscillator();
    rumble.type = "sine";
    rumble.frequency.setValueAtTime(70, now);
    rumble.frequency.exponentialRampToValueAtTime(32, now + 2.6);
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.0001, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.38, now + 0.35);
    rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    rumble.connect(rumbleGain).connect(ctx.destination);
    rumble.start(now);
    rumble.stop(now + 2.9);

    // Rising bat-signal sweep
    const sweep = ctx.createOscillator();
    sweep.type = "sawtooth";
    sweep.frequency.setValueAtTime(200, now);
    sweep.frequency.exponentialRampToValueAtTime(760, now + 1.1);
    sweep.frequency.exponentialRampToValueAtTime(380, now + 2.0);
    const sweepGain = ctx.createGain();
    sweepGain.gain.setValueAtTime(0.0001, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.07, now + 0.5);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    sweep.connect(sweepGain).connect(filter).connect(ctx.destination);
    sweep.start(now);
    sweep.stop(now + 2.4);

    // Low sub hit for punctuation
    const hit = ctx.createOscillator();
    hit.type = "triangle";
    hit.frequency.setValueAtTime(120, now + 0.05);
    hit.frequency.exponentialRampToValueAtTime(45, now + 0.6);
    const hitGain = ctx.createGain();
    hitGain.gain.setValueAtTime(0.5, now + 0.05);
    hitGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    hit.connect(hitGain).connect(ctx.destination);
    hit.start(now + 0.05);
    hit.stop(now + 0.8);

    if (callbacks?.onPulse) {
      [0, 650, 1300, 2000].forEach((t) => setTimeout(() => callbacks.onPulse?.(), t));
    }

    window.setTimeout(() => {
      speakLine(callbacks);
    }, 550);
  } catch {
    speakLine(callbacks);
  }
}

function speakLine(callbacks?: TransmissionCallbacks) {
  try {
    if (!("speechSynthesis" in window)) {
      setTimeout(() => callbacks?.onEnd?.(), 1500);
      return;
    }
    const say = () => {
      const utter = new SpeechSynthesisUtterance("Happy Birthday, Jay. The night... is yours.");
      utter.pitch = 0.25;
      utter.rate = 0.82;
      utter.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => /male|daniel|david|google uk english male|fred/i.test(v.name));
      if (preferred) utter.voice = preferred;
      utter.onend = () => callbacks?.onEnd?.();
      utter.onerror = () => callbacks?.onEnd?.();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = say;
      window.setTimeout(say, 200);
    } else {
      say();
    }
  } catch {
    callbacks?.onEnd?.();
  }
}
