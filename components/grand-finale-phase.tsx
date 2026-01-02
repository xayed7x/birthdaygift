"use client"

import { useState, useEffect } from "react"
import styles from "./grand-finale-phase.module.css"

export default function GrandFinalePhase({ onRestart, onBookmark }: { onRestart: () => void; onBookmark: () => void }) {
  const [backgroundStars, setBackgroundStars] = useState<
    Array<{ id: number; left: number; top: number; duration: number; delay: number }>
  >([])
  const [showText1, setShowText1] = useState(false)
  const [showText2, setShowText2] = useState(false)
  const [showText3, setShowText3] = useState(false)
  const [showText4, setShowText4] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

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

  useEffect(() => {
    // Stagger the fade-in animations
    const timers = [
      setTimeout(() => setShowText1(true), 100),
      setTimeout(() => setShowText2(true), 1200),
      setTimeout(() => setShowText3(true), 2300),
      setTimeout(() => setShowText4(true), 3400),
      setTimeout(() => setShowButtons(true), 4400),
    ]

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  const handleBookmarkClick = () => {
    alert("Press Ctrl+D (or Cmd+D) to bookmark this page 💝\n\nOr you can save this URL: " + window.location.href)
    onBookmark()
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
              animation: `pulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Opening text - fades in first */}
        {showText1 && (
          <div className={`${styles.textSection} ${styles.fadeInUp}`}>
            <p className={styles.openingText}>
              Sweetheart,
              <br />
              <br />
              We've journeyed through our story—
              <br />
              from envelopes to stars,
              <br />
              from timelines to promises,
              <br />
              from memories to dreams.
            </p>
          </div>
        )}

        {/* Main message - fades in second */}
        {showText2 && (
          <div className={`${styles.textSection} ${styles.fadeInUp}`}>
            <div className={styles.divider} />
            <p className={styles.mainText}>
              I created all of this
              <br />
              because words alone could never capture
              <br />
              what you mean to me.
              <br />
              <br />
              You are my past, my present, and my future.
              <br />
              You are my comfort, my joy, my peace.
              <br />
              You are the answer to prayers I didn't know I was making.
              <br />
              <br />
              Athoy, you are my forever.
            </p>
            <div className={styles.divider} />
          </div>
        )}

        {/* Islamic blessing - fades in third */}
        {showText3 && (
          <div className={`${styles.textSection} ${styles.fadeInUp}`}>
            <p className={styles.arabicText}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className={styles.blessingText}>
              May Allah bless our journey,
              <br />
              guide our steps,
              <br />
              and grant us a love that pleases Him.
              <br />
              <br />
              May He make us companions in this life
              <br />
              and reunite us in Jannah.
              <br />
              <br />
              Ameen.
            </p>
          </div>
        )}

        {/* Closing message - fades in fourth */}
        {showText4 && (
          <div className={`${styles.textSection} ${styles.fadeInUp}`}>
            <div className={styles.divider} />
            <p className={styles.closingText}>
              Happy 19th Birthday, my Athoy 🤍
              <br />
              <br />
              With all my love, all my prayers, and all my heart,
              <br />
              Zayed bin Hamid
              <br />
              <br />
              January 3, 2025
            </p>
          </div>
        )}

        {/* Action buttons - fade in last */}
        {showButtons && (
          <div className={`${styles.buttonsContainer} ${styles.fadeInUp}`}>
            <button className={styles.actionCard} onClick={onRestart}>
              <span className={styles.icon}>↻</span>
              <span className={styles.cardTitle}>Experience Again</span>
              <span className={styles.cardDescription}>Relive our journey from the beginning</span>
            </button>

            <button className={styles.actionCard} onClick={handleBookmarkClick}>
              <span className={styles.icon}>🤍</span>
              <span className={styles.cardTitle}>Save This Forever</span>
              <span className={styles.cardDescription}>Bookmark this page to revisit anytime</span>
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }
      `}</style>
    </div>
  )
}
