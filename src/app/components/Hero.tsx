"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Semi-transparent overlay on the background (optional) */}
      <div className="hero-overlay bg-opacity-50"></div>

      {/* Hero content */}
      <div className="hero-content text-center">
        {/* Solid box with text */}
        <div className="max-w-md bg-base-100 p-6 rounded shadow-lg text-base-content">
          <h1 className="text-5xl font-bold">Welcome to Millers Farm</h1>
          <p className="py-6">
            A breathtaking island venue for your dream wedding.
          </p>
          <button className="btn btn-primary">Book Your Wedding</button>
        </div>
      </div>
    </div>
  );
}
