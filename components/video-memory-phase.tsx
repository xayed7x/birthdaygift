"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./video-memory-phase.module.css"

export default function VideoMemoryPhase({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [backgroundStars, setBackgroundStars] = useState<
    Array<{ id: number; left: number; top: number; duration: number; delay: number }>
  >([])
  const [showPlayButton, setShowPlayButton] = useState(true)
  const [showPostVideo, setShowPostVideo] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [isVideoWatched, setIsVideoWatched] = useState(false)

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

  const handlePlayClick = () => {
    setShowPlayButton(false)
    videoRef.current?.play()
  }

  const handleVideoPlay = () => {
    setShowPlayButton(false)
  }

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setVideoProgress(progress)

      // Show post-video message at 80% watched
      if (progress >= 80) {
        setShowPostVideo(true)
      }
    }
  }

  const handleVideoEnd = () => {
    setIsVideoWatched(true)
    setShowPostVideo(true)
  }

  const buttonOpacity = isVideoWatched || videoProgress >= 80 ? 1 : 0.5

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
        {/* Heading */}
        <h1 className={styles.heading}>Do You Remember?</h1>

        {/* Subtext */}
        <div className={styles.subtextContainer}>
          <p className={styles.subtext}>
            When we were best friends,
            <br />
            you created something special.
            <br />
            Something that showed how much
            <br />
            we meant to each other.
            <br />
            <br />
            I've kept it all this time.
            <br />
            And today, I want us to watch it together.
          </p>
        </div>

        {/* Video player section */}
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            className={styles.video}
            controls
            preload="metadata"
            onPlay={handleVideoPlay}
            onTimeUpdate={handleVideoProgress}
            onEnded={handleVideoEnd}
            playsInline
          >
            <source src="/Bestu.mp4" type="video/mp4" />
            Your browser does not support video playback
          </video>

          {/* Custom play button overlay */}
          {showPlayButton && (
            <button className={styles.playButtonOverlay} onClick={handlePlayClick}>
              <div className={styles.playIcon} />
            </button>
          )}

          {/* Progress indicator */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${videoProgress}%` }} />
          </div>
        </div>

        {/* Post-video message - appears after 80% watched */}
        {showPostVideo && (
          <div className={styles.postVideoMessage}>
            <p className={styles.postVideoText}>
              That was then.
              <br />
              This is now.
              <br />
              <br />
              From best friends... to forever.
              <br />
              <br />
              Thank you for believing in us, Athoy.
            </p>
          </div>
        )}

        {/* Navigation button */}
        <button
          className={styles.continueButton}
          onClick={onComplete}
          style={{ opacity: buttonOpacity }}
          disabled={!isVideoWatched && videoProgress < 80}
        >
          Continue to the Final Surprise →
        </button>

        {!isVideoWatched && videoProgress < 80 && <p className={styles.watchHint}>Watch the video to continue</p>}
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
      `}</style>
    </div>
  )
}
