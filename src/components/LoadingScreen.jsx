import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingLines = [
  'INITIALIZING PHANTOM THIEVES SYSTEM...',
  'LOADING METAVERSE ACCESS PROTOCOL...',
  'DECRYPTING SHADOW DATA...',
  'COGNITIVE WORLD: ONLINE',
  'STEALING HEARTS SINCE 20XX',
]

export default function LoadingScreen({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | reveal | done

  useEffect(() => {
    // Progress bar
    const progressTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return p + 2
      })
    }, 40)

    // Cycle lines
    const lineTimer = setInterval(() => {
      setLineIndex(i => {
        if (i >= loadingLines.length - 1) {
          clearInterval(lineTimer)
          return i
        }
        return i + 1
      })
    }, 400)

    return () => {
      clearInterval(progressTimer)
      clearInterval(lineTimer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase('reveal'), 300)
      setTimeout(() => setPhase('done'), 900)
      setTimeout(() => onComplete(), 1200)
    }
  }, [progress])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* BG stripes */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(-55deg, transparent, transparent 20px, rgba(230,28,28,0.05) 20px, rgba(230,28,28,0.05) 40px)'
          }} />

          {/* Red flash on reveal */}
          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                style={{ position: 'absolute', inset: 0, background: 'var(--p5-red)', zIndex: 10 }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0, originX: 1 }}
                transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
              />
            )}
          </AnimatePresence>

          <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '600px', padding: '0 40px' }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: '60px' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                color: 'var(--p5-red)',
                letterSpacing: '0.1em',
                lineHeight: 1,
                textShadow: '0 0 40px rgba(230,28,28,0.5)',
              }}>
                PHANTOM
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                color: 'var(--p5-white)',
                letterSpacing: '0.4em',
              }}>
                PORTFOLIO
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--p5-red)',
                letterSpacing: '0.1em',
                minHeight: '20px',
                marginBottom: '20px',
              }}
            >
              <motion.span
                key={lineIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                &gt; {loadingLines[lineIndex]}
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
              transform: 'skewX(-6deg)',
            }}>
              <motion.div style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--p5-red-dark), var(--p5-red-bright))',
                width: `${progress}%`,
                transition: 'width 0.04s linear',
                boxShadow: '0 0 10px var(--p5-red)',
              }} />
            </div>

            {/* Percentage */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--p5-text-dim)',
              textAlign: 'right',
              marginTop: '8px',
            }}>
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>

          {/* Corner decorations */}
          {[
            { top: 20, left: 20 },
            { top: 20, right: 20 },
            { bottom: 20, left: 20 },
            { bottom: 20, right: 20 },
          ].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute',
              ...pos,
              width: '30px',
              height: '30px',
              borderTop: i < 2 ? '2px solid var(--p5-red)' : 'none',
              borderBottom: i >= 2 ? '2px solid var(--p5-red)' : 'none',
              borderLeft: i % 2 === 0 ? '2px solid var(--p5-red)' : 'none',
              borderRight: i % 2 === 1 ? '2px solid var(--p5-red)' : 'none',
            }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
