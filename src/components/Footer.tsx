"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="Miller's Farm Logo"
                  width={60}
                  height={60}
                  className="rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-bold font-display">Miller&apos;s Hill Farm</h3>
                  <p className="text-sm text-gray-300">Wedding & Event Venue</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Where rustic charm meets timeless elegance. Create unforgettable memories in our beautiful venue.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 border border-white/20"
                >
                  <FaFacebookF className="text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 border border-white/20"
                >
                  <FaTwitter className="text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 border border-white/20"
                >
                  <FaInstagram className="text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "Services" },
                  { href: "/reserve", label: "Reserve" },
                  { href: "/about", label: "About" },
                  { href: "/gallery", label: "Gallery" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">More Info</h4>
              <ul className="space-y-3">
                {[
                  { href: "/vendors", label: "Vendors" },
                  { href: "/history", label: "History" },
                  { href: "/contact", label: "Contact" },
                  { href: "/location", label: "Location" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-primary-400" />
                  <span className="text-gray-300">1-360-739-9262</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary-400" />
                  <span className="text-gray-300">info@millershill.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-primary-400 mt-1" />
                  <div className="text-gray-300">
                    <p>2206 Tuttle Lane</p>
                    <p>Lummi Island, WA 98262</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Miller&apos;s Hill Farm. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>by VenomLabs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
