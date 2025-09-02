"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out py-0 bg-gradient-to-r from-primary-600/95 to-secondary-600/95 backdrop-blur-md shadow-soft"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left Section: Mobile Hamburger and Desktop Logo */}
        <div className="flex items-center">
          {/* Mobile: Hamburger icon */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-white/20 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transition-transform duration-300 ease-in-out hover:rotate-90 text-white"
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
            {/* Enhanced Mobile Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-4 shadow-soft bg-gray-900/95 backdrop-blur-md text-white rounded-2xl w-64 border border-gray-700/50"
            >
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/reserve", label: "Reserve" },
                { href: "/about", label: "About" },
                { href: "/gallery", label: "Gallery" },
                { href: "/vendors", label: "Vendors" },
                { href: "/history", label: "History" },
                { href: "/contact", label: "Contact" },
                { href: "/location", label: "Location" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href}
                    className="py-3 px-4 rounded-xl hover:bg-primary-600/20 hover:text-primary-400 transition-all duration-300 font-medium text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Desktop: Logo on left */}
          <Link href="/" className="hidden md:flex items-center ml-2 py-0 group">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/logo.png"
                alt="Miller's Farm Logo"
                width={120}
                height={120}
                className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center Section: Mobile Logo or Desktop Navigation Links */}
        <div className="flex-1 flex justify-center">
          {/* Mobile: Centered Logo */}
          <Link href="/" className="block md:hidden group">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/logo.png"
                alt="Miller's Farm Logo"
                width={80}
                height={80}
                className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop: Navigation Links */}
          <div className="hidden lg:block">
            <ul className="menu menu-horizontal px-1 space-x-2">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/reserve", label: "Reserve" },
                { href: "/about", label: "About" },
                { href: "/gallery", label: "Gallery" },
                { href: "/vendors", label: "Vendors" },
                { href: "/history", label: "History" },
                { href: "/contact", label: "Contact" },
                { href: "/location", label: "Location" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href}
                    className="py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-white hover:text-white hover:bg-white/20"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section: Theme Toggle */}
        <div className="flex items-center">
          {/* Removed Theme Toggle Button */}
        </div>
      </div>
    </div>
  );
}
