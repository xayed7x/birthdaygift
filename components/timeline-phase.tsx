"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./timeline-phase.module.css"

interface TimelineEntry {
  id: number
  year: string
  yearDisplay: string
  line1: string
  line2: string
  icon: "figures" | "stars" | "merged" | "infinity"
}

const timelineEntries: TimelineEntry[] = [
  {
    id: 1,
    year: "2021",
    yearDisplay: "2021",
    line1: "When we became best friends...",
    line2: "",
    icon: "figures",
  },
  {
    id: 2,
    year: "2022-2024",
    yearDisplay: "2022-2024",
    line1: "The years we were apart...",
    line2: "But distance couldn't break us",
    icon: "stars",
  },
  {
    id: 3,
    year: "2025",
    yearDisplay: "2025",
    line1: "We found each other again...",
    line2: "And now we call each other fiancé",
    icon: "merged",
  },
  {
    id: 4,
    year: "Future",
    yearDisplay: "Future",
    line1: "What awaits us...",
    line2: "A forever we'll build together",
    icon: "infinity",
  },
]

export default function TimelinePhase({ onComplete }: { onComplete: () => void }) {
  const [backgroundStars, setBackgroundStars] = useState<
    Array<{ id: number; left: number; top: number; duration: number; delay: number }>
  >([])
  const [visibleEntries, setVisibleEntries] = useState<number[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Snake Path Logic
  const [pathLength, setPathLength] = useState(0)
  const pathRef = useRef<SVGPathElement>(null)
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number }[]>([])

  // Measure path length for dashoffset
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [cardPositions, pathRef.current]) // Recalculate if positions change

  // Calculate positions for the snake path
  useEffect(() => {
    // We update this on mount to handle window width
    // But to be responsive, we use relative SVG coordinates (0-100)
    // viewbox is 0 0 100 100(aspect ratio preserved? No, we stretch)
    
    // In CSS:
    // Mobile: Card 85% width.
    // Left Card: Left aligned. Dot is at Top-Right approx (85% + margin).
    // Right Card: Right aligned. Dot is at Top-Left approx (15% - margin).
    
    // Desktop: Card 45% width.
    // Left Card: Dot at ~45% centerish
    // Right Card: Dot at ~55% centerish
    
    // To simplify: We will calculate points assuming a standard flow.
    // Let's rely on a simpler "Center-ish" flow for snake or just use a fixed "S" curve.
    
    // Redefine coordinates to match new CSS
    const mobile = window.innerWidth < 768
    
    const positions = timelineEntries.map((_, index) => {
        const isLeft = index % 2 === 0
        const y = 80 + (index * 250) // Matches CSS spacing approximation
        
        let x = 50 // Default center
        if (mobile) {
            // Mobile: Zig-zag strongly
            x = isLeft ? 85 : 15 
        } else {
            // Desktop: Tighter Zig-zag near center
            x = isLeft ? 48 : 52
        }
        return { x, y }
    })
    setCardPositions(positions)
  }, []) // Simplification: Runs once. For true responsive, add resize listener.

  const generateSnakePath = () => {
     if (cardPositions.length === 0) return ""
     
     // Start from top
     const startX = cardPositions[0].x
     let d = `M ${startX} 0 ` 
     
     cardPositions.forEach((pos, i) => {
         const prevPos = i === 0 ? { x: startX, y: 0 } : cardPositions[i-1]
         
         const cp1x = prevPos.x
         const cp1y = prevPos.y + 100
         const cp2x = pos.x
         const cp2y = pos.y - 100
         
         d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pos.x} ${pos.y} `
     })

     const lastPos = cardPositions[cardPositions.length-1]
     d += `L ${lastPos.x} ${lastPos.y + 200}`

     return d
  }

  // Ref for the entries container to measure full height relative to scroll
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
    setBackgroundStars(generatedStars)
  }, [])

  const handleScroll = () => {
    setHasUserInteracted(true)
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current
      const content = contentRef.current
      
      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const scrollHeight = content.scrollHeight
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = scrollHeight - containerHeight
      // Prevent division by zero if maxScroll is 0
      const rawProgress = maxScroll > 0 ? scrollTop / maxScroll : 0
      
      // Map scroll progress to path length
      // We want the line to draw slightly ahead of view
      const drawProgress = Math.min(Math.max((scrollTop + containerHeight/2) / scrollHeight, 0), 1)
      
      // Custom ease for satisfaction
      setScrollProgress(drawProgress)

      // Check visibility of entries
      const entries = document.querySelectorAll(`.${styles.entry}`)
      entries.forEach((entry, index) => {
        const rect = entry.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        
        // If entry is roughly in the top 3/4 of container
        if (rect.top < containerRect.bottom - 100) {
            setVisibleEntries(prev => {
                if(!prev.includes(index)) return [...prev, index]
                return prev
            })
        }
      })
    }
  }

  // Initial calculation
  useEffect(() => {
    handleScroll()
    // Add scroll listener to window rezise as well if needed, but inner container handles it
  }, [])

  // Custom Icon Rendering
  const renderIcon = (icon: string) => {
     switch (icon) {
       case "figures":
         return (
           <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
             <circle cx="20" cy="20" r="6" fill="#fbbf24" />
             <rect x="17" y="27" width="6" height="15" fill="#fbbf24" />
             <rect x="14" y="32" width="12" height="3" fill="#fbbf24" />
             <circle cx="40" cy="20" r="6" fill="white" />
             <rect x="37" y="27" width="6" height="15" fill="white" />
             <rect x="34" y="32" width="12" height="3" fill="white" />
           </svg>
         )
       case "stars":
        return (
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
             <polygon points="30,10 35,25 50,25 38,35 43,50 30,40 17,50 22,35 10,25 25,25" fill="#fbbf24" opacity="0.8" />
          </svg>
        )
       case "merged":
        return (
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
             <path d="M30 20 Q40 5 50 20 T30 40 T10 20 Q20 5 30 20" fill="#fbbf24" />
          </svg>
        )
       case "infinity":
        return (
           <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
             <path d="M 15 30 Q 20 15, 30 15 Q 40 15, 45 30 Q 40 45, 30 45 Q 20 45, 15 30" fill="none" stroke="#fbbf24" strokeWidth="3" />
             <path d="M 45 30 Q 40 15, 30 15 Q 20 15, 15 30 Q 20 45, 30 45 Q 40 45, 45 30" fill="none" stroke="white" strokeWidth="3" />
           </svg>
        )
       default: return null
     }
  }

  return (
    <div className={styles.container}>
      {/* Background gradient with stars */}
      <div className={styles.background}>
        {backgroundStars.map((star) => (
          <div
            key={star.id}
            className={styles.star}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `${styles.pulse} ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Scrollable content */}
      <div className={styles.scrollContainer} ref={containerRef} onScroll={handleScroll}>
        <div className={styles.content} ref={contentRef}>
            
          {/* Snake Path SVG */}
          <svg className={styles.svgContainer} viewBox="0 0 100 1200" preserveAspectRatio="none">
             <path 
                d={generateSnakePath()} 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.1)" 
                strokeWidth="0.5" 
             />
             <path 
                ref={pathRef}
                d={generateSnakePath()} 
                fill="none" 
                stroke="#fbbf24" 
                strokeWidth="0.8"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength - (pathLength * scrollProgress)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
             />
          </svg>

          {/* Timeline entries */}
          {timelineEntries.map((entry, index) => {
            const isVisible = visibleEntries.includes(index)
            // Active if the line has passed this index approx
            // We can approximate based on scrollProgress
            // Total 4 entries + start/end. 
            // 0 -> ~0.2
            // 1 -> ~0.4
            // 2 -> ~0.6
            // 3 -> ~0.8
            const threshold = (index + 1) * 0.2
            const isActive = scrollProgress > threshold

            return (
              <div
                key={entry.id}
                className={`${styles.entry} ${index % 2 === 0 ? styles.left : styles.right} ${isVisible ? styles.visible : ""}`}
                data-index={index}
              >
                {/* Glass Card Content */}
                <div className={styles.glassCard}>
                    {/* Dot is now INSIDE/ON the card edge via CSS */}
                    <div className={`${styles.dot} ${isActive ? styles.active : ""}`}>
                        <div className={styles.dotInner} />
                    </div>

                  <h3 className={styles.year}>{entry.yearDisplay}</h3>
                  <p className={styles.text}>{entry.line1}</p>
                  {entry.line2 && <p className={styles.text}>{entry.line2}</p>}
                  <div className={styles.iconWrapper}>{renderIcon(entry.icon)}</div>
                </div>
              </div>
            )
          })}

          {/* Ending section */}
          <div className={`${styles.endingSection} ${visibleEntries.includes(timelineEntries.length - 1) ? styles.visible : ""}`}>
            <div className={styles.poeticText}>
              <p>Through all of time, through all of space</p>
              <p>It will always be us, together</p>
              <p>Our eternity begins today...</p>
            </div>

            <button className={styles.endButton} onClick={onComplete}>
              Tap to open our book →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
