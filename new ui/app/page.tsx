"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HowItWorks from "@/components/how-it-works"
import LuggyFeatures from "@/components/luggy-features"
import LuggyFAQ from "@/components/luggy-faq"
import { useState, useEffect, useRef } from "react"
import InstallModal from "@/components/install-modal"
import UserRegistrationModal from "@/components/user-registration-modal"
import HostRegistrationModal from "@/components/host-registration-modal"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

export default function Home() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [isHostModalOpen, setIsHostModalOpen] = useState(false)
  const [isBannerVisible] = useState(false)
  const { t, language } = useLanguage()
  const { theme, setTheme } = useTheme()

  const storageSectionRef = useRef<HTMLElement>(null)
  const [userPreferredTheme, setUserPreferredTheme] = useState<string | null>(null)

  const heroAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const campusAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: true })
  const ctaAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const contactAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    let rafId: number | null = null
    let lastScrollPosition = 0

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        if (!ctaAnimation.ref.current) return

        const sectionTop = ctaAnimation.ref.current.offsetTop
        const scrollPosition = window.scrollY + window.innerHeight / 2
        const currentScrollDirection = scrollPosition > lastScrollPosition ? "down" : "up"

        lastScrollPosition = scrollPosition

        const transitionStart = sectionTop - 300
        const transitionEnd = sectionTop + 100

        if (scrollPosition >= transitionStart && scrollPosition <= transitionEnd) {
          if (theme !== "dark" && !userPreferredTheme) {
            setTheme("dark")
          }
        } else if (scrollPosition < transitionStart) {
          if (theme !== "light" && !userPreferredTheme) {
            setTheme("light")
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [theme, setTheme, userPreferredTheme, ctaAnimation.ref])

  const openWaitlistModal = () => {
    setIsWaitlistModalOpen(true)
  }

  const openHostModal = () => {
    setIsHostModalOpen(true)
  }

  return (
    <div
      className={`min-h-screen font-geist ${isBannerVisible ? "pt-[108px] sm:pt-28" : "pt-20"} ${language === "ko" ? "font-noto-sans-kr" : ""} transition-colors duration-500 ease-out`}
      style={{
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      }}
    >
      <Navbar isBannerVisible={isBannerVisible} />

      <div className="max-w-[1920px] mx-auto relative px-6 md:px-8">
        <section
          ref={heroAnimation.ref}
          className={`relative mb-6 md:h-[calc(100vh-144px)] font-geist flex flex-col transition-all duration-1000 rounded-[16px] overflow-hidden ${
            heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 50%, #0a1a2a 100%)"
                : "linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 25%, #fce7f3 50%, #e0f2fe 75%, #ddd6fe 100%)",
          }}
        >
          <div
            className={`relative w-full px-4 sm:px-6 lg:px-8 text-center pt-[38px] sm:pt-[50px] pb-8 md:pt-[70px] md:pb-12 z-10 flex flex-col h-full justify-center`}
          >
            <h2
              className={`font-semibold mb-6 ${theme === "dark" ? "" : "light-mode"} heading-with-selection transition-colors duration-500 ease-out`}
              style={{
                backgroundImage:
                  theme === "dark"
                    ? "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))"
                    : "linear-gradient(rgb(30, 30, 30), rgb(30, 30, 30) 29%, rgb(100, 100, 100))",
                color: "transparent",
                fontFamily: language === "ko" ? "var(--font-noto-sans-kr), sans-serif" : "GeistSans, sans-serif",
                fontSize: "clamp(42px, 8vw, 96px)",
                fontWeight: 600,
                letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
                lineHeight: "1.2",
                textAlign: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {t("hero.title")}
            </h2>
            <p
              className={`max-w-2xl mx-auto mb-8 transition-colors duration-500 ease-out ${
                theme === "dark" ? "text-white/80" : "text-black/70"
              }`}
              style={{
                fontFamily:
                  language === "ko"
                    ? "var(--font-noto-sans-kr), sans-serif"
                    : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "clamp(14px, 4vw, 18px)",
                lineHeight: "1.5",
              }}
            >
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={openWaitlistModal}
                className="bg-gradient-to-r from-[#00D9FF] via-[#00B4D8] to-[#0077B6] text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                style={{
                  fontFamily:
                    language === "ko"
                      ? "var(--font-noto-sans-kr), sans-serif"
                      : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  letterSpacing: "0.56px",
                  height: "48px",
                }}
              >
                {t("hero.cta")}
              </Button>
            </div>
          </div>
        </section>

        <section
          ref={campusAnimation.ref}
          className={`py-16 md:py-24 transition-all duration-500 ease-out delay-200 ${
            campusAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="container mx-auto px-4 text-center">
            <p
              style={{
                fontFamily:
                  language === "ko"
                    ? "var(--font-noto-sans-kr), sans-serif"
                    : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "400",
                letterSpacing: "0.5px",
                color: "#999999",
              }}
              className="uppercase mb-8 md:mb-12"
            >
              {t("campus.trusted")}
            </p>
          </div>
        </section>

        <div id="how-it-works">
          <HowItWorks />
        </div>

        <LuggyFeatures />

        <div id="faq">
          <LuggyFAQ onOpenApp={openWaitlistModal} />
        </div>

        <section
          ref={ctaAnimation.ref}
          className={`relative rounded-[16px] rounded-all-devices mt-6 mb-6 md:h-[calc(100vh-144px)] font-geist flex flex-col transition-all duration-1000 ${
            ctaAnimation.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[16px]">
            <div
              className="absolute inset-0 w-full h-full rounded-[16px]"
              style={{
                background: "linear-gradient(135deg, #00D9FF 0%, #00B4D8 50%, #0077B6 100%)",
              }}
            />
            <div
              className="absolute inset-0 w-full h-full rounded-[16px] transition-all duration-500 ease-out"
              style={{
                backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.35)" : "rgba(0, 0, 0, 0.15)",
              }}
            />
          </div>

          <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center pt-[38px] sm:pt-[50px] pb-8 md:pt-[70px] md:pb-12 z-10 flex flex-col h-full justify-center">
            <h1
              className="font-semibold mb-2 overflow-visible select-text heading-with-selection"
              style={{
                fontSize: "clamp(42px, 8vw, 120px)",
                lineHeight: "1.2",
                letterSpacing: "clamp(-2px, -0.04em, -5.18998px)",
                fontFamily:
                  language === "ko"
                    ? "var(--font-noto-sans-kr), sans-serif"
                    : 'var(--font-geist-sans), "GeistSans Fallback", sans-serif',
                height: "auto",
                maxWidth: "100%",
                paddingBottom: "0",
                marginBottom: "0.2em",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {t("cta.title")}
            </h1>
            <p
              className="mx-auto h-auto select-text mb-8 max-w-2xl"
              style={{
                fontFamily:
                  language === "ko"
                    ? "var(--font-noto-sans-kr), sans-serif"
                    : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "clamp(14px, 4vw, 22px)",
                lineHeight: "1.4",
                fontWeight: "400",
                letterSpacing: "normal",
                color: "#FFFFFF",
                backgroundColor: "transparent",
              }}
            >
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-[#00D9FF] via-[#00B4D8] to-[#0077B6] text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                style={{
                  fontFamily:
                    language === "ko"
                      ? "var(--font-noto-sans-kr), sans-serif"
                      : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  letterSpacing: "0.56px",
                  height: "48px",
                }}
                onClick={openWaitlistModal}
              >
                {t("cta.joinWaitlist")}
              </Button>
              <Button
                onClick={openHostModal}
                className={`font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-500 ease-out border ${
                  theme === "dark" ? "bg-black text-white border-white/30" : "bg-white text-black border-black/30"
                }`}
                style={{
                  fontFamily:
                    language === "ko"
                      ? "var(--font-noto-sans-kr), sans-serif"
                      : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  letterSpacing: "0.56px",
                  height: "48px",
                }}
              >
                {t("cta.becomeHost")}
              </Button>
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={contactAnimation.ref}
          className={`py-16 md:py-24 transition-all duration-500 ease-out delay-300 ${
            contactAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2
              className="font-semibold mb-6 transition-colors duration-500 ease-out"
              style={{
                backgroundImage:
                  theme === "dark"
                    ? "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))"
                    : "linear-gradient(rgb(30, 30, 30), rgb(30, 30, 30) 29%, rgb(100, 100, 100))",
                color: "transparent",
                fontFamily: language === "ko" ? "var(--font-noto-sans-kr), sans-serif" : "GeistSans, sans-serif",
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 600,
                letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
                lineHeight: "1.2",
                textAlign: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {t("contact.title")}
            </h2>
            <p
              className={`max-w-2xl mx-auto mb-8 transition-colors duration-500 ease-out ${
                theme === "dark" ? "text-white/80" : "text-black/70"
              }`}
              style={{
                fontFamily:
                  language === "ko"
                    ? "var(--font-noto-sans-kr), sans-serif"
                    : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                fontSize: "16px",
                lineHeight: "1.5",
              }}
            >
              {t("contact.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@luggy.app"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#00D9FF] via-[#00B4D8] to-[#0077B6] text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                style={{
                  fontFamily:
                    language === "ko"
                      ? "var(--font-noto-sans-kr), sans-serif"
                      : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  letterSpacing: "0.56px",
                  height: "48px",
                }}
              >
                {t("contact.cta")}
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <InstallModal isOpen={false} onClose={() => {}} />
      <UserRegistrationModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
      <HostRegistrationModal isOpen={isHostModalOpen} onClose={() => setIsHostModalOpen(false)} />
    </div>
  )
}
