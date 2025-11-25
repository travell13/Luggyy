"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/contexts/language-context"

export default function HowItWorks() {
  const { t, language } = useLanguage()
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const step1Animation = useScrollAnimation({ threshold: 0.3 })
  const step2Animation = useScrollAnimation({ threshold: 0.3 })
  const step3Animation = useScrollAnimation({ threshold: 0.3 })

  const steps = [
    {
      number: "1",
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
      icon: "📍",
      animation: step1Animation,
    },
    {
      number: "2",
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      icon: "✓",
      animation: step2Animation,
    },
    {
      number: "3",
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      icon: "📦",
      animation: step3Animation,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          ref={titleAnimation.ref}
          className={`text-center mb-12 md:mb-16 font-semibold transition-all duration-1000 ${
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
            color: "transparent",
            fontFamily: language === "ko" ? "var(--font-noto-sans-kr), sans-serif" : "GeistSans, sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 600,
            letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
            lineHeight: "1.15",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {t("howItWorks.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={step.animation.ref}
              className={`flex flex-col items-center text-center transition-all duration-1000 ${
                step.animation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className="mb-6 flex items-center justify-center h-20 w-20 rounded-full border-2 border-cyan-400"
                style={{
                  background: "linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(255, 92, 40, 0.1))",
                }}
              >
                <span className="text-4xl">{step.icon}</span>
              </div>
              <h3
                className="font-semibold mb-3 text-white"
                style={{
                  fontFamily: language === "ko" ? "var(--font-noto-sans-kr), sans-serif" : "GeistSans, sans-serif",
                  fontSize: "24px",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-white/70"
                style={{
                  fontFamily:
                    language === "ko"
                      ? "var(--font-noto-sans-kr), sans-serif"
                      : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
