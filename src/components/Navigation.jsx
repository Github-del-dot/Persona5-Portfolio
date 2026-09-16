import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useP5Sound } from '../hooks/useSound'

const navItems = [
  { key: 'hero',     label: 'HOME',      icon: '◆', shortcut: '1' },
  { key: 'about',    label: 'ABOUT',     icon: '◇', shortcut: '2' },
  { key: 'skills',   label: 'SKILLS',    icon: '▲', shortcut: '3' },
  { key: 'projects', label: 'PROJECTS',  icon: '●', shortcut: '4' },
  { key: 'contact',  label: 'CONTACT',   icon: '★', shortcut: '5' },
]

export default function Navigation({ activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [focused, setFocused] = useState(0)
  const { playCursor, playConfirm, playCancel, playMenuOpen } = useP5Sound()

  const navigate = useCallback((key) => {
    playConfirm()
    onNavigate(key)
    setMenuOpen(false)
    const el = document.getElementById(key)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [onNavigate, playConfirm])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (menuOpen) {
          playCancel()
          setMenuOpen(false)
        }
        return
      }

      if (e.key === 'Tab') {
        // Tab toggles menu
        e.preventDefault()
        playMenuOpen()
        setMenuOpen(m => !m)
        return
      }

      // Shortcut keys 1-5
      const item = navItems.find(n => n.shortcut === e.key)
      if (item) {
        navigate(item.key)
        return
      }

      if (menuOpen) {
        if (e.key === 'ArrowDown' || e.key === 's') {
          e.preventDefault()
          playCursor()
          setFocused(f => (f + 1) % navItems.length)
        }
        if (e.key === 'ArrowUp' || e.key === 'w') {
          e.preventDefault()
          playCursor()
          setFocused(f => (f - 1 + navItems.length) % navItems.length)
        }
        if (e.key === 'Enter') {
          navigate(navItems[focused].key)
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen, focused, navigate, playCursor, playCancel, playMenuOpen])

  return (
    <>
      {/* Top nav bar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.77,0,0.175,1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '60px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          background: 'rgba(10,10,10,0.95)',
          borderBottom: '2px solid var(--p5-red)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate('hero')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--p5-red)',
            letterSpacing: '0.2em',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'var(--p5-white)' }}>◆</span>
          PT
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              onMouseEnter={playCursor}
              style={{
                background: activeSection === item.key ? 'var(--p5-red)' : 'transparent',
                border: 'none',
                color: activeSection === item.key ? 'var(--p5-white)' : 'var(--p5-text-dim)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                padding: '6px 16px',
                cursor: 'none',
                transform: 'skewX(-6deg)',
                transition: 'all var(--transition)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>
                {item.icon} {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Menu toggle hint */}
        <div className="key-hint" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="key">TAB</span>
          <span>MENU</span>
          <span className="key">ESC</span>
          <span>CLOSE</span>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => { playCancel(); setMenuOpen(false) }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.25, ease: [0.77,0,0.175,1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--p5-dark)',
                border: '2px solid var(--p5-red)',
                minWidth: '320px',
                transformOrigin: 'left center',
                overflow: 'hidden',
              }}
            >
              {/* Menu header */}
              <div style={{
                background: 'var(--p5-red)',
                padding: '12px 24px',
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                letterSpacing: '0.3em',
                transform: 'skewX(-3deg)',
                marginLeft: '-4px',
                marginRight: '-4px',
              }}>
                <span style={{ transform: 'skewX(3deg)', display: 'inline-block' }}>
                  ◆ NAVIGATION MENU
                </span>
              </div>

              {/* Menu items */}
              {navItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => navigate(item.key)}
                  onMouseEnter={() => { playCursor(); setFocused(i) }}
                  style={{
                    padding: '14px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'none',
                    background: focused === i ? 'rgba(230,28,28,0.15)' : 'transparent',
                    borderLeft: focused === i ? '4px solid var(--p5-red)' : '4px solid transparent',
                    transition: 'all 0.1s',
                    position: 'relative',
                  }}
                >
                  {focused === i && (
                    <motion.div
                      layoutId="menuSelector"
                      style={{
                        position: 'absolute',
                        left: 0, top: 0, bottom: 0,
                        width: '3px',
                        background: 'var(--p5-red)',
                      }}
                    />
                  )}
                  <span style={{ color: 'var(--p5-red)', fontFamily: 'var(--font-display)', fontSize: '1.2rem', width: '24px' }}>
                    {item.icon}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.2em',
                    color: focused === i ? 'var(--p5-white)' : 'var(--p5-text-dim)',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--p5-text-dim)',
                  }}>
                    [{item.shortcut}]
                  </span>
                </motion.div>
              ))}

              {/* Key hints */}
              <div style={{
                padding: '12px 24px',
                borderTop: '1px solid var(--p5-gray)',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
              }}>
                {[
                  { keys: ['W', 'S'], label: 'Navigate' },
                  { keys: ['ENTER'], label: 'Select' },
                  { keys: ['ESC'], label: 'Close' },
                ].map(({ keys, label }) => (
                  <span key={label} className="key-hint">
                    {keys.map(k => <span key={k} className="key">{k}</span>)}
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
