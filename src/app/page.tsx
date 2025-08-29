"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import Button from "@/components/Button";
import { FeatureCard } from "@/components/Card";

// Enhanced CrossfadeBackground component
const CrossfadeBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [baseImage, setBaseImage] = useState(imageUrl);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (imageUrl !== baseImage) {
      setOverlayImage(imageUrl);
      setShowOverlay(true);
      const timer = setTimeout(() => {
        setBaseImage(imageUrl);
        setShowOverlay(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imageUrl, baseImage]);

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[20s] ease-out"
        style={{ backgroundImage: `url('${baseImage}')` }}
      />
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

  const images = [
    "og.jpg",
    "hero_4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    startTimer();
  };

  const handleNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % images.length
    );
    startTimer();
  };

  const features = [
    {
      icon: FaHeart,
      title: "Weddings & Events",
      description: "Create unforgettable memories in our beautiful venue"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Lummi Island",
      description: "Stunning location in the heart of the San Juan Islands"
    },
    {
      icon: FaUsers,
      title: "Up to 200 Guests",
      description: "Perfect for intimate gatherings or grand celebrations"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section with Crossfade Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <CrossfadeBackground imageUrl={images[currentImageIndex]} />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold font-display mb-6 hero-text-white">
            Miller&apos;s Hill Farm
          </h1>
          <p className="text-lg md:text-xl font-serif mb-8 max-w-3xl mx-auto">
            A cherished family venue on Lummi Island, where rustic charm meets natural beauty. 
            Perfect for weddings, events, and celebrations that create lasting memories.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button
              href="/reserve"
              variant="gradient"
              size="xl"
              icon={FaCalendarAlt}
              iconPosition="left"
            >
              Book Your Dream Event
            </Button>
            <Button
              href="/gallery"
              variant="outline"
              size="xl"
              icon={FaSearch}
              iconPosition="left"
              className="border-white/30 text-white hover:bg-white hover:text-primary-600"
            >
              View Gallery
            </Button>
          </div>
        </div>

        {/* Slider Controls */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronLeft className="text-white" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div> */}
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Why Choose <span className="gradient-text">Miller&apos;s Hill Farm</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of natural beauty, historic charm, and modern amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="group hover:transform hover:-translate-y-2"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            What Our <span className="gradient-text">Couples</span> Say
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Hear from the happy couples who chose Miller&apos;s Hill Farm for their special day
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <Carousel />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Ready to Create <span className="gradient-text">Memories</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Let us help you plan the perfect event at our beautiful venue
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={FaPhone}
              iconPosition="left"
            >
              Get in Touch
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={FaCalendarAlt}
              iconPosition="left"
            >
              Reserve Your Date
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we provide everything you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FaHeart,
                title: "Weddings",
                description: "Beautiful ceremonies and receptions in our scenic venue"
              },
              {
                icon: FaUsers,
                title: "Corporate Events",
                description: "Professional meetings and team-building retreats"
              },
              {
                icon: FaCalendarAlt,
                title: "Special Occasions",
                description: "Birthdays, anniversaries, and family celebrations"
              }
            ].map((service, index) => (
              <FeatureCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="group hover:transform hover:-translate-y-2"
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              href="/services"
              variant="gradient"
              size="xl"
              icon={FaSearch}
              iconPosition="left"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Take a <span className="gradient-text">Look</span>
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Explore our beautiful venue through stunning photography
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {["gallery-image1.jpg", "gallery-image2.jpg", "gallery-image3.jpg"].map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 transform hover:-translate-y-4">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                <img
                  src={`/${image}`}
                  alt={`Gallery preview ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          
          <Button
            href="/gallery"
            variant="outline"
            size="lg"
            icon={FaSearch}
            iconPosition="left"
            className="border-white/30 text-white hover:bg-white hover:text-primary-600 bg-white/10 backdrop-blur-md"
          >
            View Full Gallery
          </Button>
        </div>
      </section>
    </main>
  );
}
