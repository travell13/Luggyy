"use client"
import { useState, useEffect, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface NavbarProps {
  isBannerVisible?: boolean
}

export default function Navbar({ isBannerVisible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled)
    }
  }, [scrolled])

  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const navStyle = {
    boxShadow: scrolled ? "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 8px 32px 0 rgba(0, 0, 0, 0.37)" : "none",
    border: scrolled ? "1px solid rgba(255, 255, 255, 0.18)" : "1px solid transparent",
    borderRadius: "16px",
    transition: "all 0.3s ease-in-out",
    backgroundColor: scrolled ? "rgba(0, 0, 0, 0.4)" : "rgb(0, 0, 0)",
    backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div
      className={`fixed ${isBannerVisible ? "top-[44px] sm:top-12" : "top-0"} left-0 right-0 z-50 flex justify-center px-6 md:px-8 transition-all duration-300`}
    >
      <div className="w-[calc(100%-24px)] max-w-[1400px] mt-2">
        <nav
          className="flex items-center justify-between p-2 h-16 rounded-[16px] text-white font-geist"
          style={navStyle}
        >
          <div className="flex items-center ml-[15px]">
            <span className="text-white font-geist font-bold text-lg">Luggy</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 mr-4">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.howItWorks")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.qa")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.contact")}
            </button>
            <button
              onClick={toggleLanguage}
              className="text-white/80 hover:text-white transition-colors text-sm font-bold px-3 py-1 rounded-md border border-white/20 hover:border-white/40"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {language === "en" ? "KR" : "EN"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center mr-2 p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
        )}

        <div
          className={`fixed top-[76px] right-6 w-[calc(100%-48px)] max-w-[400px] bg-black/30 backdrop-blur-xl border border-white/20 rounded-[16px] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[-20px] opacity-0 pointer-events-none"
          }`}
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <div className="p-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-white/80 hover:text-white transition-colors text-left py-3 px-4 rounded-lg hover:bg-white/5"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.howItWorks")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-white/80 hover:text-white transition-colors text-left py-3 px-4 rounded-lg hover:bg-white/5"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.qa")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white/80 hover:text-white transition-colors text-left py-3 px-4 rounded-lg hover:bg-white/5"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.contact")}
            </button>
            <button
              onClick={toggleLanguage}
              className="text-white/80 hover:text-white transition-colors text-left py-3 px-4 rounded-lg hover:bg-white/5 border border-white/20"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {language === "en" ? "한국어 (KR)" : "English (EN)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
