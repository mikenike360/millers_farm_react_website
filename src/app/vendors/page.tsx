"use client";

import React from "react";
import Image from "next/image";
import {
  CakeIcon,
  FireIcon,
  BuildingStorefrontIcon,
  CameraIcon,
  HomeIcon,
  TruckIcon,
  CalendarIcon,
  StarIcon,
  HeartIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";

const vendors = [
  {
    title: "Cakes & Desserts",
    icon: CakeIcon,
    description: "Sweet treats to make your celebration memorable",
    items: [
      { name: "Antler Baking Co.", link: "https://www.antlerbakingcompany.com/" },
      { name: "Saltadena", link: "https://www.saltadena.com/" },
      { name: "Pure Bliss Desserts", link: "https://www.pureblissdesserts.com/" },
      { name: "Barb's Pies and Pastries", link: "https://www.barbspiesandpastries.com/" },
    ],
  },
  {
    title: "Catering",
    icon: FireIcon,
    description: "Delicious food to delight your guests",
    items: [
      { name: "Crave Catering", link: "https://www.cravecatering.com/" },
      { name: "Paella Works", link: "https://www.paellaworks.com/" },
      { name: "Gusto Wood Fire Pizza", link: "https://www.gustowoodfiredpizza.com/" },
      { name: "Back East Barbeque", link: "https://www.backeastbbq.com/" },
    ],
  },
  {
    title: "Florists",
    icon: BuildingStorefrontIcon,
    description: "Beautiful blooms to enhance your venue",
    items: [
      { name: "Full Bloom Farm", link: "https://www.fullbloomfarm.com/" },
      { name: "Triple Wren Farms", link: "https://www.triplewrenfarms.com/" },
      { name: "Pozie by Natalie", link: "https://www.poziebynatalie.com/" },
    ],
  },
  {
    title: "Photography",
    icon: CameraIcon,
    description: "Capture every precious moment of your special day",
    items: [
      { name: "Jagger Photography", link: "https://www.jaggerphotography.com/" },
      { name: "Jamie V Photography", link: "https://www.jamievphotography.com/" },
      { name: "Aleesha Wiest Photography", link: "https://www.aleeshawiestphotography.com/" },
      { name: "Breanna Plus Kevin", link: "https://www.breannapluskevin.com/" },
    ],
  },
  {
    title: "Rentals & Décor",
    icon: TruckIcon,
    description: "Everything you need to create your perfect setting",
    items: [
      { name: "Pacific Party Canopies", link: "https://www.pacificpartycanopies.com/" },
    ],
  },
  {
    title: "Event Planners",
    icon: CalendarIcon,
    description: "Professional coordination to ensure your day is flawless",
    items: [
      { name: "Ever After Events", link: "https://everaftereventsllc.com/" },
    ],
  },
  {
    title: "Accommodations",
    icon: HomeIcon,
    description: "Comfortable places for your guests to stay",
    items: [
      { name: "Stay and Sea Vacation", link: "https://www.stayandseavacations.com/" },
      { name: "Airbnb", link: "https://www.airbnb.com/" },
      { name: "VRBO", link: "https://www.vrbo.com/" },
      { name: "Silver Reef Casino", link: "https://www.silverreefcasino.com/" },
    ],
  },
];

const VendorsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
            Recommended <span className="gradient-text">Vendors</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            We&apos;ve partnered with the best local vendors to help make your special day perfect. 
            These trusted professionals have experience working at our venue and know how to create 
            unforgettable experiences.
          </p>
          
          {/* Vendor Image */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/vendor.png"
                alt="Vendor"
                width={256}
                height={256}
                className="relative w-64 h-auto object-contain max-w-2xl rounded-2xl shadow-soft transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={PhoneIcon}
              iconPosition="left"
            >
              Get Recommendations
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="lg"
              icon={HeartIcon}
              iconPosition="left"
            >
              Book Your Date
            </Button>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Trusted <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each vendor has been carefully selected for their quality, reliability, and experience 
              working at our venue
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map(({ title, icon: Icon, description, items }) => (
              <Card
                key={title}
                variant="elevated"
                size="lg"
                icon={Icon}
                iconColor="text-primary-600"
                iconSize={16}
                className="group hover:transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    Recommended Vendors:
                  </h4>
                  <ul className="space-y-2">
                    {items.map(({ name, link }) => (
                      <li key={name}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800 transition-colors duration-300 hover:underline flex items-center group/link"
                        >
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover/link:scale-150 transition-transform duration-300"></span>
                          {name}
                          <svg className="w-4 h-4 ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Vendors */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Why Choose Our <span className="gradient-text">Vendors</span>?
          </h2>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-12">
            We&apos;ve built relationships with these professionals over years of successful events. 
            They understand our venue, our standards, and how to create magical moments.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <StarIcon className="w-8 h-8 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-3">Proven Quality</h3>
              <p className="text-white/90">Each vendor has demonstrated excellence at our venue</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <HeartIcon className="w-8 h-8 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-3">Trusted Relationships</h3>
              <p className="text-white/90">Built on years of successful collaborations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <CalendarIcon className="w-8 h-8 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-3">Venue Experience</h3>
              <p className="text-white/90">They know our space and how to make it shine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Let us help you connect with the perfect vendors for your special day
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={PhoneIcon}
              iconPosition="left"
            >
              Contact Us
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
            >
              Book Your Date
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VendorsPage;
