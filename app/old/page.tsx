"use client"

import { Button } from "@/components/old/ui/button"
import Navbar from "@/components/old/navbar"
import Footer from "@/components/old/footer"
import HowItWorks from "@/components/old/how-it-works"
import LuggyFeatures from "@/components/old/luggy-features"
import LuggyFAQ from "@/components/old/luggy-faq"
import { useState } from "react"
import InstallModal from "@/components/old/install-modal"
import UserRegistrationModal from "@/components/old/user-registration-modal"
import HostRegistrationModal from "@/components/old/host-registration-modal"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [isHostModalOpen, setIsHostModalOpen] = useState(false)
  const [isBannerVisible] = useState(false)
  const { t, language } = useLanguage()

  const heroAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const campusAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: true })
  const ctaAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const contactAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: true })

  const openWaitlistModal = () => {
    setIsWaitlistModalOpen(true)
  }

  const openHostModal = () => {
    setIsHostModalOpen(true)
  }

  return (
    <div
      className={`min-h-screen bg-black text-white font-geist ${isBannerVisible ? "pt-[108px] sm:pt-28" : "pt-20"} ${language === "ko" ? "font-noto-sans-kr" : ""}`}
    >
      <Navbar isBannerVisible={isBannerVisible} />

      <div className="max-w-[1920px] mx-auto relative px-6 md:px-8">
        <section
          ref={heroAnimation.ref}
          className={`relative rounded-[16px] rounded-all-devices mb-6 md:h-[calc(100vh-144px)] font-geist text-white flex flex-col transition-all duration-1000 ${
            heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[16px] bg-black" />

          <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center pt-[38px] sm:pt-[50px] pb-8 md:pt-[70px] md:pb-12 z-10 flex flex-col h-full justify-center">
            <h2
              className="font-semibold mb-6"
              style={{
                backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
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
              className="max-w-2xl mx-auto text-white/80 mb-8"
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
          className={`py-16 md:py-24 bg-black transition-all duration-1000 delay-200 ${
            campusAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="container mx-auto px-4 text-center">
            <p
              className="uppercase mb-8 md:mb-12"
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
          className={`relative rounded-[16px] rounded-all-devices mt-6 mb-6 md:h-[calc(100vh-144px)] font-geist text-white flex flex-col transition-all duration-1000 ${
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
              className="absolute inset-0 w-full h-full rounded-[16px]"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.35)",
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
                className="bg-black text-white font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg hover:opacity-90 transition-opacity border border-white/30"
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
          className={`py-16 md:py-24 bg-black transition-all duration-1000 delay-300 ${
            contactAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2
              className="font-semibold mb-6"
              style={{
                backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
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
              className="max-w-2xl mx-auto text-white/80 mb-8"
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
                href="mailto:luggy.service@gmail.com"
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
