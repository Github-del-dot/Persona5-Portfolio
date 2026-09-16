import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Cursor from './components/Cursor'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import { useP5Sound } from './hooks/useSound'

const sections = ['hero', 'about', 'skills', 'projects', 'contact']

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { playTransition } = useP5Sound()
  const observersRef = useRef([])

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!loaded) return

    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)

    observersRef.current = observers
    return () => observers.forEach(o => o.disconnect())
  }, [loaded])

  // Global keyboard handler
  useEffect(() => {
    const handler = (e) => {
      // WASD scroll helpers (when menu is not open)
      if (e.key === 'ArrowDown' || (e.key === 'd' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
        const idx = sections.indexOf(activeSection)
        if (idx < sections.length - 1) {
          document.getElementById(sections[idx + 1])?.scrollIntoView({ behavior: 'smooth' })
          playTransition()
        }
      }
      if (e.key === 'ArrowUp' || (e.key === 'a' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
        const idx = sections.indexOf(activeSection)
        if (idx > 0) {
          document.getElementById(sections[idx - 1])?.scrollIntoView({ behavior: 'smooth' })
          playTransition()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeSection, playTransition])

  return (
    <>
      {/* Atmosphere overlays */}
      <div className="scanlines" />
      <div className="noise" />

      {/* Custom cursor */}
      <Cursor />

      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Main app */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navigation
            activeSection={activeSection}
            onNavigate={(key) => setActiveSection(key)}
          />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </motion.div>
      )}
    </>
  )
}
