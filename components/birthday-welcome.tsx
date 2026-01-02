"use client"

import { useState, useEffect } from "react"
import ConstellationPhase from "./constellation-phase"
import TimelinePhase from "./timeline-phase"
import BookPhase from "./book-phase"
import TimeCapsulePhase from "./time-capsule-phase"
import VideoMemoryPhase from "./video-memory-phase"
import GrandFinalePhase from "./grand-finale-phase"
import styles from "./birthday-welcome.module.css"

const envelopePositions = [
  { left: "20%", top: "35%" },
  { left: "70%", top: "30%" },
  { left: "50%", top: "55%" },
  { left: "15%", top: "70%" },
  { left: "80%", top: "65%" },
  { left: "40%", top: "80%" },
  { left: "65%", top: "85%" },
]

export default function BirthdayWelcome() {
  const [phase, setPhase] = useState<
    "envelope" | "constellation" | "timeline" | "book" | "time-capsule" | "video-memory" | "grand-finale"
  >("envelope")
  const [revealed, setRevealed] = useState(false)
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; duration: number; delay: number }>>(
    [],
  )

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
    setStars(generatedStars)
  }, [])

  const handleEnvelopeClick = () => {
    setRevealed(true)
  }

  const handleCardButtonClick = () => {
    setPhase("constellation")
  }

  const handleTimelineTransition = () => {
    setPhase("timeline")
  }

  const handleBookTransition = () => {
    setPhase("book")
  }

  const handleBookComplete = () => {
    setPhase("time-capsule")
  }

  const handleTimeCapsuleComplete = () => {
    setPhase("video-memory")
  }

  const handleVideoMemoryComplete = () => {
    setPhase("grand-finale")
  }

  const handleGrandFinaleRestart = () => {
    setPhase("envelope")
  }

  const handleGrandFinaleBookmark = () => {
    console.log("Journey bookmarked!")
  }

  if (phase === "grand-finale") {
    return <GrandFinalePhase onRestart={handleGrandFinaleRestart} onBookmark={handleGrandFinaleBookmark} />
  }

  if (phase === "video-memory") {
    return <VideoMemoryPhase onComplete={handleVideoMemoryComplete} />
  }

  if (phase === "time-capsule") {
    return <TimeCapsulePhase onComplete={handleTimeCapsuleComplete} />
  }

  if (phase === "book") {
    return <BookPhase onComplete={handleBookComplete} />
  }

  if (phase === "timeline") {
    return <TimelinePhase onComplete={handleBookTransition} />
  }

  if (phase === "constellation") {
    return <ConstellationPhase onComplete={handleTimelineTransition} />
  }

  return (
    <div className={styles.container}>
      {/* Background gradient with stars */}
      <div className={styles.background}>
        {stars.map((star) => (
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

      {/* Initial state - Envelopes and text */}
      {!revealed && (
        <div className={`${styles.initialState} ${styles.fadeIn}`}>
          {/* Text Section - Positioned at the top */}
          <div className="z-10 text-center relative mt-20 mb-12 pointer-events-none">
             <h1 className={`${styles.heading} font-handwriting text-5xl md:text-7xl text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-fade-in-down`}>
              Sweetheart,
            </h1>
          </div>

          <div className={styles.envelopesContainer}>
            {/* Main Central Envelope - The "Hero" Envelope */}
            {/* Using flex center instead of absolute centering to avoid overlap */}
            <div className={`relative flex items-center justify-center h-full pb-20`}>
                <button
                  className={`${styles.mainEnvelope} ${styles.flyingEntrance}`}
                  onClick={handleEnvelopeClick}
                  aria-label="Open Birthday Envelope"
                >
                  <div className={styles.envelopeGlow} />
                  <svg viewBox="0 0 60 50" width="140" height="116" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                    {/* Envelope body - Richer Color */}
                    <rect x="4" y="10" width="52" height="36" rx="2" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
                    {/* Envelope flap */}
                    <path d="M 4 10 L 30 24 L 56 10" stroke="#fcd34d" strokeWidth="1.5" fill="none" />
                    {/* Seal circle with heart - Animated */}
                    <circle cx="30" cy="28" r="7" fill="#dc2626" className={styles.sealPulse} />
                    <text x="30" y="32" fontSize="9" fill="white" textAnchor="middle" dominantBaseline="middle">
                      🤍
                    </text>
                  </svg>
                  
                  {/* Click instruction floating below envelope */}
                   <p className={`${styles.subtext} absolute top-full left-1/2 -translate-x-1/2 mt-8 w-64 text-center font-serif text-lg md:text-xl text-blue-100/90 tracking-widest uppercase animate-pulse`}>
                    Tap to open
                  </p>
                </button>
            </div>

            {/* Floating ambient envelopes (purely decorative now) */}
            {envelopePositions.slice(0, 6).map((position, index) => (
              <div
                key={index}
                className={styles.floatingEnvelope}
                style={{
                  left: position.left,
                  top: position.top,
                  animationDelay: `${index * 1.5}s`,
                  opacity: 0.3,
                  transform: 'scale(0.5)'
                }}
              >
                <svg viewBox="0 0 60 50" width="40" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="10" width="52" height="36" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <path d="M 4 10 L 30 24 L 56 10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {revealed && (
        <div className={`${styles.revealedState} ${styles.fadeIn}`}>
          <div className={styles.card}>
            <h2 className={`${styles.cardHeading} font-handwriting text-5xl text-amber-500`}>Sweetheart,</h2>
            <div className={`${styles.cardContent} font-serif text-lg leading-relaxed`}>
              <p>Tonight is special.</p>
              <p>
                Not just because it's your birthday, but because I wanted to give you something that comes from my
                heart.
              </p>
              <div className="my-4 w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto" />
              <p>This isn't a regular gift.</p>
              <p>This is us - our story, our memories, our promises.</p>
              <p className="mt-4">
                Take your time, explore everything, and feel how much you mean to me.
              </p>
            </div>
            
            <p className={`${styles.cardBirthday} font-handwriting text-3xl`}>Happy Birthday, Athoy 🤍</p>
            
            <div className={styles.buttonWrapper}>
                <div className={styles.buttonGlow} />
                <button className={`${styles.magicalButton} font-serif`} onClick={handleCardButtonClick}>
                  Let's Begin 
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
            </div>

          </div>
        </div>
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes envelopeExit {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  )
}
