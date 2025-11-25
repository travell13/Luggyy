"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ko"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.howItWorks": "How It Works",
    "nav.qa": "Q&A",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "Ready to Store Smart?",
    "hero.subtitle": "Join thousands of students who trust Luggy for secure, affordable luggage storage.",
    "hero.cta": "JOIN THE WAITLIST",

    // Campus Section
    "campus.trusted": "made for students by students",

    // How It Works
    "howItWorks.title": "How It Works",
    "howItWorks.step1.title": "Find Nearby Storage",
    "howItWorks.step1.description":
      "Browse storage spaces within 500m of your campus. Filter by price, rating, and availability. Every host is verified.",
    "howItWorks.step2.title": "Book & Verify",
    "howItWorks.step2.description":
      "Reserve instantly using PASS/Kakao identity verification and pay safely through KakaoPay escrow. Both renter and host stay fully accountable.",
    "howItWorks.step3.title": "Drop Off & Relax",
    "howItWorks.step3.description":
      "Meet your verified host, drop off your luggage, and enjoy peace of mind knowing your belongings are secure. Pick up whenever you need.",

    // Features
    "features.title": "Why Choose Luggy?",
    "features.radius.title": "500m Radius Match",
    "features.radius.description":
      "Find storage within 500 meters of your campus. No more dragging luggage across town. Walk, store, done.",
    "features.escrow.title": "Escrow Payment Protection",
    "features.escrow.description":
      "Your payment is held in escrow until both parties confirm the transaction. Total security for both renters and hosts.",
    "features.ai.title": "AI-Powered Safety",
    "features.ai.description":
      "Before boxes are sealed, our system scans packing photos and automatically flags prohibited or hazardous items—keeping both renters and hosts protected.",
    "features.price.title": "Smart Price Estimator",
    "features.price.description":
      "Take one photo of your packed items and Luggy's AI instantly estimates how many boxes you need and what the total storage cost will be—no guesswork.",
    "features.chat.title": "Chat Mask",
    "features.chat.description":
      "Communicate securely with hosts without exposing personal contact information. All messages go through our encrypted in-app system for complete privacy.",
    "features.waitlist": "Join the waitlist to be the first to experience these features",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "How much does it cost?",
    "faq.a1":
      "You get to bid on the price! Hosts set their asking price, and you can negotiate directly with them. Find the best deal for your storage needs.",
    "faq.q2": "Can I access my luggage anytime?",
    "faq.a2":
      "Access depends on the host's availability.",
    "faq.q3": "How do I become a host?",
    "faq.a3":
      "Share your unused space, set your monthly rate, and we'll match you with students who need storage. A simple way to make passive income from your extra room.",
    "faq.q4": "Is my personal information safe?",
    "faq.a4":
      "Yes. We use masked chat so neither party sees personal contact info.",
    "faq.ready": "Ready to find your storage? Get started in seconds.",
    "faq.getStarted": "GET STARTED",

    // CTA Section
    "cta.title": "Storage Made Simple",
    "cta.subtitle": "Store your luggage securely with verified hosts near campus. Simple, affordable, and safe.",
    "cta.joinWaitlist": "JOIN THE WAITLIST",
    "cta.becomeHost": "BECOME A HOST",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Have questions? Want to become a partner? Reach out to our team.",
    "contact.cta": "CONTACT US",

    // Modal
    "modal.title": "Join the Waitlist",
    "modal.subtitle": "Be the first to know when Luggy launches. Get exclusive early access.",
    "modal.name": "Name",
    "modal.namePlaceholder": "Your name",
    "modal.email": "Email",
    "modal.emailPlaceholder": "your@email.com",
    "modal.joinAs": "Join as",
    "modal.user": "User",
    "modal.host": "Host",
    "modal.submit": "JOIN WAITLIST",
    "modal.submitting": "Joining...",
    "modal.success": "You're on the list!",
    "modal.successMessage": "We'll notify you as soon as Luggy launches.",
    "modal.disclaimer": "We'll never spam you. Unsubscribe at any time.",
  },
  ko: {
    // Navbar
    "nav.howItWorks": "어떻게 이용하나요",
    "nav.qa": "Q&A",
    "nav.contact": "문의하기",

    // Hero
    "hero.title": "스마트하게 보관할 준비 되셨나요?",
    "hero.subtitle": "수천 명의 대학생들이 Luggy를 믿고 안전하고 합리적인 가격으로 짐을 보관하고 있습니다.",
    "hero.cta": "웨이트리스트 참여하기",

    // Campus Section
    "campus.trusted": "학생들이 만든 학생을 위한 서비스",

    // How It Works
    "howItWorks.title": "어떻게 이용하나요",
    "howItWorks.step1.title": "내 주변 보관 공간 찾기",
    "howItWorks.step1.description":
      "캠퍼스에서 500m 이내의 보관 공간을 둘러보세요. 가격, 평점, 이용 가능 여부로 필터링할 수 있습니다. 모든 호스트는 인증된 사용자입니다.",
    "howItWorks.step2.title": "예약 & 확인",
    "howItWorks.step2.description":
      "PASS/Kakao 본인 인증을 통해 즉시 예약하고 KakaoPay 에스크로 결제로 안전하게 거래하세요. 렌터와 호스트 모두에게 안전한 보호 시스템입니다.",
    "howItWorks.step3.title": "맡기고 편하게 쉬세요",
    "howItWorks.step3.description":
      "인증된 호스트를 만나 짐을 맡기고 안심하고 휴식하거나 여행하세요. 필요할 때 언제든지 찾아갈 수 있습니다.",

    // Features
    "features.title": "왜 Luggy인가?",
    "features.radius.title": "500m 반경 매칭",
    "features.radius.description":
      "캠퍼스에서 500m 이내에서 보관 공간을 찾을 수 있습니다. 짐을 들고 멀리 이동할 필요 없습니다. 걷고, 맡기고, 끝.",
    "features.escrow.title": "에스크로 결제 보호",
    "features.escrow.description":
      "결제는 거래가 완료될 때까지 보관됩니다. 렌터와 호스트 모두에게 안전한 보호 시스템입니다.",
    "features.ai.title": "AI 기반 안전 체크",
    "features.ai.description":
      "박스를 밀봉하기 전에 사진을 촬영하면 AI가 자동으로 금지·위험 물품 여부를 감지하여 호스트와 이용자 모두의 안전을 보장합니다.",
    "features.price.title": "스마트 가격 예측",
    "features.price.description":
      "짐 사진 한 장만 찍으면 Luggy AI가 필요한 박스 수와 예상 보관 비용을 즉시 계산해줍니다. 이제 계산 실수는 없습니다.",
    "features.chat.title": "익명 채팅",
    "features.chat.description": "개인 연락처를 노출하지 않고 앱 내 암호화된 메시지 시스템으로 안전하게 대화하세요.",
    "features.waitlist": "웨이트리스트에 참여하고 가장 먼저 경험해보세요",

    // FAQ
    "faq.title": "자주 묻는 질문 (FAQ)",
    "faq.q1": "비용은 얼마인가요?",
    "faq.a1":
      "여러분이 가격을 제시할 수 있습니다!호스트가 원하는 금액을 설정하면, 여러분은 직접 협상할 수 있습니다.필요한 보관 공간을 가장 좋은 조건으로 이용해 보세요.",
    "faq.q2": "짐을 언제든지 찾을 수 있나요?",
    "faq.a2":
      "호스트의 가능 시간에 따라 다릅니다. 대부분의 호스트는 업무 시간 동안 유연한 드롭오프 및 픽업 시간을 제공합니다.",
    "faq.q3": "호스트는 어떻게 되나요?",
    "faq.a3":
      "사용하지 않는 공간을 공유하고, 월 요금을 설정하면 보관이 필요한 학생과 매칭해드립니다. 남은 공간으로 간단하게 수익을 창출하세요.",
    "faq.q4": "내 개인정보는 안전한가요?",
    "faq.a4":
      "네. 익명 채팅을 사용하므로 양측 모두 개인 연락처 정보를 볼 수 없습니다. KYC 인증은 기밀로 안전하게 처리됩니다.",
    "faq.ready": "보관할 준비 되셨나요? 몇 초 만에 시작할 수 있습니다.",
    "faq.getStarted": "지금 시작하기",

    // CTA Section
    "cta.title": "쉽게 하는 보관",
    "cta.subtitle": "캠퍼스 근처 인증된 호스트에게 짐을 안전하게 맡기세요. 간단하고, 저렴하고, 안전합니다.",
    "cta.joinWaitlist": "웨이트리스트 참여하기",
    "cta.becomeHost": "호스트 되기",

    // Contact
    "contact.title": "문의하기",
    "contact.subtitle": "질문이 있나요? 파트너가 되고 싶나요? 저희 팀에 연락하세요.",
    "contact.cta": "문의하기",

    // Modal
    "modal.title": "웨이트리스트 참여하기",
    "modal.subtitle": "Luggy 출시 소식을 가장 먼저 받아보세요. 독점 얼리 액세스를 받으세요.",
    "modal.name": "이름",
    "modal.namePlaceholder": "이름을 입력하세요",
    "modal.email": "이메일",
    "modal.emailPlaceholder": "your@email.com",
    "modal.joinAs": "가입 유형",
    "modal.user": "이용자",
    "modal.host": "호스트",
    "modal.submit": "웨이트리스트 참여",
    "modal.submitting": "참여 중...",
    "modal.success": "리스트에 추가되었습니다!",
    "modal.successMessage": "Luggy 출시 즉시 알려드리겠습니다.",
    "modal.disclaimer": "스팸 메일을 보내지 않습니다. 언제든지 구독 취소할 수 있습니다.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("luggy-language") as Language
    if (saved && (saved === "en" || saved === "ko")) {
      setLanguage(saved)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ko" : "en"
    setLanguage(newLang)
    localStorage.setItem("luggy-language", newLang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
