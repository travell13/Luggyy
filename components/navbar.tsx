"use client"
import { useState, useEffect, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"

interface NavbarProps {
  isBannerVisible?: boolean
}

export default function Navbar({ isBannerVisible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { theme } = useTheme()

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
    border: scrolled
      ? theme === "dark"
        ? "1px solid rgba(255, 255, 255, 0.12)"
        : "1px solid rgba(0, 0, 0, 0.08)"
      : "1px solid transparent",
    borderRadius: "16px",
    transition: "all 0.3s ease-in-out",
    backgroundColor: scrolled ? (theme === "dark" ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.5)") : "transparent",
    backdropFilter: scrolled ? "blur(32px) saturate(200%)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(32px) saturate(200%)" : "none",
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
          className={`flex items-center justify-between p-2 h-16 rounded-[16px] font-geist ${theme === "dark" ? "text-white" : "text-black"}`}
          style={navStyle}
        >
          <div className="flex items-center ml-[15px]">
            <span className={`font-geist font-bold text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
              Luggy
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 mr-4">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className={`${theme === "dark" ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black"} transition-colors text-sm font-medium`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.howItWorks")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className={`${theme === "dark" ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black"} transition-colors text-sm font-medium`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.qa")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`${theme === "dark" ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black"} transition-colors text-sm font-medium`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.contact")}
            </button>
            <button
              onClick={toggleLanguage}
              className={`${theme === "dark" ? "text-white/80 hover:text-white hover:bg-white/5 border-white/20" : "text-black/80 hover:text-black hover:bg-black/5 border-black/20"} transition-colors text-sm font-bold px-3 py-1 rounded-md border`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {language === "en" ? "KR" : "EN"}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3 mr-2">
            <button
              onClick={toggleLanguage}
              className={`${theme === "dark" ? "text-white/80 hover:text-white hover:bg-white/5 border-white/20" : "text-black/80 hover:text-black hover:bg-black/5 border-black/20"} transition-colors text-xs font-bold px-2 py-1 rounded-md border`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {language === "en" ? "KR" : "EN"}
            </button>
            <button
              className={`flex items-center justify-center p-2 rounded-md ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/10"} transition-colors`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
              ) : (
                <Menu className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
        )}

        <div
          className={`fixed top-[76px] right-6 w-[calc(100%-48px)] max-w-[400px] ${theme === "dark" ? "bg-black/20" : "bg-white/60"} backdrop-blur-xl border ${theme === "dark" ? "border-white/15" : "border-black/8"} rounded-[16px] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[-20px] opacity-0 pointer-events-none"
            }`}
          style={{
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
          }}
        >
          <div className="p-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className={`${theme === "dark" ? "text-white/80 hover:text-white hover:bg-white/5" : "text-black/80 hover:text-black hover:bg-black/5"} transition-colors text-left py-3 px-4 rounded-lg`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.howItWorks")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className={`${theme === "dark" ? "text-white/80 hover:text-white hover:bg-white/5" : "text-black/80 hover:text-black hover:bg-black/5"} transition-colors text-left py-3 px-4 rounded-lg`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.qa")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`${theme === "dark" ? "text-white/80 hover:text-white hover:bg-white/5" : "text-black/80 hover:text-black hover:bg-black/5"} transition-colors text-left py-3 px-4 rounded-lg`}
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              }}
            >
              {t("nav.contact")}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
