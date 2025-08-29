// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Inter } from "next/font/google";
import "./styles/globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
              "email": "info@millershillfarm.com",
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

export const metadata = {
  title: "Miller's Hill Farm | Wedding & Event Venue on Lummi Island, WA",
  description:
    "Nestled on Lummi Island in the San Juan Islands of the Pacific Northwest, Miller's Hill Farm offers a unique venue for weddings and events. Enjoy a converted barn with an indoor/outdoor bar, 10 acres of scenic lawn, a pergola for ceremonies, fire pit, yard games, and more. Contact us for booking details!",
  openGraph: {
    title: "Miller's Hill Farm | Wedding & Event Venue on Lummi Island, WA",
    description:
      "Nestled on Lummi Island in the San Juan Islands, Miller's Hill Farm features a converted barn, expansive lawn, and stunning water views—perfect for weddings and gatherings.",
    url: "https://millersfarmislandweddings.com/",
    images: [imageURL],
  },
  twitter: {
    card: "summary_large_image",
  },
};

