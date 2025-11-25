"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/contexts/language-context"

interface LuggyFAQProps {
  onOpenApp?: () => void
}

export default function LuggyFAQ({ onOpenApp }: LuggyFAQProps) {
  const { t, language } = useLanguage()
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const accordionAnimation = useScrollAnimation({ threshold: 0.2 })
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 })

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
          {t("faq.title")}
        </h2>

        <div
          ref={accordionAnimation.ref}
          className={`transition-all duration-1000 ${
            accordionAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <span
                    className="text-left font-medium text-white"
                    style={{
                      fontFamily:
                        language === "ko"
                          ? "var(--font-noto-sans-kr), sans-serif"
                          : 'var(--font-geist-sans), "GeistSans", sans-serif',
                      fontSize: "18px",
                    }}
                  >
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 pt-0">
                  <p
                    className="text-white/80"
                    style={{
                      fontFamily:
                        language === "ko"
                          ? "var(--font-noto-sans-kr), sans-serif"
                          : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                      fontSize: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          ref={ctaAnimation.ref}
          className={`mt-12 md:mt-16 text-center transition-all duration-1000 delay-200 ${
            ctaAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-white/80 mb-6"
            style={{
              fontFamily:
                language === "ko"
                  ? "var(--font-noto-sans-kr), sans-serif"
                  : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            {t("faq.ready")}
          </p>

          {onOpenApp && (
            <Button
              onClick={onOpenApp}
              className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg"
              style={{
                fontFamily:
                  language === "ko"
                    ? "var(--font-noto-sans-kr), sans-serif"
                    : 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                letterSpacing: "0.56px",
                height: "48px",
              }}
            >
              <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
              {t("faq.getStarted")}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
