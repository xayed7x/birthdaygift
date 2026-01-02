/**
 * ============================================
 * ROMANTIC STORYBOOK COMPONENT FOR NEXT.JS
 * ============================================
 *
 * INSTRUCTIONS FOR AI CODE EDITOR:
 * 1. Create this file as components/Storybook/index.tsx
 * 2. Add the CSS variables and animations to your globals.css (see REQUIRED_CSS below)
 * 3. Update tailwind.config.ts with the colors and fonts (see TAILWIND_CONFIG below)
 * 4. Install dependencies: npm install lucide-react class-variance-authority clsx tailwind-merge
 * 5. Import and use <Storybook /> in any page
 *
 * This is a complete romantic digital storybook with 17 pages,
 * starry background, page navigation, and beautiful animations.
 */

"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Heart } from "lucide-react"
import BookPage from "./book-page"
import PageNavigation from "./page-navigation"
import StarryBackground from "./starry-background"
import { cn } from "@/lib/utils"

// ============================================
// ALL 17 PAGES
// ============================================

// PAGE 1: Cover

const CoverPage = () => (
  <BookPage variant="night">
    <div className="text-center space-y-4 md:space-y-8">
      {/* Three hearts with staggered pop-up and dancing animation */}
      <div className="flex justify-center items-center gap-3 md:gap-4 mt-8 md:mt-0">
        <span 
          className="text-3xl md:text-4xl animate-dancing-heart" 
          style={{ animationDelay: '0s' }}
        >💗</span>
        <span 
          className="text-4xl md:text-5xl animate-dancing-heart" 
          style={{ animationDelay: '0.3s' }}
        >🤍</span>
        <span 
          className="text-3xl md:text-4xl animate-dancing-heart" 
          style={{ animationDelay: '0.6s' }}
        >💗</span>
      </div>

      {/* Main title */}
      <h1 className="font-display text-4xl md:text-6xl font-light text-cream leading-tight">
        For My<br />Sweetheart
      </h1>

      {/* Sparkle decoration */}
      <div className="flex justify-center gap-6 md:gap-8 text-gold/60">
        <span className="text-xs md:text-sm animate-twinkle">✦</span>
        <span className="text-base md:text-lg animate-twinkle" style={{ animationDelay: '0.5s' }}>✦</span>
        <span className="text-xs md:text-sm animate-twinkle" style={{ animationDelay: '1s' }}>✦</span>
      </div>

      {/* Her name */}
      <p className="font-display text-3xl md:text-4xl text-gold font-semibold tracking-wide">
        Fahmida Islam Athoy
      </p>

      {/* Birthday info */}
      <div className="pt-4">
        <p className="font-display text-2xl italic text-romantic-pink">On your 19th Birthday</p>
        <p className="font-body text-gold/80 mt-2">January 3, 2025</p>
      </div>
    </div>
  </BookPage>
)

// PAGE 2: Remember Page 1
const RememberPage1 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-midnight tracking-wide">
        Do You Remember...
      </h2>

      <div className="space-y-6 font-body text-lg md:text-xl text-midnight/80 leading-relaxed">
        <p>Do you remember that day?</p>
        <p>You got admitted into MCSK.</p>
        <p>
          We were randomly chatting,
          <br />
          Just talking about nothing special...
        </p>
      </div>

      <div className="pt-8 flex justify-center">
        <span className="text-4xl filter drop-shadow-md hover:scale-110 transition-transform duration-300">
          🌅
        </span>
      </div>
    </div>
  </BookPage>
)

// PAGE 3: Remember Page 2
const RememberPage2 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-8">
      <div className="space-y-6 font-body text-lg text-midnight/80 leading-relaxed">
        <p>And then I said,</p>

        <p className="font-display text-xl italic text-romantic-pink-deep">
          "Tui Jodi pilot school a thaktis
          <br />
          tail a toke Best fd banatam"
        </p>

        <p className="pt-4">You replied,</p>

        <p className="font-display text-xl italic text-romantic-pink-deep">
          "Assa akhon hocci 🙂🙂
          <br />
          Cole jayor age porzonto"
        </p>
      </div>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <p className="font-body text-lg text-midnight/90 pt-4">
        That simple conversation
        <br />
        became the <span className="text-gold font-semibold">beginning of us</span>.
      </p>

      <div className="flex justify-center gap-4 pt-6">
        <span className="text-romantic-pink-deep text-xl">🌸</span>
        <span className="text-gold text-xl">✦</span>
        <span className="text-romantic-pink-deep text-xl">🌸</span>
      </div>
    </div>
  </BookPage>
)

// PAGE 4: Love Page 1
const LovePage1 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl md:text-5xl font-light text-midnight">What I Love About You</h2>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <div className="space-y-6 font-body text-lg text-midnight/80 leading-relaxed">
        <p>People often say,</p>

        <div className="space-y-2 text-romantic-pink-deep italic">
          <p>"I love your smile"</p>
          <p>"I love your eyes"</p>
          <p>"I love the way you are"</p>
        </div>

        <p className="pt-4">
          But what if those things change?
          <br />
          What if time transforms them?
          <br />
          Would that love fade too?
        </p>
      </div>

      <div className="pt-4">
        <span className="text-gold/60 text-3xl">🍂</span>
      </div>
    </div>
  </BookPage>
)

// PAGE 5: Love Page 2
const LovePage2 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-6">
      <p className="font-display text-2xl text-gold">Athoy,</p>

      <div className="space-y-4 font-body text-lg text-midnight/80 leading-relaxed">
        <p>
          I don't love a part of you.
          <br />I don't love your accent, though it's beautiful.
          <br />I don't love your looks, though you're stunning.
        </p>

        <div className="py-4">
          <Heart className="w-8 h-8 text-romantic-pink-deep mx-auto animate-heartbeat" fill="currentColor" />
        </div>

        <p className="text-xl font-display text-midnight">
          I love <span className="text-gold font-semibold">YOU</span>.
        </p>

        <p>
          The soul that resides within.
          <br />
          The essence that makes you... <em>you</em>.
        </p>
      </div>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <p className="font-body text-lg text-midnight/80 pt-2">
        Even if everything changed,
        <br />
        my love wouldn't.
        <br />
        Because I don't love what you have—
        <br />I love who you <span className="text-gold font-semibold">ARE</span>.
      </p>
    </div>
  </BookPage>
)

// PAGE 6: Heart Page 1
const HeartPage1 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl md:text-5xl font-light text-midnight">What Captivates My Heart</h2>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <div className="space-y-6 font-body text-lg text-midnight/80 leading-relaxed">
        <p>
          But let me tell you
          <br />
          what makes my heart skip a beat...
        </p>

        <p className="font-display text-xl text-romantic-pink-deep">
          Your clean heart—
          <br />
          pure, untainted, genuine.
        </p>

        <p className="pt-4">
          The way you give yourself completely,
          <br />
          holding nothing back for others.
          <br />
          This selflessness, this devotion—
          <br />I want it forever.
        </p>
      </div>

      <div className="pt-6 relative">
        <div className="w-16 h-16 mx-auto rounded-full bg-romantic-pink/30 flex items-center justify-center animate-pulse">
          <span className="text-3xl">💎</span>
        </div>
      </div>
    </div>
  </BookPage>
)

// PAGE 7: Heart Page 2
const HeartPage2 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-6">
      <div className="space-y-4 font-body text-lg text-midnight/80 leading-relaxed">
        <p className="text-romantic-pink-deep">I love your accent when you speak.</p>
        <p>I love your beauty that radiates from within.</p>
        <p className="text-romantic-pink-deep">I love your walking style, so uniquely yours.</p>
        <p>I love your word choices that reveal your soul.</p>
        <p className="text-romantic-pink-deep">I love your voice that calms my chaos.</p>
        <p>
          I love your sweetness, especially after you're angry—
          <br />
          that moment when you say sorry,
          <br />
          melting away all frustration.
        </p>
      </div>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <div className="space-y-4 font-body text-lg text-midnight/80">
        <p>
          And above all,
          <br />I love how you listen to me,
          <br />
          how you trust me,
          <br />
          how you obey with love, not obligation.
        </p>

        <p className="font-display text-xl text-gold pt-4">
          These aren't just reasons I love you—
          <br />
          they are the reasons why
          <br />
          loving you feels like <span className="font-semibold">home</span>.
        </p>
      </div>

      <div className="pt-4">
        <span className="text-3xl">🏠</span>
      </div>
    </div>
  </BookPage>
)

// PAGE 8: Nights Page 1
const NightsPage1 = () => (
  <BookPage variant="night">
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl md:text-5xl font-light text-cream">Our Sleepless Nights 🌙</h2>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <div className="space-y-6 font-body text-lg text-cream/90 leading-relaxed">
        <p>
          You know what happens
          <br />
          when we start talking at night...
        </p>

        <p className="font-display text-xl text-gold">
          Time stops.
          <br />
          Hours feel like minutes.
          <br />
          The world fades away.
        </p>
      </div>

      <div className="pt-8 flex justify-center gap-8">
        <div className="w-12 h-16 bg-midnight/50 rounded border border-gold/30 flex items-center justify-center">
          <span className="text-xl">📱</span>
        </div>
        <div className="text-gold text-2xl animate-pulse">💫</div>
        <div className="w-12 h-16 bg-midnight/50 rounded border border-gold/30 flex items-center justify-center">
          <span className="text-xl">📱</span>
        </div>
      </div>
    </div>
  </BookPage>
)

// PAGE 9: Nights Page 2
const NightsPage2 = () => (
  <BookPage variant="night">
    <div className="text-center space-y-8">
      <div className="space-y-6 font-body text-lg text-cream/90 leading-relaxed">
        <p>
          It's just us,
          <br />
          sharing dreams and secrets,
          <br />
          laughing at silly things,
          <br />
          talking about everything and nothing.
        </p>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

        <p className="font-display text-xl text-gold pt-4">
          And I wouldn't trade
          <br />
          those nights for anything.
        </p>
      </div>

      <div className="flex justify-center gap-8 pt-8">
        <span className="text-gold animate-twinkle">✨</span>
        <span className="text-cream text-3xl">🤝</span>
        <span className="text-gold animate-twinkle" style={{ animationDelay: "1s" }}>
          ✨
        </span>
      </div>
    </div>
  </BookPage>
)

// PAGE 10: Numbers Page 1
const NumbersPage1 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl md:text-5xl font-light text-midnight">Us in Numbers</h2>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <div className="space-y-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <p className="text-4xl mb-2">🗓️</p>
          <p className="font-display text-3xl text-gold">4</p>
          <p className="font-body text-midnight/70">Years of friendship</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <p className="text-4xl mb-2">💬</p>
          <p className="font-display text-3xl text-gold">∞</p>
          <p className="font-body text-midnight/70">Conversations that made us smile</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <p className="text-4xl mb-2">📍</p>
          <p className="font-display text-3xl text-gold">0 km</p>
          <p className="font-body text-midnight/70">Distance that couldn't separate us (in heart)</p>
        </div>
      </div>
    </div>
  </BookPage>
)

// PAGE 11: Numbers Page 2
const NumbersPage2 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-8">
      <div className="space-y-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <p className="text-4xl mb-2">🌙</p>
          <p className="font-display text-2xl text-gold">Too many to count</p>
          <p className="font-body text-midnight/70">Sleepless nights together</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <p className="text-4xl mb-2">💝</p>
          <p className="font-display text-2xl text-gold">Every single one</p>
          <p className="font-body text-midnight/70">Moments I cherish</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
          <p className="text-4xl mb-2">🔮</p>
          <p className="font-display text-2xl text-gold">1 beautiful forever</p>
          <p className="font-body text-midnight/70">Future we're building</p>
        </div>
      </div>

      <div className="pt-4">
        <div className="w-16 h-24 mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/40 to-transparent rounded-full" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">⏳</span>
        </div>
      </div>
    </div>
  </BookPage>
)

// PAGE 12: Unspoken Page 1
const UnspokenPage1 = () => (
  <BookPage variant="night">
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl md:text-5xl font-light text-cream">Things Unspoken</h2>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <div className="space-y-6 font-body text-lg text-cream/90 leading-relaxed">
        <p>
          Some feelings are too deep for words.
          <br />
          Some moments too sacred for speech.
        </p>

        <div className="py-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent mx-auto" />
        </div>

        <p className="font-display text-xl text-gold">But know this—</p>

        <p>
          Every silence between us speaks volumes.
          <br />
          Every pause holds a thousand emotions.
        </p>
      </div>

      <div className="pt-8 flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-romantic-pink/30 blur-xl" />
          <div className="absolute inset-0 flex items-center justify-center text-4xl">👫</div>
        </div>
      </div>
    </div>
  </BookPage>
)

// PAGE 13: Unspoken Page 2
const UnspokenPage2 = () => (
  <BookPage variant="night">
    <div className="text-center space-y-8">
      <div className="space-y-6 font-body text-lg text-cream/90 leading-relaxed">
        <p className="font-display text-xl text-gold">
          Every night we talk until dawn
          <br />
          says what words never could.
        </p>

        <div className="py-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent mx-auto" />
        </div>

        <p>
          You understand my unspoken thoughts.
          <br />
          And I hear your silent prayers.
          <br />
          That's the language only we know.
        </p>
      </div>

      <div className="pt-8 relative">
        <div className="flex justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-romantic-pink/20 flex items-center justify-center">
            <span className="text-xl">💭</span>
          </div>
          <div className="w-8 h-px bg-gold/50 self-center" />
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
            <span className="text-xl">💭</span>
          </div>
        </div>
      </div>
    </div>
  </BookPage>
)

// PAGE 14: Promise Page 1
const PromisePage1 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl md:text-5xl font-light text-midnight">A Promise for Tomorrow</h2>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <p className="font-display text-2xl text-gold">Athoy,</p>

      <div className="space-y-6 font-body text-lg text-midnight/80 leading-relaxed">
        <p>
          I've shared everything about you,
          <br />
          everything I feel, everything I see.
        </p>

        <p className="font-display text-xl text-romantic-pink-deep">I think I love you.</p>

        <p>
          And if I haven't learned how to love you completely yet,
          <br />
          then know this—
        </p>

        <p className="font-display text-xl text-midnight">
          I want to learn.
          <br />I want to love you in every way possible.
        </p>
      </div>

      <div className="pt-6 flex justify-center gap-2">
        <span className="text-2xl">🌹</span>
        <span className="text-gold">✦</span>
        <span className="text-2xl">🌹</span>
      </div>
    </div>
  </BookPage>
)

// PAGE 15: Promise Page 2
const PromisePage2 = () => (
  <BookPage variant="romantic">
    <div className="text-center space-y-6">
      <p className="font-display text-2xl text-gold">My promise to you:</p>

      <div className="space-y-4 font-body text-lg text-midnight/80 leading-relaxed">
        <p>
          I carry a clean heart—a white heart.
          <br />
          You know my loyalty.
          <br />
          You know I have no eyes for anyone else.
          <br />
          You know there's no room in my heart for another.
        </p>

        <div className="py-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-romantic-pink/30 to-gold/30 flex items-center justify-center">
            <Heart className="w-8 h-8 text-romantic-pink-deep" fill="currentColor" />
          </div>
        </div>

        <p className="font-display text-xl text-midnight">
          Your heart will never be broken by me.
          <br />
          This, I promise you before Allah.
        </p>
      </div>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

      <div className="space-y-4 pt-4">
        <p className="font-body text-lg text-midnight/80">
          And my dream?
          <br />
          It's simple, yet everything—
        </p>

        <p className="font-display text-xl text-gold">
          A happy married life with you.
          <br />
          You and me, together.
          <br />
          For eternity.
        </p>

        <p className="font-body text-cream/60 pt-4 italic">— Zayed bin Hamid</p>
      </div>
    </div>
  </BookPage>
)

// PAGE 16: Islamic Page
const IslamicPage = () => (
  <BookPage variant="islamic">
    <div className="text-center space-y-8 relative">
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 space-y-8">
        <p className="font-arabic text-3xl text-gold">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>

        <p className="font-display text-xl text-cream/90">Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh</p>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />

        <p className="font-display text-2xl text-gold">Sweetheart Athoy,</p>

        <div className="space-y-4 font-body text-cream/90 leading-relaxed">
          <p>
            On this blessed day, 19 years ago,
            <br />
            Allah (SWT) blessed this world with you.
            <br />
            For this, I express my deepest gratitude to Him.
          </p>

          <p>
            Today, as you celebrate another year,
            <br />I want to gently remind you:
            <br />
            Your life's path is defined.
            <br />
            With each passing year, we move closer to our return to Allah.
          </p>

          <p>
            So my humble request to you, my beloved—
            <br />
            elevate your Iman, strengthen your faith.
            <br />I pray you reach the highest peaks of Iman
            <br />
            and draw ever closer to your Creator.
          </p>

          <p className="text-gold">
            May Allah grant you success in this Dunya and Akhirah.
            <br />
            May He protect you from the trials of this world.
            <br />
            And may He bless our journey together—
            <br />
            in this life and the next.
          </p>
        </div>

        <div className="pt-6 space-y-4">
          <p className="font-display text-2xl text-romantic-pink">Happy 19th Birthday, my Athoy 🤍</p>

          <div className="space-y-2">
            <p className="font-body text-cream/80">With all my love and duas,</p>
            <p className="font-display text-xl text-gold">Zayed bin Hamid</p>
            <p className="font-body text-cream/60 text-sm">January 3, 2025</p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <span className="text-4xl">🕌</span>
        </div>
      </div>
    </div>
  </BookPage>
)

// PAGE 17: Back Cover
const BackCover = () => (
  <BookPage variant="night">
    <div className="text-center space-y-8 py-8">
      <div className="relative inline-block">
        <div className="absolute inset-0 blur-2xl bg-gold/30 rounded-full scale-150" />
        <div className="relative z-10 w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-romantic-pink to-gold flex items-center justify-center">
          <Heart className="w-16 h-16 text-cream animate-heartbeat" fill="currentColor" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-display text-2xl text-cream">Created with love</p>
        <p className="font-body text-gold/80 italic">for Fahmida Islam Athoy</p>
      </div>
      
      {/* Hint to continue */}
      <div className="pt-8 space-y-2">
        <p className="font-body text-cream/60 text-sm animate-pulse">Swipe left or tap Next</p>
        <p className="font-display text-gold text-lg">to see what awaits you ✨</p>
      </div>
    </div>
  </BookPage>
)

// ============================================
// MAIN STORYBOOK COMPONENT
// ============================================
interface StorybookProps {
  onComplete: () => void
}

export default function Storybook({ onComplete }: StorybookProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null)

  const next = () => {
    if (currentPage < 16) {
      setCurrentPage(currentPage + 1)
    } else if (currentPage === 16) {
      onComplete()
    }
  }

  const prev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const pages = [
    { component: CoverPage, variant: 'night' },
    { component: RememberPage1, variant: 'romantic' },
    { component: RememberPage2, variant: 'romantic' },
    { component: LovePage1, variant: 'romantic' },
    { component: LovePage2, variant: 'romantic' },
    { component: HeartPage1, variant: 'romantic' },
    { component: HeartPage2, variant: 'romantic' },
    { component: NightsPage1, variant: 'night' },
    { component: NightsPage2, variant: 'night' },
    { component: NumbersPage1, variant: 'romantic' },
    { component: NumbersPage2, variant: 'romantic' },
    { component: UnspokenPage1, variant: 'romantic' },
    { component: UnspokenPage2, variant: 'romantic' },
    { component: PromisePage1, variant: 'romantic' },
    { component: PromisePage2, variant: 'romantic' },
    { component: IslamicPage, variant: 'islamic' },
    { component: BackCover, variant: 'night' },
  ] as const

  const turnPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return // Prevent double-click
    
    // If on last page and trying to go next, trigger onComplete
    if (direction === 'next' && currentPage >= pages.length - 1) {
      onComplete()
      return
    }
    
    const canFlip = direction === 'next' 
      ? currentPage < pages.length - 1 
      : currentPage > 0
    
    if (!canFlip) return
    
    // Start flip animation
    setIsFlipping(true)
    setFlipDirection(direction)
    
    // After animation completes (400ms), change page
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage(prev => prev + 1)
      } else {
        setCurrentPage(prev => prev - 1)
      }
      setIsFlipping(false)
      setFlipDirection(null)
    }, 400)
  }

  // Determine navigation variant based on current page theme
  const currentTheme = pages[currentPage].variant
  const navVariant = (currentTheme === 'night' || currentTheme === 'islamic') ? 'dark' : 'light'
  
  // Get current page component
  const CurrentPageComponent = pages[currentPage].component
  
  // Animation class based on flip state
  const flipClass = isFlipping 
    ? flipDirection === 'next' 
      ? 'animate-page-flip-out' 
      : 'animate-page-flip-in'
    : 'animate-page-enter'

  // Swipe gesture handling
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    
    const deltaX = touchEndX - touchStartX.current
    const deltaY = touchEndY - touchStartY.current
    
    // Only trigger if horizontal swipe is greater than vertical (to not interfere with scroll)
    // and swipe distance is at least 50px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        // Swiped left -> go to next page
        turnPage('next')
      } else {
        // Swiped right -> go to previous page
        turnPage('prev')
      }
    }
    
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden bg-background font-body perspective-1000"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StarryBackground variant="dark" />

      {/* Current Page - fills entire screen with flip animation */}
      <div 
        className={cn(
          "relative z-10 w-full h-full transform-style-3d origin-left",
          flipClass
        )}
      >
        <CurrentPageComponent />
      </div>

      {/* Navigation - fixed at bottom, always visible */}
      <PageNavigation
        currentPage={currentPage + 1}
        totalPages={17}
        onPrevious={() => turnPage('prev')}
        onNext={() => turnPage('next')}
        variant={navVariant}
      />
    </div>
  )
}


