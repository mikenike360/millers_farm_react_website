// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
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

const imageURL = "/og.jpg";
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Miller's Hill Farm",
              "image": imageURL,
              "telephone": "1-360-739-9262",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2206 Tuttle Lane",
                "addressLocality": "Lummi Island",
                "addressRegion": "WA",
                "postalCode": "98262",
                "addressCountry": "US"
              },
              "url": "https://www.millershillfarm.com",
              "description": "Miller's Hill Farm is a unique wedding and event venue on Lummi Island in Washington state, featuring a converted barn, expansive lawn, and scenic water views.",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "48.72159088961969",
                "longitude": "-122.69856615392804"
              }
            }),
          }}
        />
      </head>
      <body>
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

