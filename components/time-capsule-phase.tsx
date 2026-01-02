"use client"

import { useState, useEffect } from "react"
import styles from "./time-capsule-phase.module.css"

interface Message {
  id: number
  emoji: string
  title: string
  unlockTime: number
  unlockTimeDisplay: string
  description: string
  content: string
}

const messages: Message[] = [
  {
    id: 1,
    emoji: "🌅",
    title: "As Your Day Begins",
    unlockTime: 6 * 60, // 6:00 AM in minutes
    unlockTimeDisplay: "6:00 AM",
    description: "Unlocks at 6:00 AM",
    content: `Assalamu Alaikum, Birthday Girl! 🌅

Your special day has begun!
As the sun rises, so does my heart
filled with love and duas for you.

You are loved.
You are cherished.
You are my everything.

May this year bring you closer to Allah,
closer to your dreams,
and closer to the forever we're building.

Happy 19th Birthday, my Athoy 🤍

— Zayed`,
  },
  {
    id: 2,
    emoji: "☀️",
    title: "In the Light of Day",
    unlockTime: 12 * 60, // 12:00 PM in minutes
    unlockTimeDisplay: "12:00 PM",
    description: "Unlocks at 12:00 PM",
    content: `Sweetheart,

I hope your morning has been beautiful.
I hope you're smiling right now.

Take a pause from your celebrations,
breathe, and remember:
You deserve all the happiness
this world has to offer.

While you're celebrating with your loved ones,
know that there's someone whose heart
celebrates you every single moment.

Enjoy every second of your special day!

— Zayed 🤍`,
  },
  {
    id: 3,
    emoji: "🌙",
    title: "As the Day Settles",
    unlockTime: 21 * 60, // 9:00 PM in minutes
    unlockTimeDisplay: "9:00 PM",
    description: "Unlocks at 9:00 PM",
    content: `My Athoy,

As night falls and your birthday day winds down,
I want you to pause and reflect.

Did you have a beautiful day?
Did you feel loved?
Did you feel special?

I hope so.

You've been 19 for hours now,
but you've been in my heart for 4 years,
and you'll be there for eternity.

Tomorrow the calendar changes,
but my promise remains the same:

I'm here. Always.

JazakAllah khair for existing.

— Zayed 🤍

P.S. - Don't forget to make dua before sleeping ❤️`,
  },
]

export default function TimeCapsulePhase({ onComplete }: { onComplete: () => void }) {
  const [backgroundStars, setBackgroundStars] = useState<
    Array<{ id: number; left: number; top: number; duration: number; delay: number }>
  >([])
  const [unlockedMessages, setUnlockedMessages] = useState<number[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

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

  // Check unlock status
  useEffect(() => {
    const checkUnlocks = () => {
      const now = new Date()
      const birthdayDate = new Date(2025, 0, 3) // January 3, 2025

      // Check if current date is Jan 3, 2025 or later
      const isOnOrAfterBirthday = now >= birthdayDate

      if (isOnOrAfterBirthday && now.getDate() === 3 && now.getMonth() === 0 && now.getFullYear() === 2025) {
        // On January 3, 2025 - check time-based unlocking
        const currentMinutes = now.getHours() * 60 + now.getMinutes()

        const newUnlocked = messages.filter((msg) => currentMinutes >= msg.unlockTime).map((msg) => msg.id)

        setUnlockedMessages(newUnlocked)
      } else if (now.getTime() > birthdayDate.getTime()) {
        // After January 3, 2025 - unlock all
        setUnlockedMessages(messages.map((msg) => msg.id))
      } else {
        // Before January 3, 2025 - no unlocks yet
        setUnlockedMessages([])
      }

      setCurrentTime(now)
    }

    checkUnlocks()
    const interval = setInterval(checkUnlocks, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const getCountdownTime = (message: Message) => {
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const minutesUntilUnlock = message.unlockTime - currentMinutes

    if (minutesUntilUnlock <= 0) return null

    const hours = Math.floor(minutesUntilUnlock / 60)
    const mins = minutesUntilUnlock % 60

    if (hours <= 6) {
      return `Opens in ${hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} ` : ""}${mins} minute${mins !== 1 ? "s" : ""}`
    }

    return null
  }

  const handleMessageClick = (message: Message) => {
    const isUnlocked = unlockedMessages.includes(message.id)

    if (isUnlocked) {
      setSelectedMessage(message)
    } else {
      setToastMessage(`This message will unlock at ${message.unlockTimeDisplay} ⏰`)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const closeModal = () => {
    setSelectedMessage(null)
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
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.mainHeading}>Something More Awaits You...</h1>
          <p className={styles.subheading}>I've hidden 3 special messages throughout your day</p>
        </div>

        {/* Message cards */}
        <div className={styles.cardsContainer}>
          {messages.map((message) => {
            const isUnlocked = unlockedMessages.includes(message.id)
            const countdownText = getCountdownTime(message)

            return (
              <button
                key={message.id}
                className={`${styles.messageCard} ${isUnlocked ? styles.unlocked : styles.locked}`}
                onClick={() => handleMessageClick(message)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{isUnlocked ? message.emoji : "🔒"}</span>
                    {!isUnlocked && <span className={styles.timeIcon}>{message.emoji}</span>}
                  </div>

                  <div className={styles.statusBadge}>{isUnlocked ? "✓ UNLOCKED" : "LOCKED"}</div>
                </div>

                <h3 className={styles.messageTitle}>{message.title}</h3>

                <p className={styles.messageHint}>{isUnlocked ? "Tap to read your message" : message.description}</p>

                {!isUnlocked && countdownText && <p className={styles.countdown}>{countdownText}</p>}
              </button>
            )
          })}
        </div>

        {/* Bottom text and button */}
        <div className={styles.bottomSection}>
          <p className={styles.saveText}>Save this link and come back throughout the day! 💝</p>

          <button className={styles.continueButton} onClick={onComplete}>
            There's One More Thing... →
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className={styles.toast}>
          <p className={styles.toastMessage}>This message will unlock at {toastMessage.split(" ")[5]} ⏰</p>
          <p className={styles.toastSecondary}>Come back then to read it! 💝</p>
        </div>
      )}

      {/* Modal for reading messages */}
      {selectedMessage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalContent}>
              <span className={styles.modalEmoji}>{selectedMessage.emoji}</span>
              <h2 className={styles.modalTitle}>{selectedMessage.title}</h2>
              <div className={styles.divider} />

              <p className={styles.messageText}>{selectedMessage.content}</p>

              <button className={styles.closeButton} onClick={closeModal}>
                Close 💝
              </button>
            </div>
          </div>
        </div>
      )}

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes toastSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </div>
  )
}
