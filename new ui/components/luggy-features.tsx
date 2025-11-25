"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { MapPin, Shield, Brain, Package, MessageSquare } from "lucide-react"

export default function LuggyFeatures() {
  const { t, language } = useLanguage()
  const { theme } = useTheme()
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const feature1Animation = useScrollAnimation({ threshold: 0.3 })
  const feature2Animation = useScrollAnimation({ threshold: 0.3 })
  const feature3Animation = useScrollAnimation({ threshold: 0.3 })
  const feature4Animation = useScrollAnimation({ threshold: 0.3 })
  const feature5Animation = useScrollAnimation({ threshold: 0.3 })

  const features = [
    {
      icon: MapPin,
      title: t("features.radius.title"),
      description: t("features.radius.description"),
      animation: feature1Animation,
    },
    {
      icon: Shield,
      title: t("features.escrow.title"),
      description: t("features.escrow.description"),
      animation: feature2Animation,
    },
    {
      icon: Brain,
      title: t("features.ai.title"),
      description: t("features.ai.description"),
      animation: feature3Animation,
    },
    {
      icon: Package,
      title: t("features.price.title"),
      description: t("features.price.description"),
      animation: feature4Animation,
    },
    {
      icon: MessageSquare,
      title: t("features.chat.title"),
      description: t("features.chat.description"),
      animation: feature5Animation,
    },
  ]

  return (
    <section className={`py-16 md:py-24 transition-colors duration-1000 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          ref={titleAnimation.ref}
          className={`text-center mb-12 md:mb-16 font-semibold transition-all duration-1000 ${
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))"
                : "linear-gradient(rgb(30, 30, 30), rgb(30, 30, 30) 29%, rgb(100, 100, 100))",
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
          {t("features.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                ref={feature.animation.ref}
                className={`p-6 md:p-8 rounded-2xl transition-all duration-1000 ${
                  feature.animation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  theme === "dark"
                    ? "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20"
                    : "bg-black/5 backdrop-blur-xl border border-black/10 hover:bg-black/10 hover:border-black/20"
                } shadow-lg hover:shadow-xl`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                  <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3
                  className={`font-semibold mb-3 transition-colors duration-1000 ${theme === "dark" ? "text-white" : "text-black"}`}
                  style={{
                    fontFamily: language === "ko" ? "var(--font-noto-sans-kr), sans-serif" : "GeistSans, sans-serif",
                    fontSize: "20px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`transition-colors duration-1000 ${theme === "dark" ? "text-white/70" : "text-black/70"}`}
                  style={{
                    fontFamily:
                      language === "ko"
                        ? "var(--font-noto-sans-kr), sans-serif"
                        : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p
            className={`transition-colors duration-1000 ${theme === "dark" ? "text-white/60" : "text-black/60"}`}
            style={{
              fontFamily:
                language === "ko"
                  ? "var(--font-noto-sans-kr), sans-serif"
                  : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "14px",
            }}
          >
            {t("features.waitlist")}
          </p>
        </div>
      </div>
    </section>
  )
}
