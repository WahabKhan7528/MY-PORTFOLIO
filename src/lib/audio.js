class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isDroneMuted = false;
    this.isUiMuted = false;
    
    this.droneOscillator = null;
    this.droneGain = null;
    this.droneLfo = null;
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
    if (this.droneOscillator) return; 

    const t = this.ctx.currentTime;
    
    this.droneOscillator = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();
    this.droneLfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    
    this.droneOscillator.type = 'sawtooth';
    this.droneOscillator.frequency.value = 45; 
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 150;
    
    this.droneGain.gain.setValueAtTime(0, t);
    this.droneGain.gain.linearRampToValueAtTime(0.3, t + 2); // Increased from 0.08 
    
    this.droneLfo.type = 'sine';
    this.droneLfo.frequency.value = 0.2; 
    lfoGain.gain.value = 10;
    this.droneLfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    this.droneOscillator.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);
    
    this.droneOscillator.start();
    this.droneLfo.start();
  }

  stopDrone() {
    if (!this.droneOscillator || !this.ctx) return;
    
    const t = this.ctx.currentTime;
    this.droneGain.gain.cancelScheduledValues(t);
    this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, t);
    this.droneGain.gain.exponentialRampToValueAtTime(0.001, t + 1); 
    
    this.droneOscillator.stop(t + 1);
    this.droneLfo.stop(t + 1);
    
    setTimeout(() => {
      this.droneOscillator = null;
      this.droneGain = null;
      this.droneLfo = null;
    }, 1000);
  }
}

export const audioEngine = new AudioEngine();
