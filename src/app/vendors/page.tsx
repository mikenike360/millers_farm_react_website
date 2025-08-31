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
  PhoneIcon,
  CheckCircleIcon,
  SparklesIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";

const vendors = [
  {
    title: "Cakes & Desserts",
    icon: CakeIcon,
    description: "Sweet treats to make your celebration memorable",
    color: "from-primary-500 to-secondary-500",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
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
    color: "from-secondary-500 to-primary-500",
    bgColor: "bg-secondary-50",
    borderColor: "border-secondary-200",
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
    color: "from-primary-600 to-secondary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
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
    color: "from-secondary-600 to-primary-600",
    bgColor: "bg-secondary-50",
    borderColor: "border-secondary-200",
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
    color: "from-primary-500 to-secondary-500",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
    items: [
      { name: "Pacific Party Canopies", link: "https://www.pacificpartycanopies.com/" },
    ],
  },
  {
    title: "Event Planners",
    icon: CalendarIcon,
    description: "Professional coordination to ensure your day is flawless",
    color: "from-secondary-500 to-primary-500",
    bgColor: "bg-secondary-50",
    borderColor: "border-secondary-200",
    items: [
      { name: "Ever After Events", link: "https://everaftereventsllc.com/" },
    ],
  },
  {
    title: "Accommodations",
    icon: HomeIcon,
    description: "Comfortable places for your guests to stay",
    color: "from-primary-600 to-secondary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
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
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="absolute inset-0 bg-[url('/hero_bg.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <StarIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 font-display">
            Recommended <span className="gradient-text">Vendors</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
            We&apos;ve partnered with the best local vendors to help make your special day perfect. 
            These trusted professionals have experience working at our venue and know how to create 
            unforgettable experiences.
          </p>
          
          {/* Vendor Image */}
          <div className="flex justify-center mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/vendor.png"
                alt="Vendor"
                width={300}
                height={300}
                className="relative w-72 h-auto object-contain max-w-2xl rounded-3xl shadow-soft transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={PhoneIcon}
              iconPosition="left"
              className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Recommendations
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={HeartIcon}
              iconPosition="left"
              className="border-2 hover:bg-primary-50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Book Your Date
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Trusted Vendors</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Successful Events</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-600 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
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
            {vendors.map(({ title, icon: Icon, description, color, bgColor, borderColor, items }) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-3xl ${bgColor} border-2 ${borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                {/* Icon Header */}
                <div className={`p-6 bg-gradient-to-br ${color} text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-12 h-12 text-white" />
                    <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {items.length} vendors
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{description}</p>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {items.map(({ name, link }) => (
                      <li key={name}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-primary-600 transition-all duration-300 hover:underline flex items-center group/link p-2 rounded-lg hover:bg-white/50"
                        >
                          <span className={`w-3 h-3 bg-gradient-to-r ${color} rounded-full mr-3 group-hover/link:scale-150 transition-transform duration-300`}></span>
                          <span className="font-medium">{name}</span>
                          <svg className="w-5 h-5 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Vendors */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero_bg.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Why Choose Our <span className="text-yellow-200">Vendors</span>?
          </h2>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-12">
            We&apos;ve built relationships with these professionals over years of successful events. 
            They understand our venue, our standards, and how to create magical moments.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Quality</h3>
              <p className="text-white/90 leading-relaxed">Each vendor has demonstrated excellence at our venue with consistent results and satisfied clients</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Trusted Relationships</h3>
              <p className="text-white/90 leading-relaxed">Built on years of successful collaborations and mutual understanding of our venue's unique character</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Venue Experience</h3>
              <p className="text-white/90 leading-relaxed">They know our space intimately and understand how to maximize its beauty for your special day</p>
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
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={PhoneIcon}
              iconPosition="left"
              className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Contact Us
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
              className="border-2 hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300"
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
