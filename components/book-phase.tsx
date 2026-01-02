"use client"

import { useState } from "react"
import Storybook from "./storybook"

const BookPhase = ({ onComplete }: { onComplete: () => void }) => {
  const [showEnding, setShowEnding] = useState(false)

  const handleStoryComplete = () => {
    setShowEnding(true)
  }

  if (showEnding) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-midnight via-night-deep to-midnight">
        {/* Background stars */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Centered ending text */}
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl font-serif text-cream leading-relaxed">You've read our story...</p>
            <p className="text-xl md:text-2xl font-serif text-cream/80">But the journey isn't over yet.</p>
            <p className="text-lg md:text-xl font-serif text-cream/70">There's something more waiting for you.</p>
            <p className="text-lg md:text-xl font-serif text-cream/70">Something special.</p>
            <p className="text-lg md:text-xl font-serif text-cream/80">Something just for today.</p>
          </div>

          {/* Discover button */}
          <div className="pt-12">
            <button
              onClick={onComplete}
              className="px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-romantic-pink via-gold to-romantic-pink hover:from-romantic-pink-deep hover:via-gold hover:to-romantic-pink-deep text-midnight font-serif font-semibold text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-romantic-pink/30 to-gold/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Discover What Awaits
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          <p className="pt-4 text-cream/60 text-sm tracking-wider">Click to reveal what awaits you...</p>
        </div>
      </div>
    )
  }

  return <Storybook onComplete={handleStoryComplete} />
}

export default BookPhase
