// useSound.js - Generates Persona 5-style sounds using Web Audio API
import { useRef, useCallback } from 'react'

export function useP5Sound() {
  const audioCtxRef = useRef(null)

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // P5 cursor/navigate sound - sharp high click
  const playCursor = useCallback(() => {
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      filter.type = 'bandpass'
      filter.frequency.value = 1800
      filter.Q.value = 8

      osc.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.type = 'square'
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.05)

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.07)
    } catch(e) {}
  }, [])

  // P5 confirm/select sound - two-tone punch
  const playConfirm = useCallback(() => {
    try {
      const ctx = getCtx()
      
      // First tone
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.type = 'sawtooth'
      osc1.frequency.setValueAtTime(600, ctx.currentTime)
      osc1.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.04)
      gain1.gain.setValueAtTime(0.2, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc1.start(ctx.currentTime)
      osc1.stop(ctx.currentTime + 0.08)

      // Second tone
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.type = 'sawtooth'
      osc2.frequency.setValueAtTime(900, ctx.currentTime + 0.08)
      osc2.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.14)
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.08)
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
      osc2.start(ctx.currentTime + 0.08)
      osc2.stop(ctx.currentTime + 0.2)

      // Noise burst
      const bufferSize = ctx.sampleRate * 0.05
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      noise.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start(ctx.currentTime)
    } catch(e) {}
  }, [])

  // P5 cancel/back sound - descending
  const playCancel = useCallback(() => {
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(500, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12)
      gainNode.gain.setValueAtTime(0.18, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.15)
    } catch(e) {}
  }, [])

  // P5 whoosh/transition sound
  const playTransition = useCallback(() => {
    try {
      const ctx = getCtx()
      
      // Noise whoosh
      const bufferSize = ctx.sampleRate * 0.3
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(200, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.15)
      filter.Q.value = 2

      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

      noise.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)
      noise.start(ctx.currentTime)

      // Pitch sweep
      const osc = ctx.createOscillator()
      const oGain = ctx.createGain()
      osc.connect(oGain)
      oGain.connect(ctx.destination)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(100, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15)
      oGain.gain.setValueAtTime(0.15, ctx.currentTime)
      oGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.2)
    } catch(e) {}
  }, [])

  // P5 keystroke typing sound
  const playType = useCallback(() => {
    try {
      const ctx = getCtx()
      const bufferSize = ctx.sampleRate * 0.03
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1)
      
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      
      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.value = 2000 + Math.random() * 1000

      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

      noise.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)
      noise.start(ctx.currentTime)
    } catch(e) {}
  }, [])

  // P5 menu open - dramatic whomp
  const playMenuOpen = useCallback(() => {
    try {
      const ctx = getCtx()
      
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const dist = ctx.createWaveShaper()
      
      // Distortion curve
      const curve = new Float32Array(256)
      for (let i = 0; i < 256; i++) {
        const x = (i * 2) / 256 - 1
        curve[i] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x))
      }
      dist.curve = curve
      
      osc.connect(dist)
      dist.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(80, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1)
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.3)
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
      
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.35)
    } catch(e) {}
  }, [])

  return { playCursor, playConfirm, playCancel, playTransition, playType, playMenuOpen }
}
