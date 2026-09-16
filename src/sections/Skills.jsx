import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from './About'
import { portfolioData } from '../data/portfolioData'

const skillCategories = portfolioData.skills
const techIcons = portfolioData.familiarTech

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} style={{
      padding: '100px 0',
      background: 'var(--p5-dark)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Diagonal red band */}
      <div style={{
        position: 'absolute',
        top: '-60px', left: '-100px', right: '-100px',
        height: '120px',
        background: 'var(--p5-red)',
        transform: 'rotate(-2deg)',
        opacity: 0.07,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        <SectionHeader label="SKILLS" number="03" inView={inView} />

        {/* Skill categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '60px' }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.15, duration: 0.6 }}
              style={{
                background: 'rgba(10,10,10,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Category header */}
              <div style={{
                background: 'var(--p5-red)',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transform: 'skewX(-3deg)',
                marginLeft: '-4px',
                marginRight: '-4px',
              }}>
                <span style={{ transform: 'skewX(3deg)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.2em', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {cat.icon} {cat.category}
                </span>
              </div>

              {/* Skills */}
              <div style={{ padding: '20px' }}>
                {cat.skills.map((skill, si) => (
                  <div key={skill.name} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--p5-white)',
                        letterSpacing: '0.05em',
                      }}>
                        {skill.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--p5-red)',
                      }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      height: '4px',
                      background: 'rgba(255,255,255,0.06)',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.4 + ci * 0.1 + si * 0.06, duration: 0.7, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: 'var(--p5-red)',
                          boxShadow: '0 0 4px var(--p5-red)',
                          position: 'relative',
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          right: 0, top: 0, bottom: 0,
                          width: '4px',
                          background: 'var(--p5-yellow)',
                        }} />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech tags marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '50px',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '30px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--p5-text-dim)',
            letterSpacing: '0.2em',
            marginBottom: '16px',
          }}>
            &gt; ALSO FAMILIAR WITH:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {techIcons.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.04, type: 'spring', stiffness: 200 }}
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(230,28,28,0.4)',
                  padding: '4px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(240,237,224,0.6)',
                  transform: 'skewX(-3deg)',
                  letterSpacing: '0.1em',
                }}
              >
                <span style={{ transform: 'skewX(3deg)', display: 'inline-block' }}>{tech}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
