import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = e.clientX + 'px'
          trailRef.current.style.top = e.clientY + 'px'
        }
      }, 80)
    }

    const handleOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .clickable')) {
        setHovering(true)
      }
    }
    const handleOut = (e) => {
      if (e.target.closest('a, button, [role="button"], .clickable')) {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={`cursor${hovering ? ' hover' : ''}`} />
      <div ref={trailRef} className="cursor-trail" />
    </>
  )
}
