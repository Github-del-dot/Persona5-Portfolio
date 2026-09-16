import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

const stats = portfolioData.stats
const traits = portfolioData.traits

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG accent */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, right: 0,
        width: '40%',
        background: 'rgba(230,28,28,0.03)',
        transform: 'skewX(-6deg)',
        transformOrigin: 'top right',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* Section header */}
        <SectionHeader label="ABOUT ME" number="02" inView={inView} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginTop: '60px', alignItems: 'start' }}>
          
          {/* Left: Text + Stats */}
          <div>
            {/* Character card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                background: 'var(--p5-panel)',
                border: '1px solid var(--p5-gray)',
                padding: '24px',
                marginBottom: '30px',
                position: 'relative',
              }}
            >
              {/* Red accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--p5-red)' }} />
              
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--p5-red)',
                letterSpacing: '0.15em',
                marginBottom: '16px',
              }}>
                {portfolioData.personal.personaTitle}
              </div>

              {portfolioData.personal.aboutBio.map((para, idx) => (
                <p key={idx} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'rgba(240,237,224,0.8)',
                  marginBottom: idx === portfolioData.personal.aboutBio.length - 1 ? 0 : '16px',
                }}>
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    background: 'var(--p5-panel)',
                    border: '1px solid var(--p5-gray)',
                    padding: '16px',
                    transform: 'skewX(-3deg)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ transform: 'skewX(3deg)' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      color: 'var(--p5-red)',
                      lineHeight: 1,
                    }}>
                      {stat.icon} {stat.value}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: 'var(--p5-text-dim)',
                      letterSpacing: '0.1em',
                      marginTop: '4px',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Social Stats (Persona 5 style) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div style={{
              background: 'var(--p5-panel)',
              border: '1px solid var(--p5-gray)',
              padding: '30px',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--p5-red)' }} />
              
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                letterSpacing: '0.3em',
                color: 'var(--p5-white)',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{ color: 'var(--p5-red)' }}>◆</span>
                SOCIAL STATS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {traits.map((trait, i) => (
                  <motion.div key={trait.name}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.85rem',
                        letterSpacing: '0.15em',
                        color: 'var(--p5-text-dim)',
                      }}>
                        {trait.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--p5-red)',
                      }}>
                        {trait.val}
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                      transform: 'skewX(-6deg)',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${trait.val}%` } : {}}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, var(--p5-red-dark), var(--p5-red-bright))`,
                          boxShadow: '0 0 6px var(--p5-red)',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Level indicator */}
              <div style={{
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid var(--p5-gray)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--p5-text-dim)' }}>
                  RANK
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <div key={n} style={{
                      width: '12px',
                      height: '12px',
                      background: n <= 7 ? 'var(--p5-red)' : 'rgba(255,255,255,0.1)',
                      transform: 'rotate(45deg)',
                    }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--p5-red)' }}>
                  MAX
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Work Experience & Education Showcase */}
        <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              background: 'var(--p5-panel)',
              border: '1px solid var(--p5-gray)',
              padding: '28px',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--p5-red)' }} />
            
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: '0.25em',
              color: 'var(--p5-white)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ color: 'var(--p5-red)' }}>◆</span>
              EXPERIENCE ARCHIVE
            </div>

            {portfolioData.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--p5-red)', letterSpacing: '0.05em' }}>
                      {exp.role}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--p5-white)', fontWeight: 600 }}>
                      {exp.company} • <span style={{ color: 'var(--p5-text-dim)', fontSize: '0.85rem' }}>{exp.mode}</span>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--p5-white)',
                    background: 'var(--p5-red)',
                    padding: '2px 10px',
                    transform: 'skewX(-6deg)',
                  }}>
                    <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>{exp.period}</span>
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--p5-text-dim)', margin: '8px 0 12px' }}>
                  &gt; PROJECT: {exp.project}
                </div>

                <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {exp.points.map((pt, idx) => (
                    <li key={idx} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      color: 'rgba(240,237,224,0.75)',
                    }}>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Education & Honors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Education Card */}
            <div style={{
              background: 'var(--p5-panel)',
              border: '1px solid var(--p5-gray)',
              padding: '28px',
              position: 'relative',
              flex: 1,
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--p5-red)' }} />
              
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                letterSpacing: '0.25em',
                color: 'var(--p5-white)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{ color: 'var(--p5-red)' }}>▲</span>
                ACADEMIC CREDENTIALS
              </div>

              {portfolioData.education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: idx === portfolioData.education.length - 1 ? 0 : '16px', paddingBottom: idx === portfolioData.education.length - 1 ? 0 : '14px', borderBottom: idx === portfolioData.education.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--p5-white)', letterSpacing: '0.05em' }}>
                      {edu.institution}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--p5-text-dim)' }}>
                      {edu.period}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(240,237,224,0.7)', marginTop: '2px' }}>
                    {edu.degree}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--p5-red)', marginTop: '4px', fontWeight: 600 }}>
                    {edu.score}
                  </div>
                </div>
              ))}
            </div>

            {/* Honors & Certifications Card */}
            <div style={{
              background: 'var(--p5-panel)',
              border: '1px solid var(--p5-gray)',
              padding: '20px 28px',
              position: 'relative',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--p5-red)',
                letterSpacing: '0.2em',
                marginBottom: '12px',
              }}>
                &gt; CERTIFICATIONS & ACHIEVEMENTS:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {portfolioData.achievements.map((ach, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--p5-red)', fontSize: '0.75rem' }}>★</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--p5-white)' }}>
                      {ach.title}
                    </span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--p5-text-dim)' }}>
                      {ach.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({ label, number, inView, light }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          height: '3px',
          width: '40px',
          background: 'var(--p5-red)',
          transformOrigin: 'left',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          letterSpacing: '0.3em',
          color: light ? 'var(--p5-white)' : 'var(--p5-white)',
          position: 'relative',
        }}
      >
        {label}
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-30px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--p5-red)',
        }}>
          {number}
        </span>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          height: '1px',
          flex: 1,
          background: 'rgba(230,28,28,0.3)',
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}
