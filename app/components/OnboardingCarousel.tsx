"use client"

import { useState } from "react"
import { ChevronRight, CheckCircle2 } from "lucide-react"

const onboardingSlides = [
  {
    id: 1,
    title: "Welcome to TaskFlow",
    description:
      "Your personal productivity companion designed to help you stay organized and accomplish your goals with ease.",
    icon: "🎯",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 2,
    title: "Organize by Categories",
    description:
      "Keep your tasks organized with customizable categories - Work, Personal, Health, and more. Stay focused on what matters most.",
    icon: "📂",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 3,
    title: "Smart Task Management",
    description:
      "Add, edit, and delete tasks effortlessly. Set reminders to never miss important deadlines and track your progress with due dates.",
    icon: "✓",
    color: "from-orange-400 to-orange-500",
  },
  {
    id: 4,
    title: "Reminders & Notifications",
    description:
      "Get notified about your important tasks. Our intelligent reminder system keeps you on track throughout your day.",
    icon: "🔔",
    color: "from-orange-600 to-orange-700",
  },
  {
    id: 5,
    title: "Ready to Get Started?",
    description:
      "Begin your productivity journey now. Click below to start creating your first task and explore all the features TaskFlow has to offer.",
    icon: "🚀",
    color: "from-orange-500 to-orange-600",
  },
]

interface OnboardingCarouselProps {
  onComplete: () => void
}

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const slide = onboardingSlides[currentSlide]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Slide Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-orange-500" : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Content Card */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          {/* Icon */}
          <div className={`text-6xl mb-6 text-center animate-bounce`}>{slide.icon}</div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-4 text-center text-balance">{slide.title}</h2>

          {/* Description */}
          <p className="text-slate-300 text-center mb-8 leading-relaxed text-pretty">{slide.description}</p>

          {/* Progress indicator */}
          <div className="w-full bg-slate-700 rounded-full h-1 mb-8">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-1 rounded-full transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / onboardingSlides.length) * 100}%` }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-colors duration-200"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
            >
              {currentSlide === onboardingSlides.length - 1 ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Start
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Slide counter */}
        <div className="text-center mt-6 text-slate-400 text-sm">
          {currentSlide + 1} of {onboardingSlides.length}
        </div>
      </div>
    </div>
  )
}
