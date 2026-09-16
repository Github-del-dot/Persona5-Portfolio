import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useP5Sound } from '../hooks/useSound'
import { portfolioData } from '../data/portfolioData'

const typewriterText = portfolioData.personal.typewriterText || "STEAL YOUR HEART"

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const { playType } = useP5Sound()
  const indexRef = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < typewriterText.length) {
          setTyped(typewriterText.slice(0, indexRef.current + 1))
          indexRef.current++
          playType()
        } else {
          clearInterval(interval)
        }
      }, 80)
      return () => clearInterval(interval)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '60px' }}>
      {/* Animated background stripes */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(-55deg, transparent, transparent 24px, rgba(230,28,28,0.04) 24px, rgba(230,28,28,0.04) 48px)',
        animation: 'stripesMove 8s linear infinite',
      }} />

      <style>{`
        @keyframes stripesMove {
          0% { background-position: 0 0; }
          100% { background-position: 48px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-30px) rotate(-15deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Decorative floating shapes */}
      {[
        { size: 120, top: '15%', right: '8%', delay: '0s', duration: '4s', opacity: 0.08 },
        { size: 60, top: '70%', right: '15%', delay: '1s', duration: '3s', opacity: 0.05 },
        { size: 200, top: '40%', left: '-5%', delay: '0.5s', duration: '5s', opacity: 0.04 },
        { size: 40, top: '25%', left: '20%', delay: '2s', duration: '3.5s', opacity: 0.07 },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: s.size, height: s.size,
          top: s.top, left: s.left, right: s.right,
          background: 'var(--p5-red)',
          opacity: s.opacity,
          transform: 'rotate(45deg)',
          animation: `float ${s.duration} ease-in-out ${s.delay} infinite`,
        }} />
      ))}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', padding: '0 40px', width: '100%' }}>
        
        {/* "CODE NAME" tag */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <div style={{
            background: 'var(--p5-red)',
            padding: '4px 16px',
            transform: 'skewX(-6deg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
          }}>
            <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>
              CODE NAME: {portfolioData.personal.codeName}
            </span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '4px 14px',
            transform: 'skewX(-6deg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            color: 'var(--p5-white)',
          }}>
            <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>
              {portfolioData.personal.fullName}
            </span>
          </div>
          <div style={{ width: '40px', height: '2px', background: 'var(--p5-red)' }} />
        </motion.div>

        {/* Main name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            color: 'var(--p5-white)',
          }}>
            {portfolioData.personal.firstName}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            color: 'var(--p5-red)',
            textShadow: '4px 4px 0 rgba(230,28,28,0.3)',
            WebkitTextStroke: '2px var(--p5-red)',
          }}>
            {portfolioData.personal.lastName}
          </div>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            letterSpacing: '0.3em',
            color: 'var(--p5-text-dim)',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span style={{ color: 'var(--p5-red)' }}>// </span>
          {typed}
          <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--p5-red)' }}>█</span>
        </motion.div>

        {/* Role tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '32px',
          }}
        >
          {portfolioData.personal.roleTags.map((tag, i) => (
            <div key={tag} style={{
              background: i === 2 ? 'var(--p5-red)' : 'transparent',
              border: `2px solid ${i === 2 ? 'var(--p5-red)' : 'rgba(255,255,255,0.2)'}`,
              padding: '6px 18px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              transform: 'skewX(-6deg)',
              color: i === 2 ? 'var(--p5-white)' : 'var(--p5-text-dim)',
            }}>
              <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>{tag}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          <HeroBtn onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }} primary>
            VIEW PROJECTS
          </HeroBtn>
          <HeroBtn onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            CONTACT ME
          </HeroBtn>
        </motion.div>

        {/* Key hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: '50px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}
        >
          <span className="key-hint">
            <span className="key">TAB</span>
            <span>Open Menu</span>
          </span>
          <span className="key-hint">
            <span className="key">1</span>
            <span>-</span>
            <span className="key">5</span>
            <span>Quick Nav</span>
          </span>
          <span className="key-hint">
            <span className="key">ESC</span>
            <span>Close</span>
          </span>
        </motion.div>
      </div>

      {/* Right side decoration */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        {/* Rotating diamond */}
        <div style={{
          width: '80px',
          height: '80px',
          border: '3px solid var(--p5-red)',
          transform: 'rotate(45deg)',
          animation: 'spin 10s linear infinite',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: '10px',
            border: '2px solid rgba(230,28,28,0.3)',
          }} />
        </div>
        
        {/* Vertical text */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--p5-text-dim)',
          writingMode: 'vertical-rl',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          PHANTOM THIEVES OF HEARTS
        </div>

        {/* Dots */}
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: '6px',
            height: '6px',
            background: i === 2 ? 'var(--p5-red)' : 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
          }} />
        ))}
      </motion.div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--p5-text-dim)',
          letterSpacing: '0.2em',
        }}>SCROLL DOWN</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, var(--p5-red), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}

function HeroBtn({ children, onClick, primary }) {
  const { playCursor, playConfirm } = useP5Sound()
  const [hov, setHov] = useState(false)

  return (
    <button
      onClick={() => { playConfirm(); onClick?.() }}
      onMouseEnter={() => { playCursor(); setHov(true) }}
      onMouseLeave={() => setHov(false)}
      style={{
        background: primary ? (hov ? 'var(--p5-red-dark)' : 'var(--p5-red)') : 'transparent',
        border: `2px solid ${primary ? 'var(--p5-red)' : (hov ? 'var(--p5-white)' : 'rgba(255,255,255,0.3)')}`,
        color: primary ? 'var(--p5-white)' : (hov ? 'var(--p5-white)' : 'var(--p5-text-dim)'),
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        letterSpacing: '0.2em',
        padding: '12px 32px',
        cursor: 'none',
        transform: 'skewX(-6deg)',
        transition: 'all var(--transition)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>
        {hov && <span style={{ marginRight: '8px', color: 'var(--p5-red)' }}>◆</span>}
        {children}
      </span>
    </button>
  )
}
