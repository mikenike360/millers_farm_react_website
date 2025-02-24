"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark  " : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
<div className="navbar fixed top-0 left-0 w-full z-50 shadow-lg 
                bg-gradient-to-r from-red-400 to-orange-200 text-primary-content 
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
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52 text-bold"
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
              <li>
                <Link href="/location">Location</Link>
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
            <ul className="menu menu-horizontal text-black text-bold px-1">
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
              <li>
                <Link href="/location">Location</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Theme Toggle */}
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle transition-transform hover:scale-110 text-black"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              /* Dark icon */
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"  // You can adjust this size as needed
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
            ) : (
              /* Light icon */
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"  // Adjust this class as needed
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
