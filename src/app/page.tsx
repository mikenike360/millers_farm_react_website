"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Carousel from "@/components/Carousel";


// This component displays the background with a crossfade effect.
// It maintains a "base" image that's always visible and an overlay
// image that fades in when the background should change.
const CrossfadeBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  // The image currently set as the background.
  const [baseImage, setBaseImage] = useState(imageUrl);
  // The new image that will be faded in.
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  // Whether the overlay should be visible (triggering the fade).
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (imageUrl !== baseImage) {
      // Start fade by setting the overlay image.
      setOverlayImage(imageUrl);
      setShowOverlay(true);
      // After the fade duration (1s), update the base image
      // and hide the overlay.
      const timer = setTimeout(() => {
        setBaseImage(imageUrl);
        setShowOverlay(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imageUrl, baseImage]);

  return (
    <div className="absolute inset-0">
      {/* Base image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${baseImage}')` }}
      />
      {/* Overlay fades in when needed */}
      {showOverlay && overlayImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ backgroundImage: `url('${overlayImage}')`, opacity: 1 }}
        />
      )}
    </div>
  );
};

export default function Home() {
  const [reservationType, setReservationType] = useState("Wedding");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  // Array of background images.
  const images = [
    "hero_bg.jpeg",
    "og.jpg",
    "hero_4.jpg",
    "millers_hill_farm_nighttime.jpg",
  ];

  // Current image index.
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create a ref for the auto-switch timer.
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the auto-switch timer.
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
  };

  // Start the timer when the component mounts.
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handler for previous image.
  const handlePrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    startTimer();
  };

  // Handler for next image.
  const handleNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % images.length
    );
    startTimer();
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="h-screen md:h-[700px] relative overflow-hidden">
        {/* Crossfade background */}
        <CrossfadeBackground imageUrl={images[currentImageIndex]} />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center z-20 space-x-4">
          <button
            onClick={handlePrev}
            className="bg-base-300 p-3 rounded-full hover:bg-opacity-60 transition"
          >
            <FaChevronLeft className="text-black" />
          </button>
          <button
            onClick={handleNext}
            className="bg-base-300 p-3 rounded-full hover:bg-opacity-60 transition"
          >
            <FaChevronRight className="text-black" />
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 h-full">
          <h1 className="text-5xl font-bold font-serif mb-5 drop-shadow-lg">
            Welcome to Miller&apos;s Hill Farm!
          </h1>
          <p className="text-md mb-5 font-bold font-serif leading-relaxed drop-shadow-lg max-w-lg mx-auto">
            Where rustic charm meets timeless elegance. Celebrate life’s most
            cherished moments amidst rolling hills and serene waterfront views.
          </p>

          {/* Booking Form */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div className="bg-base-300 text-black rounded-lg shadow-md p-3 flex items-center gap-2 w-fit">
                <FaCalendarAlt className="text-base-content" />
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  className="appearance-none outline-none bg-base-300 placeholder-base-content text-base-content px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-36"
                  placeholderText="Check-In"
                />
              </div>
              <div className="bg-base-300 text-base-content rounded-lg shadow-md p-3 flex items-center gap-2 w-fit">
                <FaCalendarAlt className="text-base-content" />
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  className="appearance-none outline-none bg-base-300 placeholder-base-content text-base-content px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-36"
                  placeholderText="Check-Out"
                />
              </div>
              <div className="bg-base-300 text-base-content rounded-lg shadow-md p-3 flex items-center gap-2 w-fit relative">
                <FaUsers />
                <select
                  value={reservationType}
                  onChange={(e) => setReservationType(e.target.value)}
                  className="appearance-none outline-none bg-base-300 px-3 py-2 text-base-content rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-48"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement Party">Engagement Party</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Anniversary Celebration">
                    Anniversary Celebration
                  </option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Family Reunion">Family Reunion</option>
                  <option value="Graduation Party">Graduation Party</option>
                  <option value="Live Music Event">Live Music Event</option>
                  <option value="Fundraiser">Fundraiser</option>
                  <option value="Private Dinner">Private Dinner</option>
                  <option value="Food Tasting">Food Tasting</option>
                  <option value="Art Exhibition">Art Exhibition</option>
                  <option value="Other">Other</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-base-content">
                  ▼
                </span>
              </div>
            </div>
            <Link
              href={{
                pathname: "/reserve",
                query: {
                  checkIn: checkIn ? checkIn.toISOString().split("T")[0] : "",
                  checkOut: checkOut ? checkOut.toISOString().split("T")[0] : "",
                  eventType: reservationType,
                },
              }}
            >
              <button className="mx-auto bg-button bg-base-300 hover:bg-base-200 text-base-content px-6 py-2 rounded-lg flex items-center shadow-md">
                <FaSearch className="mr-2" /> Book Now!
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Section (Testimonials) */}
      <section className="bg-base-200 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Couples Say
        </h2>
        <div className="max-w-4xl mx-auto">
          <Carousel />
        </div>
      </section>



      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-400 to-orange-200 text-gray-900 py-10 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="mb-6">
            Schedule a tour, request more information, or reserve your date to
            make your dream wedding a reality.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/contact">
              <button className="btn btn-base-300">Contact Us</button>
            </a>
            <a href="/reserve">
              <button className="btn btn-base-300">Reserve Now</button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-base-200 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">View Our Services!</h2>
        <p className="mb-6 text-center">
          Our venue features wide-open spaces perfect for food trucks,
          dance floors, lawn games, and dining.
        </p>
        <div className="flex justify-center">
          <Link href="/services">
            <button className="btn bg-base-content text-base-100">
              See Our Services
            </button>
          </Link>
        </div>
      </section>


      {/* Gallery Preview Section */}
      <section className="bg-gradient-to-r from-red-400 to-orange-200 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Gallery Preview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <img
            src="/gallery-image1.jpg"
            alt="Gallery Image 1"
            className="w-full h-48 object-cover rounded transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
          />
          <img
            src="/gallery-image3.jpg"
            alt="Gallery Image 3"
            className="w-full h-48 object-cover rounded transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
          />
          <img
            src="/gallery-image2.jpg"
            alt="Gallery Image 2"
            className="w-full h-48 object-cover rounded transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
          />
          {/* Add more images if you like */}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/gallery">
            <button className="btn btn-base-300">
              View Full Gallery
            </button>
          </Link>
        </div>
      </section>






    </div>
  );
}
