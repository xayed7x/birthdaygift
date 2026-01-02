"use client"

import { useState, useEffect } from "react"
import styles from "./constellation-phase.module.css"

interface Star {
  id: number
  x: number
  y: number
  size: "small" | "medium" | "large"
  title: string
  description: string
  index: number
  isSpecial?: boolean
}

const stars: Star[] = [
  {
    id: 1,
    x: 30,
    y: 20,
    size: "medium",
    title: "Class 7, 2021",
    description:
      "Where it all began\nWe were just classmates\nLittle did we know this was the start\nof something beautiful",
    index: 0,
  },
  {
    id: 2,
    x: 65,
    y: 25,
    size: "large",
    title: "Pilot School Talk ⭐",
    description:
      '"tui jodi pilot school a thaktis\ntaile tore best friend banatam"\n\n"akn hossi, jawyer ag porzonto"\n\nAnd here we are... still together',
    index: 1,
    isSpecial: true,
  },
  {
    id: 3,
    x: 20,
    y: 45,
    size: "medium",
    title: "Best Friends Forever",
    description:
      "From strangers to best friends\nWe found in each other\nwhat we were looking for\nA bond that nothing could break",
    index: 2,
  },
  {
    id: 4,
    x: 50,
    y: 50,
    size: "small",
    title: "The Distance",
    description: "2022-2024\nMiles apart, yet never distant\nOur hearts stayed connected\nthrough the silence",
    index: 3,
  },
  {
    id: 5,
    x: 75,
    y: 50,
    size: "medium",
    title: "Sleepless Nights 🌙",
    description:
      "When we start talking at night...\nTime stops, hours feel like minutes\nThese are the moments I cherish most\nOur endless conversations under the stars",
    index: 4,
  },
  {
    id: 6,
    x: 35,
    y: 70,
    size: "large",
    title: "Reunion 2025",
    description:
      "We found our way back\nStronger than before\nNo longer just best friends\nBut something infinitely more",
    index: 5,
  },
  {
    id: 7,
    x: 65,
    y: 75,
    size: "medium",
    title: "Future Promise",
    description: "My sweetheart, my fiancé\nThe one I call mine\nTogether we'll build\nthe forever we dream of",
    index: 6,
  },
  {
    id: 8,
    x: 50,
    y: 85,
    size: "large",
    title: "Today - Your Birthday ✨",
    description: "19 years of you\n4 years of us\nAnd a lifetime ahead\n\nHappy Birthday, Athoy 🤍",
    index: 7,
    isSpecial: true,
  },
]

const connections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [0, 4],
  [2, 5],
]

interface ConstellationPhaseProps {
  onComplete?: () => void
}

export default function ConstellationPhase({ onComplete }: ConstellationPhaseProps) {
  const [backgroundStars, setBackgroundStars] = useState<
    Array<{ id: number; left: number; top: number; duration: number; delay: number }>
  >([])
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [viewedStars, setViewedStars] = useState<number[]>([])
  const [moonOpacity, setMoonOpacity] = useState(0.4) // This state is no longer directly controlling moon opacity, but it's still there.

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

  const handleStarExplore = (star: Star) => {
    setSelectedStar(star)
    if (!viewedStars.includes(star.id)) {
      setViewedStars(prev => [...prev, star.id])
    }
  }

  const handleClosPopup = () => {
    setSelectedStar(null)
  }

  const allViewed = viewedStars.length === stars.length

  const handleMoonClick = () => {
    if (allViewed) {
      onComplete?.()
    }
  }

  useEffect(() => {
    if (selectedStar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedStar])

  const getSizeValue = (size: string): number => {
    switch (size) {
      case "small":
        return 8
      case "medium":
        return 12
      case "large":
        return 16
      default:
        return 12
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

      {/* Constellation area */}
      <div className={styles.constellationWrapper}>
        <svg className={styles.constellationSvg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Draw connections */}
          {connections.map((conn, idx) => {
            const star1 = stars[conn[0]]
            const star2 = stars[conn[1]]
            // Only show connection if both stars are viewed? Or always show? 
            // Better to always show but maybe dimmer? Keeping as is.
            return (
              <line
                key={`line-${idx}`}
                x1={star1.x}
                y1={star1.y}
                x2={star2.x}
                y2={star2.y}
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="0.2"
                className="transition-all duration-1000 ease-in-out"
              />
            )
          })}

          {/* Draw stars as Star Shapes */}
          {stars.map((star) => {
            const size = getSizeValue(star.size) * 4.5 // Increased size 3x (1.5 -> 4.5)
            const isHighlighted = selectedStar?.id === star.id
            const isSpecialStar = star.isSpecial
            const isViewed = viewedStars.includes(star.id)
            
            // Star shape path (centered at x,y)
            const starPath = `M ${star.x} ${star.y - size/20} 
                             L ${star.x + size/70} ${star.y - size/70} 
                             L ${star.x + size/25} ${star.y - size/70} 
                             L ${star.x + size/50} ${star.y + size/70} 
                             L ${star.x + size/40} ${star.y + size/25} 
                             L ${star.x} ${star.y + size/50} 
                             L ${star.x - size/40} ${star.y + size/25} 
                             L ${star.x - size/50} ${star.y + size/70} 
                             L ${star.x - size/25} ${star.y - size/70} 
                             L ${star.x - size/70} ${star.y - size/70} Z`

            return (
              <g key={star.id} onClick={() => handleStarExplore(star)} className="cursor-pointer">
                 {/* Glow effect backing */}
                 <circle cx={star.x} cy={star.y} r={size/15} fill={isViewed ? "rgba(251, 191, 36, 0.4)" : "rgba(255, 255, 255, 0.1)"} className={styles.starBackingGlow} />
                 
                 {/* Actual Star Shape */}
                 <path
                  d={`M${star.x},${star.y-size/15} l${size/40},${size/25} l${size/25},-0.05 l-${size/35},${size/35} l${size/50},${size/25} l-${size/30},-${size/45} l-${size/30},${size/45} l${size/50},-${size/25} l-${size/35},-${size/35} l${size/25},0.05 z`}
                  fill={isHighlighted || isViewed ? "#fbbf24" : "white"}
                  className={`${styles.constellationStar} ${isHighlighted ? styles.highlighted : ""} ${isSpecialStar ? styles.special : ""}`}
                />
              </g>
            )
          })}
        </svg>

        {/* Interactive star buttons (optional overlay for better tap targets) */}
        {stars.map((star) => {
          const size = getSizeValue(star.size) * 3 // Increased tap target size
          return (
            <button
              key={`btn-${star.id}`}
              className={styles.starButton}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${Math.max(44, size)}px`,
                height: `${Math.max(44, size)}px`,
              }}
              onClick={() => handleStarExplore(star)}
              aria-label={star.title}
            />
          )
        })}
      </div>

      {/* Moon element */}
      <div 
        className={styles.moon} 
        style={{ 
            opacity: allViewed ? 1 : 0.3, 
            cursor: allViewed ? 'pointer' : 'default',
            filter: allViewed ? 'drop-shadow(0 0 20px #fbbf24)' : 'grayscale(0.8)'
        }} 
        onClick={handleMoonClick} 
        title={allViewed ? "Continue Journey" : "Explore all stars first"}
      />

      {/* Bottom instruction */}
      <div className={styles.instruction}>
        <span>
            {allViewed 
                ? "The moon is awake. Tap it to continue →" 
                : "Tap on all the shining stars to unlock the path..."}
        </span>
      </div>

      {/* Star popup */}
      {selectedStar && (
        <div className={styles.popupOverlay} onClick={handleClosPopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleClosPopup} aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className={styles.popupTitle}>{selectedStar.title}</h3>
            <div className={styles.popupDescription}>
              {selectedStar.description.split("\n").map((line, idx) => (
                <p key={idx} className={idx > 0 && line === "" ? "my-2" : "my-1"}>
                  {line === "" ? "\u00A0" : line}
                </p>
              ))}
            </div>
            
            {/* Valid Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 w-full">
                <button 
                    className={`${styles.navButton} ${styles.prev}`}
                    onClick={() => {
                        const currentIndex = stars.findIndex(s => s.id === selectedStar.id)
                        if (currentIndex > 0) {
                            handleStarExplore(stars[currentIndex - 1])
                        }
                    }}
                    disabled={stars.findIndex(s => s.id === selectedStar.id) === 0}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                   <span>Prev</span>
                </button>
                
                 <span className="text-white/20 text-sm font-serif tracking-widest">{stars.findIndex(s => s.id === selectedStar.id) + 1} / {stars.length}</span>

                <button 
                    className={`${styles.navButton} ${styles.primary}`}
                    onClick={() => {
                        const currentIndex = stars.findIndex(s => s.id === selectedStar.id)
                        if (currentIndex < stars.length - 1) {
                            handleStarExplore(stars[currentIndex + 1])
                        } else {
                            handleClosPopup()
                        }
                    }}
                >
                   <span>{stars.findIndex(s => s.id === selectedStar.id) === stars.length - 1 ? "Finish" : "Next"}</span>
                   {stars.findIndex(s => s.id === selectedStar.id) !== stars.length - 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    )}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
