// Generative Atmospheric Ambient Audio Synthesizer (Web Audio API)
// Produces a warm, soothing Solfeggio 528Hz harmonic soundscape + Scroll-Speed Haptic Tick

class AmbientAudioEngine {
  private ctx: AudioContext | null = null
  private gainNode: GainNode | null = null
  private oscs: OscillatorNode[] = []
  private isPlaying = false
  private listeners: ((playing: boolean) => void)[] = []
  private lastTickTime = 0

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb)
    }
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying))
  }

  // 1. Ambient Harmonic Soundscape (Solfeggio 528Hz Transformation Frequency + 432Hz Sub-bass)
  public start() {
    try {
      this.initContext()
      if (!this.ctx) return

      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      if (this.isPlaying) return

      const now = this.ctx.currentTime

      // Master gain node with smooth exponential fade-in
      const masterGain = this.ctx.createGain()
      masterGain.gain.setValueAtTime(0.0001, now)
      masterGain.gain.exponentialRampToValueAtTime(0.075, now + 2.5)
      masterGain.connect(this.ctx.destination)
      this.gainNode = masterGain

      // Dual-stage warm filter for liquid pad shimmer
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(520, now)
      filter.Q.setValueAtTime(1.4, now)
      filter.connect(masterGain)

      // Solfeggio 528Hz & 432Hz Sacred Harmonic Chord Matrix (Root, Sub, Fifth, Tenth, Shimmer)
      const freqs = [132, 198, 264, 396, 528]
      this.oscs = []

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, now)

        // Micro-chorus detuning for rich organic depth
        osc.detune.setValueAtTime((idx - 2) * 3.5, now)

        const oscGain = this.ctx.createGain()
        oscGain.gain.setValueAtTime(0.25 / (idx * 0.4 + 1), now)

        osc.connect(oscGain)
        oscGain.connect(filter)
        osc.start(now)
        this.oscs.push(osc)
      })

      this.isPlaying = true
      this.notify()
    } catch (e) {
      console.warn('Ambient audio init skipped:', e)
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying || !this.gainNode) return

    try {
      const now = this.ctx.currentTime
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now)
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

      setTimeout(() => {
        this.oscs.forEach((osc) => {
          try {
            osc.stop()
            osc.disconnect()
          } catch (_) {}
        })
        this.oscs = []
        this.isPlaying = false
        this.notify()
      }, 1250)
    } catch (e) {
      this.isPlaying = false
      this.notify()
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop()
    } else {
      this.start()
    }
  }

  public getPlayingState() {
    return this.isPlaying
  }

  // 2. Mechanical Haptic Scroll-Speed Tick Synthesizer
  // Synthesizes a crisp, tactile wooden/mechanical click whose frequency scales with scroll velocity
  public playScrollTick(velocity = 1) {
    try {
      this.initContext()
      if (!this.ctx) return

      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      const now = this.ctx.currentTime
      if (now - this.lastTickTime < 0.05) return // Throttle to prevent overlap
      this.lastTickTime = now

      // Base pitch scales dynamically with scroll speed (1200Hz -> 2600Hz)
      const clampedVelocity = Math.min(5, Math.max(0.5, velocity))
      const baseFreq = 1100 + clampedVelocity * 280

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(baseFreq, now)
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.028)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(baseFreq * 1.2, now)
      filter.Q.setValueAtTime(3.0, now)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.12, now + 0.002) // Fast attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035) // Rapid decay

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch (_) {}
  }
}

export const ambientAudio = new AmbientAudioEngine()
