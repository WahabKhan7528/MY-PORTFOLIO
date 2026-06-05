class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isDroneMuted = false;
    this.isUiMuted = false;

    this.droneOscillator = null;
    this.droneGain = null;
    this.droneLfo = null;

    // Multi-voice ambient pad support
    this.droneOscillators = [];
    this.droneGains = [];
    this.droneLfos = [];
    this.masterDroneGain = null;

    // Smooth lo-fi sequencer support
    this.sequencerInterval = null;
    this.bpm = 72;
    this.currentStep = 0;
    this.nextNoteTime = 0.0;
    this.masterSmoothGain = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.isDroneMuted = !this.isDroneMuted;

    if (this.isDroneMuted) {
      this.stopDrone();
    } else {
      this.playDrone();
    }
    return !this.isDroneMuted; // Return true if drone is ON
  }

  playClick() {
    if (this.isUiMuted || !this.ctx || this.ctx.state === 'suspended') return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.05);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, t);
    filter.Q.value = 1;

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.01); // Increased from 0.1
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  playTelemetry() {
    if (this.isUiMuted || !this.ctx || this.ctx.state === 'suspended') return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 1200, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.01); // Increased from 0.05
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  playThud() {
    if (this.isUiMuted || !this.ctx || this.ctx.state === 'suspended') return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(20, t + 0.5);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(1.0, t + 0.05); // Increased from 0.5
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  playDrone() {
    if (this.isDroneMuted || !this.ctx) return;
    this.startSmoothSequencer();
  }

  stopDrone() {
    this.stopSmoothSequencer();
  }

  startSmoothSequencer() {
    if (this.sequencerInterval) return;
    this.init();

    const t = this.ctx.currentTime;
    this.nextNoteTime = t;
    this.currentStep = 0;
    this.bpm = 72; // Super relaxing, laid-back lo-fi chillout tempo
    const stepTime = 60 / this.bpm / 4; // 16th notes (approx 208ms per step)

    // Master volume for the smooth lounge beat (0.15 is perfectly pleasant and gentle)
    this.masterSmoothGain = this.ctx.createGain();
    this.masterSmoothGain.gain.setValueAtTime(0, t);
    this.masterSmoothGain.gain.linearRampToValueAtTime(0.15, t + 0.6); // Smooth fade-in
    this.masterSmoothGain.connect(this.ctx.destination);

    // Highly precise time scheduling loop
    this.sequencerInterval = setInterval(() => {
      if (!this.ctx) return;
      const scheduleAheadTime = 0.15; // Schedule notes 150ms in advance
      while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
        this.scheduleSmoothStep(this.currentStep, this.nextNoteTime);
        this.currentStep = (this.currentStep + 1) % 16;
        this.nextNoteTime += stepTime;
      }
    }, 30);
  }

  stopSmoothSequencer() {
    if (!this.sequencerInterval) return;

    clearInterval(this.sequencerInterval);
    this.sequencerInterval = null;

    if (this.masterSmoothGain) {
      const t = this.ctx.currentTime;
      try {
        this.masterSmoothGain.gain.cancelScheduledValues(t);
        this.masterSmoothGain.gain.setValueAtTime(this.masterSmoothGain.gain.value, t);
        this.masterSmoothGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      } catch (e) {}

      const gainNodeToClean = this.masterSmoothGain;
      setTimeout(() => {
        try {
          gainNodeToClean.disconnect();
        } catch (e) {}
      }, 600);
      this.masterSmoothGain = null;
    }
  }

  scheduleSmoothStep(step, time) {
    // 1. Laid-back Chillout Drums (Kick, Snare, Hi-hat)
    // Relaxed kick pattern on beats 1 and 3 (plus a subtle slide note at step 10)
    const kickPattern = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0];
    if (kickPattern[step]) {
      this.playSmoothKick(time);
    }

    // Warm brush snare/rimshot on beats 2 and 4 (steps 4 and 12)
    const snarePattern = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    if (snarePattern[step]) {
      this.playSmoothSnare(time, 0.45);
    }

    // Dusty lo-fi hi-hats on running eighth notes
    const hatPattern = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
    if (hatPattern[step]) {
      this.playSmoothHat(time, 0.16);
    }

    // 2. Deep Acoustic Bass Roots (Soft and warm sines)
    // Root notes matching the Rhodes chord progression
    const bassRhythm = {
      0:  { freq: 65.41, dur: 0.70, vol: 0.4 }, // C2
      4:  { freq: 55.00, dur: 0.70, vol: 0.4 }, // A1
      8:  { freq: 87.31, dur: 0.70, vol: 0.4 }, // F2
      12: { freq: 49.00, dur: 0.70, vol: 0.4 }  // G1
    };

    if (bassRhythm[step]) {
      const note = bassRhythm[step];
      this.playSmoothBass(time, note.freq, note.dur, note.vol);
    }

    // 3. Fender Rhodes Electric Chords (Warm minor 9 / major 7 stabs)
    // Sweeping lush stabs that loop beautifully
    const chordProgression = {
      // Step 0: Cmaj7 [C3, E3, G3, B3]
      0:  { freqs: [130.81, 164.81, 196.00, 246.94], dur: 0.75, vol: 0.16 },
      // Step 4: Am9 [A2, C3, E3, G3]
      4:  { freqs: [110.00, 130.81, 164.81, 196.00], dur: 0.75, vol: 0.16 },
      // Step 8: Fmaj7 [F2, A2, C3, E3]
      8:  { freqs: [87.31, 110.00, 130.81, 164.81],  dur: 0.75, vol: 0.16 },
      // Step 12: Gsus4 / G7 [G2, C3, D3, G3]
      12: { freqs: [98.00, 130.81, 146.83, 196.00],  dur: 0.75, vol: 0.16 }
    };

    if (chordProgression[step]) {
      const stab = chordProgression[step];
      this.playRhodesStab(time, stab.freqs, stab.dur, stab.vol);
    }
  }

  playSmoothKick(time) {
    if (!this.ctx || !this.masterSmoothGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.masterSmoothGain);

    osc.frequency.setValueAtTime(95, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.15);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.55, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.16);
  }

  playSmoothSnare(time, volume) {
    if (!this.ctx || !this.masterSmoothGain) return;

    const bufferSize = this.ctx.sampleRate * 0.11;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 850;
    filter.Q.value = 1.4;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume * 0.32, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    const bodyOsc = this.ctx.createOscillator();
    const bodyGain = this.ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(135, time);

    bodyGain.gain.setValueAtTime(0, time);
    bodyGain.gain.linearRampToValueAtTime(volume * 0.12, time + 0.005);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterSmoothGain);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(this.masterSmoothGain);

    noise.start(time);
    noise.stop(time + 0.12);
    bodyOsc.start(time);
    bodyOsc.stop(time + 0.08);
  }

  playSmoothHat(time, volume) {
    if (!this.ctx || !this.masterSmoothGain) return;

    const bufferSize = this.ctx.sampleRate * 0.022;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 9500;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume * 0.22, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.022);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterSmoothGain);

    noise.start(time);
    noise.stop(time + 0.025);
  }

  playSmoothBass(time, freq, duration, volume) {
    if (!this.ctx || !this.masterSmoothGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(95, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume * 0.72, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterSmoothGain);

    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  playRhodesStab(time, frequencies, duration, volume) {
    if (!this.ctx || !this.masterSmoothGain) return;

    frequencies.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, time);
      filter.Q.value = 1.0;

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(volume * 0.25, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      // Lush, warm delay line
      const delay = this.ctx.createDelay(1.5);
      const delayFeedback = this.ctx.createGain();
      const delayVolume = this.ctx.createGain();

      delay.delayTime.setValueAtTime(0.833, time); // perfectly synced to 72 BPM delay echos
      delayFeedback.gain.setValueAtTime(0.45, time);
      delayVolume.gain.setValueAtTime(0.35, time);

      delay.connect(delayFeedback);
      delayFeedback.connect(delay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterSmoothGain);

      gain.connect(delay);
      delay.connect(delayVolume);
      delayVolume.connect(this.masterSmoothGain);

      osc.start(time);
      osc.stop(time + duration + 0.02);
    });
  }
}

export const audioEngine = new AudioEngine();
