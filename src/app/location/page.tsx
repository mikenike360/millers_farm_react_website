"use client";

import React from 'react';
import Script from 'next/script';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  TruckIcon,
  GlobeAltIcon,
  CalendarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Button from "@/components/Button";
import Card from "@/components/Card";

const LocationPage: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Miller's Farm Island Weddings",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2206 Tuttle Lane",
      "addressLocality": "Lummi Island",
      "addressRegion": "WA",
      "postalCode": "98262",
      "addressCountry": "USA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.72159088961969",
      "longitude": "-122.69856615392804"
    },
    "url": "https://millersfarmislandweddings.com/location",
    "telephone": "+1-360-739-9262"
  };

  const locationInfo = [
    {
      icon: MapPinIcon,
      title: "Address",
      value: "2206 Tuttle Lane, Lummi Island, WA 98262",
      color: "text-primary-600"
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      value: "1-360-739-9262",
      href: "tel:1-360-739-9262",
      color: "text-secondary-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      value: "info@millersfarmislandweddings.com",
      href: "mailto:info@millersfarmislandweddings.com",
      color: "text-accent-600"
    },
    {
      icon: ClockIcon,
      title: "Business Hours",
      value: "Mon–Fri: 8:30am – 5pm | Sat: 9am – 12pm",
      color: "text-neutral-600"
    }
  ];

  const travelInfo = [
    {
              icon: GlobeAltIcon,
      title: "Ferry Access",
      description: "Take the Lummi Island ferry from Gooseberry Point (Bellingham) to Lummi Island. The ferry runs every 20-30 minutes and takes about 10 minutes.",
      tips: ["Check ferry schedule in advance", "Arrive 15 minutes early", "Vehicle reservations recommended"]
    },
    {
              icon: TruckIcon,
      title: "Driving Directions",
      description: "From the ferry landing, follow Lummi Shore Road for about 2 miles, then turn right onto Tuttle Lane. We're located at the end of the road.",
      tips: ["GPS coordinates: 48.7216° N, 122.6986° W", "Allow extra time for ferry crossing", "Consider carpooling"]
    }
  ];

  return (
    <>
      {/* JSON‑LD Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-12 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                <MapPinIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
              Our <span className="gradient-text">Location</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Welcome to Miller&apos;s Farm Island Weddings! Our beautiful venue is located on Lummi Island, Washington,
              offering the perfect blend of island charm and easy accessibility.
            </p>
          </div>
        </section>

        {/* Location Information */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                Contact <span className="gradient-text">Information</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get in touch with us and find your way to our beautiful venue
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locationInfo.map((info, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  size="md"
                  icon={info.icon}
                  iconColor={info.color}
                  iconSize={16}
                  className="text-center group hover:transform hover:-translate-y-2"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                  {info.href ? (
                    <a 
                      href={info.href} 
                      className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.value}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                Find Our <span className="gradient-text">Venue</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Interactive map and detailed directions to help you plan your visit
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=2206+Tuttle+Lane,+Lummi+Island,+WA+98262&output=embed"
                className="w-full h-80"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Miller's Farm Location Map"
              />
            </div>
            
            <div className="text-center mt-8">
              <Button
                href="https://maps.google.com/?q=2206+Tuttle+Lane,+Lummi+Island,+WA+98262"
                variant="outline"
                size="lg"
                icon={MapPinIcon}
                iconPosition="left"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </section>

        {/* Travel Information */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                Getting <span className="gradient-text">Here</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about traveling to our venue
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {travelInfo.map((info, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  size="lg"
                  icon={info.icon}
                  iconColor="text-primary-600"
                  iconSize={16}
                  className="group hover:transform hover:-translate-y-2"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{info.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Travel Tips:</h4>
                    <ul className="space-y-1">
                      {info.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Island Information */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              About <span className="gradient-text">Lummi Island</span>
            </h2>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Lummi Island is a hidden gem in the San Juan Islands, offering stunning natural beauty, 
              peaceful surroundings, and easy access from the mainland. Our venue combines the island&apos;s 
              rustic charm with modern amenities, creating the perfect setting for your special day.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Natural Beauty</h3>
                <p className="text-white/90">Breathtaking views of the San Juan Islands and surrounding waters</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Peaceful Setting</h3>
                <p className="text-white/90">Tranquil island atmosphere perfect for intimate celebrations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3">Easy Access</h3>
                <p className="text-white/90">Just a 10-minute ferry ride from Bellingham, WA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              Ready to <span className="gradient-text">Visit</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Schedule a tour of our beautiful venue and see for yourself why Miller&apos;s Hill Farm
              is the perfect place for your special event
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                href="/reserve"
                variant="primary"
                size="xl"
                icon={CalendarIcon}
                iconPosition="left"
              >
                Schedule a Tour
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="xl"
                icon={HeartIcon}
                iconPosition="left"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LocationPage;
