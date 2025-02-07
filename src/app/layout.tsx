// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Millers Farm Island Weddings",
  description: "Your dream wedding venue on a beautiful island",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="aqua" 
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      {/* If you want your entire site to use these custom fonts */}
      <body>
        {/* 
          <Navbar /> is fixed. 
          If you want the main content to appear below the navbar, 
          add a padding-top in your <main> or hero container. 
        */}
        <Navbar />
        <main className="pt-16"> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
