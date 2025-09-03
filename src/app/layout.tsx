// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Inter } from "next/font/google";
import "./styles/globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const imageURL = "/og.jpg";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${inter.variable}`}
    >
      <head>
        {/* Favicon Configuration */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Enhanced Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Miller's Hill Farm",
              "alternateName": "Miller's Hill Farm Wedding Venue",
              "image": [
                "https://millersfarmislandweddings.com/og.jpg",
                "https://millersfarmislandweddings.com/hero_bg.jpeg",
                "https://millersfarmislandweddings.com/millers_hill_farm_nighttime.jpg"
              ],
              "telephone": "1-360-739-9262",
              "email": "info@millershill.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2206 Tuttle Lane",
                "addressLocality": "Lummi Island",
                "addressRegion": "WA",
                "postalCode": "98262",
                "addressCountry": "US"
              },
              "url": "https://millersfarmislandweddings.com",
              "description": "Miller's Hill Farm is a premier wedding and event venue on Lummi Island in Washington state, featuring a converted barn, expansive lawn, and scenic water views of the San Juan Islands.",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "48.72159088961969",
                "longitude": "-122.69856615392804"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "$$",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Cash, Credit Card, Check",
              "areaServed": ["Lummi Island", "Bellingham", "Seattle", "Vancouver BC"],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "48.72159088961969",
                  "longitude": "-122.69856615392804"
                },
                "geoRadius": "100000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Wedding & Event Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Wedding Venue Rental",
                      "description": "Complete wedding venue package including barn, lawn, and ceremony platform"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Event Venue Rental",
                      "description": "Corporate events, parties, and special occasions"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.facebook.com/millershillfarm",
                "https://www.instagram.com/millershillfarm"
              ]
            }),
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Miller's Hill Farm",
              "url": "https://millersfarmislandweddings.com",
              "logo": "https://millersfarmislandweddings.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "1-360-739-9262",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "English"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2206 Tuttle Lane",
                "addressLocality": "Lummi Island",
                "addressRegion": "WA",
                "postalCode": "98262",
                "addressCountry": "US"
              }
            }),
          }}
        />
        
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Miller's Hill Farm",
              "url": "https://millersfarmislandweddings.com",
              "description": "Premier wedding and event venue on Lummi Island, Washington",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://millersfarmislandweddings.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Miller's Hill Farm - Premier Wedding & Event Venue | Lummi Island, WA",
    template: "%s | Miller's Hill Farm"
  },
  description: "Miller's Hill Farm is a stunning wedding and event venue on Lummi Island, Washington. Featuring a converted barn, expansive lawn, and breathtaking San Juan Islands views. Perfect for weddings, corporate events, and special celebrations.",
  keywords: [
    "wedding venue",
    "event venue", 
    "Lummi Island",
    "San Juan Islands",
    "Washington wedding venue",
    "farm venue",
    "barn wedding",
    "outdoor wedding",
    "destination wedding",
    "corporate events",
    "special occasions",
    "wedding photography",
    "ceremony venue",
    "reception venue",
    "Pacific Northwest weddings"
  ],
  authors: [{ name: "Miller's Hill Farm" }],
  creator: "Miller's Hill Farm",
  publisher: "Miller's Hill Farm",
  metadataBase: new URL('https://millershill.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://millershill.com",
    title: "Miller's Hill Farm - Premier Wedding & Event Venue | Lummi Island, WA",
    description: "Miller's Hill Farm is a stunning wedding and event venue on Lummi Island, Washington. Featuring a converted barn, expansive lawn, and breathtaking San Juan Islands views. Perfect for weddings, corporate events, and special celebrations.",
    siteName: "Miller's Hill Farm",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Miller's Hill Farm Wedding & Event Venue - Lummi Island, Washington"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Miller's Hill Farm - Premier Wedding & Event Venue | Lummi Island, WA",
    description: "Miller's Hill Farm is a stunning wedding and event venue on Lummi Island, Washington. Featuring a converted barn, expansive lawn, and breathtaking San Juan Islands views.",
    images: ["/og.jpg"]
  },
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
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
  alternates: {
    canonical: "https://millershill.com",
  },
  icons: {
    icon: "/favicon.ico"
  },
  category: "Wedding & Event Venue",
  classification: "Business",
  other: {
    "geo.region": "US-WA",
    "geo.placename": "Lummi Island",
    "geo.position": "48.72159088961969;-122.69856615392804",
    "ICBM": "48.72159088961969, -122.69856615392804"
  }
}

