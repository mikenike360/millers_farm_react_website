"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; // Import Next.js Image component

export default function Navbar() {
  const [theme, setTheme] = useState("aqua");

  const toggleTheme = () => {
    const newTheme = theme === "aqua" ? "dark" : "aqua";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 shadow-lg bg-gradient-to-r from-primary to-secondary text-primary-content">
      {/* Left side: Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Miller's Farm Logo"
            width={180} // Adjust as needed
            height={180} // Adjust as needed
            className="h-auto w-auto object-contain" 
            priority // Ensures the logo loads fast
          />
          
        </Link>
      </div>

      {/* Center (Desktop Nav) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/" className="hover:text-secondary-content">Home</Link></li>
          <li><Link href="/about" className="hover:text-secondary-content">About</Link></li>
          <li><Link href="/gallery" className="hover:text-secondary-content">Gallery</Link></li>
          <li><Link href="/reserve" className="hover:text-secondary-content">Reserve</Link></li>
          <li><Link href="/contact" className="hover:text-secondary-content">Contact</Link></li>
        </ul>
      </div>

      {/* Right side */}
      <div className="navbar-end gap-2">
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle hidden md:inline-flex">
          {theme === "aqua" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 512 512">
              <path d="M160 256c0 53 43 96 96 96s96-43 96-96-43-96-96-96-96 43-96 96zM464 256c0 114.87-93.13 208-208 208a207.44 207.44 0 01-104-28.31c-6.36-3.57-6.1-12.96.46-15.36A128 128 0 00224 112c0-7.07-3.72-13.61-9.67-17.3-6.68-4.1-15.3-1.79-19.94 4.92A207.65 207.65 0 00128 256c0 114.87 93.13 208 208 208s208-93.13 208-208c0-24.88-4.36-48.69-12.41-70.93-2.66-7.19-10.66-10.59-17.73-7.53C493.42 163.16 464 206.67 464 256z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 512 512">
              <path d="M256 48a23.94 23.94 0 01-24-24V24a24 24 0 0148 0v.05a23.94 23.94 0 01-24 23.95zM104.97 95.03a24 24 0 01-33.94-.18l-.21-.22a24 24 0 01.18-33.94l.22-.21a24 24 0 0133.94.18l.21.22a24 24 0 01-.18 33.94zM64 232H24a24 24 0 010-48h40a24 24 0 010 48zm312 0h40a24 24 0 010 48h-40a24 24 0 010-48zm75.03-136.97l.22.21a24 24 0 01.18 33.94l-.21.22a24 24 0 01-33.94.18l-.22-.21a24 24 0 01-.18-33.94l.21-.22a24 24 0 0133.94-.18zM256 464a23.94 23.94 0 01-24 24h-.05a24 24 0 010-48h.05a23.94 23.94 0 0124 24zM95.03 407.03a24 24 0 01.18 33.94l-.21.22a24 24 0 01-33.94.18l-.22-.21a24 24 0 01-.18-33.94l.21-.22a24 24 0 0133.94-.18zM448 280a24 24 0 01-24 24H392a24 24 0 010-48h32a24 24 0 0124 24zm-368 0a24 24 0 01-24 24H24a24 24 0 010-48h32a24 24 0 0124 24zm315.03 127.03l.22.21a24 24 0 01.18 33.94l-.21.22a24 24 0 01-33.94.18l-.22-.21a24 24 0 01-.18-33.94l.21-.22a24 24 0 0133.94-.18z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
