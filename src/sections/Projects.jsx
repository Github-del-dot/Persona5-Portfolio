import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SectionHeader } from './About'
import { useP5Sound } from '../hooks/useSound'
import { portfolioData } from '../data/portfolioData'

const projects = portfolioData.projects

export default function Projects() {
  const [active, setActive] = useState(null)
  const [focused, setFocused] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { playCursor, playConfirm, playCancel } = useP5Sound()

  return (
    <section id="projects" ref={ref} style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG decoration */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: '30%',
        background: 'repeating-linear-gradient(-55deg, transparent, transparent 20px, rgba(230,28,28,0.03) 20px, rgba(230,28,28,0.03) 40px)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        <SectionHeader label="PROJECTS" number="04" inView={inView} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '60px' }}>
          {projects.map((proj, i) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              index={i}
              inView={inView}
              onOpen={() => { playConfirm(); setActive(proj) }}
              onHover={() => { playCursor(); setFocused(i) }}
              isFocused={focused === i}
            />
          ))}
        </div>

        {/* Key hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}
        >
          <span className="key-hint">
            <span className="key">CLICK</span>
            <span>View Details</span>
          </span>
          <span className="key-hint">
            <span className="key">ESC</span>
            <span>Close</span>
          </span>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {active && (
          <ProjectModal
            project={active}
            onClose={() => { playCancel(); setActive(null) }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project, index, inView, onOpen, onHover, isFocused }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.6 }}
      onClick={onOpen}
      onMouseEnter={onHover}
      style={{
        background: 'var(--p5-panel)',
        border: `1px solid ${isFocused ? 'var(--p5-red)' : 'rgba(255,255,255,0.08)'}`,
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Status bar */}
      <div style={{
        background: project.status === 'COMPLETED' ? 'var(--p5-red)' : 'rgba(255,165,0,0.8)',
        padding: '4px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>{project.status}</span>
        <span>{project.year}</span>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Codename */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--p5-text-dim)',
          letterSpacing: '0.2em',
          marginBottom: '8px',
        }}>
          {project.codename}
        </div>

        {/* Title */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '12px',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: 'var(--p5-red)',
            lineHeight: 1,
          }}>
            {project.icon}
          </span>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              letterSpacing: '0.05em',
              color: 'var(--p5-white)',
              lineHeight: 1.1,
            }}>
              {project.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--p5-text-dim)',
              letterSpacing: '0.1em',
              marginTop: '2px',
            }}>
              {project.subtitle}
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'rgba(240,237,224,0.6)',
          lineHeight: 1.6,
          marginBottom: '16px',
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background: 'rgba(230,28,28,0.1)',
              border: '1px solid rgba(230,28,28,0.3)',
              padding: '2px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'rgba(240,237,224,0.7)',
              letterSpacing: '0.1em',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Action hint */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: isFocused ? 'var(--p5-red)' : 'var(--p5-text-dim)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'color 0.15s',
        }}>
          <span>{isFocused ? '◆' : '◇'}</span>
          CLICK TO VIEW DETAILS
        </div>
      </div>

      {/* Hover effect - red corner */}
      {isFocused && (
        <div style={{
          position: 'absolute',
          bottom: 0, right: 0,
          width: '40px', height: '40px',
          background: 'var(--p5-red)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        }} />
      )}
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.9)',
        zIndex: 5000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--p5-panel)',
          border: '2px solid var(--p5-red)',
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'var(--p5-red)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.2em' }}>
            {project.icon} {project.codename}
          </span>
          <button onClick={onClose} style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            padding: '4px 10px',
            cursor: 'none',
            letterSpacing: '0.1em',
          }}>
            [ESC] CLOSE
          </button>
        </div>

        <div style={{ padding: '30px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            letterSpacing: '0.05em',
            color: 'var(--p5-white)',
            marginBottom: '4px',
          }}>
            {project.title}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--p5-red)',
            letterSpacing: '0.2em',
            marginBottom: '20px',
          }}>
            {project.subtitle}
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'rgba(240,237,224,0.85)',
            marginBottom: '24px',
          }}>
            {project.description} This project showcases various technical skills including modern architecture patterns, performance optimization, and user experience design. Built with scalability in mind to handle growth from day one.
          </p>

          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--p5-text-dim)',
              letterSpacing: '0.2em',
              marginBottom: '10px',
            }}>
              TECH STACK
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  background: 'rgba(230,28,28,0.15)',
                  border: '1px solid var(--p5-red)',
                  padding: '4px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--p5-white)',
                  letterSpacing: '0.1em',
                  transform: 'skewX(-3deg)',
                }}>
                  <span style={{ transform: 'skewX(3deg)', display: 'inline-block' }}>{t}</span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { label: '◆ GITHUB', href: project.links.github },
              project.links.live && { label: '★ LIVE DEMO', href: project.links.live },
            ].filter(Boolean).map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--p5-red)',
                  border: 'none',
                  color: 'white',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.15em',
                  padding: '10px 24px',
                  cursor: 'none',
                  transform: 'skewX(-6deg)',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
