"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [theme, setTheme] = useState("valentine");

  const toggleTheme = () => {
    const newTheme = theme === "valentine" ? "synthwave" : "valentine";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 shadow-lg bg-gradient-to-r from-primary to-secondary text-primary-content 
                    backdrop-blur-md bg-opacity-80 transition-colors duration-300 py-0">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left Section: Mobile Hamburger and Desktop Logo */}
        <div className="flex items-center">
          {/* Mobile: Hamburger icon (visible on small screens only) */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 ease-in-out hover:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </label>
            {/* Mobile Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/reserve">Reserve</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/vendors">Vendors</Link>
              </li>
              <li>
                <Link href="/history">History</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/* Desktop: Logo on left (visible on md and up) */}
          <Link href="/" className="hidden md:flex items-center gap-2 ml-2 py-0">
            <Image
              src="/logo.png"
              alt="Miller's Farm Logo"
              width={100}
              height={100}
              className="object-contain hover:scale-105 transition-transform duration-300 md:w-32"
              priority
            />
          </Link>
        </div>

        {/* Center Section: Mobile Logo or Desktop Navigation Links */}
        <div className="flex-1 flex justify-center">
          {/* Mobile: Centered Logo (visible only on small screens) */}
          <Link href="/" className="block md:hidden">
            <Image
              src="/logo.png"
              alt="Miller's Farm Logo"
              width={100}
              height={100}
              className="object-contain hover:scale-105 transition-transform duration-300 w-24"
              priority
            />
          </Link>
          {/* Desktop: Navigation Links (visible on large screens) */}
          <div className="hidden lg:block">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/reserve">Reserve</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/vendors">Vendors</Link>
              </li>
              <li>
                <Link href="/history">History</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Theme Toggle */}
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle transition-transform hover:scale-110"
            aria-label="Toggle Theme"
          >
            {theme === "valentine" ? (
              /* Dark icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M160 256c0 53 43 96 96 96s96-43 96-96-43-96-96-96-96 43-96 96zM464 256c0 114.87-93.13 208-208 208a207.44 207.44 0 01-104-28.31c-6.36-3.57-6.1-12.96.46-15.36A128 128 0 00224 112c0-7.07-3.72-13.61-9.67-17.3-6.68-4.1-15.3-1.79-19.94 4.92A207.65 207.65 0 00128 256c0 114.87 93.13 208 208 208s208-93.13 208-208c0-24.88-4.36-48.69-12.41-70.93-2.66-7.19-10.66-10.59-17.73-7.53C493.42 163.16 464 206.67 464 256z" />
              </svg>
            ) : (
              /* Light icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M256 48a23.94 23.94 0 01-24-24V24a24 24 0 0148 0v.05a23.94 23.94 0 01-24 23.95zM104.97 95.03a24 24 0 01-33.94-.18l-.21-.22a24 24 0 01.18-33.94l.22-.21a24 24 0 0133.94.18l.21.22a24 24 0 01-.18 33.94zM64 232H24a24 24 0 010-48h40a24 24 0 010 48zm312 0h40a24 24 0 010 48h-40a24 24 0 010-48zm75.03-136.97l.22.21a24 24 0 01.18 33.94l-.21.22a24 24 0 01-33.94.18l-.22-.21a24 24 0 01-.18-33.94l.21-.22a24 24 0 0133.94-.18zM256 464a23.94 23.94 0 01-24 24h-.05a24 24 0 010-48h.05a23.94 23.94 0 0124 24zM95.03 407.03a24 24 0 01.18 33.94l-.21.22a24 24 0 01-33.94.18l-.22-.21a24 24 0 01-.18-33.94l.21-.22a24 24 0 0133.94-.18zM448 280a24 24 0 01-24 24H392a24 24 0 010-48h32a24 24 0 0124 24zm-368 0a24 24 0 01-24 24H24a24 24 0 010-48h32a24 24 0 0124 24zm315.03 127.03l.22.21a24 24 0 01.18 33.94l-.21.22a24 24 0 01-33.94.18l-.22-.21a24 24 0 01-.18-33.94l.21-.22a24 24 0 0133.94-.18z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
