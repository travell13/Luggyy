"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface UserRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserRegistrationModal({ isOpen, onClose }: UserRegistrationModalProps) {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({ name: "", email: "", userType: "user" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("User registration submitted:", formData)
    setSubmitted(true)
    setLoading(false)

    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", userType: "user" })
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-black border border-white/10 rounded-[16px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2
            className="text-2xl font-semibold text-white"
            style={{
              fontFamily:
                language === "ko"
                  ? "var(--font-noto-sans-kr), sans-serif"
                  : 'var(--font-geist-sans, "GeistSans", sans-serif)',
              letterSpacing: "-0.04em",
            }}
          >
            {t("modal.title")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t("modal.success")}</h3>
              <p className="text-white/60 text-center text-sm">{t("modal.successMessage")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-white/70 text-sm mb-6">{t("modal.subtitle")}</p>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/80 mb-2"
                  style={{
                    fontFamily:
                      language === "ko"
                        ? "var(--font-noto-sans-kr), sans-serif"
                        : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  }}
                >
                  {t("modal.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("modal.namePlaceholder")}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                  style={{
                    fontFamily:
                      language === "ko"
                        ? "var(--font-noto-sans-kr), sans-serif"
                        : 'var(--font-geist-sans, "GeistSans", sans-serif)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80 mb-2"
                  style={{
                    fontFamily:
                      language === "ko"
                        ? "var(--font-noto-sans-kr), sans-serif"
                        : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  }}
                >
                  {t("modal.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("modal.emailPlaceholder")}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                  style={{
                    fontFamily:
                      language === "ko"
                        ? "var(--font-noto-sans-kr), sans-serif"
                        : 'var(--font-geist-sans, "GeistSans", sans-serif)',
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-white/80 mb-3"
                  style={{
                    fontFamily:
                      language === "ko"
                        ? "var(--font-noto-sans-kr), sans-serif"
                        : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  }}
                >
                  {t("modal.joinAs")}
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="radio"
                      name="userType"
                      value="user"
                      checked={formData.userType === "user"}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-cyan-400"
                    />
                    <span className="text-white text-sm">{t("modal.user")}</span>
                  </label>
                  <label className="flex-1 flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="radio"
                      name="userType"
                      value="host"
                      checked={formData.userType === "host"}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-cyan-400"
                    />
                    <span className="text-white text-sm">{t("modal.host")}</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-white hover:bg-gray-100 disabled:bg-gray-400 text-black font-mono text-sm font-semibold tracking-wider py-3 px-4 rounded-lg transition-colors"
                style={{
                  fontFamily:
                    language === "ko"
                      ? "var(--font-noto-sans-kr), sans-serif"
                      : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                  letterSpacing: "0.56px",
                  height: "48px",
                }}
              >
                {loading ? t("modal.submitting") : t("modal.submit")}
              </button>

              <p className="text-white/50 text-xs text-center mt-4">{t("modal.disclaimer")}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
