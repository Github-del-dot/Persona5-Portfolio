import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from './About'
import { useP5Sound } from '../hooks/useSound'
import { portfolioData } from '../data/portfolioData'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const { playCursor, playConfirm, playType } = useP5Sound()

  const handleChange = (e) => {
    playType()
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    playConfirm()
    setSubmitted(true)
  }

  const contacts = portfolioData.contact.channels

  const inputStyle = (name) => ({
    width: '100%',
    background: focused === name ? 'rgba(230,28,28,0.05)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === name ? 'var(--p5-red)' : 'rgba(255,255,255,0.1)'}`,
    color: 'var(--p5-white)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color 0.15s, background 0.15s',
    cursor: 'none',
  })

  return (
    <section id="contact" ref={ref} style={{
      padding: '100px 0 60px',
      background: 'var(--p5-dark)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Diagonal accent */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '-100px', right: '-100px',
        height: '200px',
        background: 'var(--p5-red)',
        transform: 'rotate(-2deg)',
        transformOrigin: 'bottom',
        opacity: 0.05,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        <SectionHeader label="CONTACT" number="05" inView={inView} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginTop: '60px' }}>
          
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              letterSpacing: '0.05em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              {portfolioData.contact.headingLine1}<br/>
              <span style={{ color: 'var(--p5-red)' }}>{portfolioData.contact.headingLine2}</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(240,237,224,0.6)',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}>
              {portfolioData.contact.subtext}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contacts.map((c, i) => {
                const Content = (
                  <>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      color: 'var(--p5-red)',
                      width: '24px',
                      textAlign: 'center',
                    }}>
                      {c.icon}
                    </span>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--p5-text-dim)',
                        letterSpacing: '0.2em',
                      }}>
                        {c.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--p5-white)',
                      }}>
                        {c.value}
                      </div>
                    </div>
                  </>
                )

                const cardStyle = {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'none',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, background 0.15s',
                }

                return c.href ? (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    onMouseEnter={playCursor}
                    style={cardStyle}
                  >
                    {Content}
                  </motion.a>
                ) : (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    onMouseEnter={playCursor}
                    style={cardStyle}
                  >
                    {Content}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--p5-panel)',
                  border: '2px solid var(--p5-red)',
                  padding: '50px 40px',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4rem',
                  color: 'var(--p5-red)',
                  marginBottom: '16px',
                }}>
                  ★
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  letterSpacing: '0.2em',
                  color: 'var(--p5-white)',
                  marginBottom: '12px',
                }}>
                  MESSAGE SENT!
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--p5-text-dim)',
                  letterSpacing: '0.1em',
                }}>
                  I'll be in touch soon, phantom thief.
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'name', label: 'NAME', type: 'text', placeholder: 'Your name, Phantom Thief...' },
                  { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
                ].map(field => (
                  <div key={field.name}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: focused === field.name ? 'var(--p5-red)' : 'var(--p5-text-dim)',
                      letterSpacing: '0.2em',
                      marginBottom: '6px',
                      transition: 'color 0.15s',
                    }}>
                      &gt; {field.label}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      required
                      style={{
                        ...inputStyle(field.name),
                        '::placeholder': { color: 'rgba(255,255,255,0.2)' },
                      }}
                    />
                  </div>
                ))}

                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: focused === 'message' ? 'var(--p5-red)' : 'var(--p5-text-dim)',
                    letterSpacing: '0.2em',
                    marginBottom: '6px',
                    transition: 'color 0.15s',
                  }}>
                    &gt; MESSAGE
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    style={{
                      ...inputStyle('message'),
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playCursor}
                  style={{
                    background: 'var(--p5-red)',
                    border: 'none',
                    color: 'var(--p5-white)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.3em',
                    padding: '14px 32px',
                    cursor: 'none',
                    transform: 'skewX(-6deg)',
                    transition: 'background var(--transition)',
                    width: '100%',
                  }}
                >
                  <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>
                    ◆ SEND MESSAGE [ENTER]
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '80px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--p5-text-dim)',
            letterSpacing: '0.15em',
          }}>
            {portfolioData.contact.footerCopyright}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            color: 'var(--p5-red)',
            letterSpacing: '0.2em',
          }}>
            WILL STEAL YOUR HEART ◆
          </div>
        </motion.div>
      </div>
    </section>
  )
}
