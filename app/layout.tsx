import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"
import { Noto_Sans_KR } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Luggy – The Airbnb for Luggage Storage | Book Storage Near Campus",
  description:
    "Store your luggage near campus for as low as 30,000 KRW/month. Connect with verified hosts within 500m using Luggy. Secure booking, escrow payment, KYC verification.",
  keywords:
    "luggage storage, student storage, campus storage, storage booking, verified hosts, escrow payment, KYC verification",
  authors: [{ name: "Luggy Team" }],
  creator: "Luggy",
  publisher: "Luggy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luggy.app",
    siteName: "Luggy - Luggage Storage",
    title: "Luggy – Store Your Luggage Near Campus",
    description:
      "Find verified storage hosts within 500m of campus. Secure booking with escrow payment and KYC verification. Starting at 30,000 KRW/month.",
    images: [
      {
        url: "https://luggy.app/images/og-luggy.jpeg",
        width: 1200,
        height: 630,
        alt: "Luggy - Connect with verified storage hosts near campus",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luggy – Find Storage Near Campus",
    description:
      "Store your luggage securely with verified hosts within 500m. Fast booking, escrow payment, transparent pricing.",
    images: ["https://luggy.app/images/og-luggy.jpeg"],
    creator: "@luggy_app",
    site: "@luggy_app",
  },
  alternates: {
    canonical: "https://luggy.app",
  },
  category: "Technology",
  classification: "Sharing Economy",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  generator: "Next.js",
  applicationName: "Luggy - Luggage Storage",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${notoSansKR.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geist-ui/core@latest/dist/geist-ui.css" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Software Application JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Luggy - Luggage Storage",
              description:
                "Luggy lets students find verified storage hosts near campus for their luggage. Secure booking with escrow payment and KYC verification.",
              url: "https://luggy.app",
              applicationCategory: "StudentApplication",
              operatingSystem: "Windows, macOS, Linux",
              offers: {
                "@type": "Offer",
                price: "30000",
                priceCurrency: "KRW",
              },
              author: {
                "@type": "Organization",
                name: "Luggy",
                url: "https://luggy.app",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                ratingCount: "1500",
              },
              featureList: [
                "Secure luggage storage near campus",
                "Verified hosts within 500m",
                "Escrow payment for security",
                "KYC verification process",
                "Transparent pricing",
              ],
              audience: {
                "@type": "Audience",
                audienceType: "Students, travelers",
              },
            }),
          }}
        />

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I book storage on Luggy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Simply sign up on the Luggy website, find a verified host near your campus, and book your storage space using our secure escrow payment system.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a minimum booking period?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, the minimum booking period is one month. You can cancel at any time with a week's notice.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens if I lose my luggage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Luggy provides insurance coverage for lost or damaged luggage. Please contact us immediately if you experience any issues.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I find verified hosts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Luggy has a built-in verification system for hosts. You can filter hosts by verified status and read reviews from other students.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a limit to the size of luggage I can store?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most hosts can accommodate standard luggage sizes. Please check with the host for specific size limits before booking.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I store multiple pieces of luggage?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can store multiple pieces of luggage. Please contact the host to discuss pricing and availability for additional storage.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Video Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "Luggy - Secure Luggage Storage Near Campus",
              description:
                "Discover how Luggy connects students with verified hosts for secure luggage storage near campus. Learn about our escrow payment system and KYC verification process.",
              thumbnailUrl: "https://luggy.app/images/save-thumbnail.jpeg",
              uploadDate: "2024-12-01",
              duration: "PT50S",
              contentUrl: "/images/luggy-storage-demo.mp4",
              embedUrl: "https://luggy.app",
              publisher: {
                "@type": "Organization",
                name: "Luggy",
                logo: {
                  "@type": "ImageObject",
                  url: "https://luggy.app/android-chrome-512x512.png",
                },
              },
              keywords:
                "luggage storage, student storage, campus storage, secure booking, escrow payment, KYC verification",
              category: "Technology",
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
