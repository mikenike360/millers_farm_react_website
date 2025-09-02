"use client";

import React from 'react';
import Script from 'next/script';
import { 
  CheckCircleIcon, 
  HeartIcon, 
  ShieldCheckIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  StarIcon,
  SparklesIcon,
  PhoneIcon,
  CalendarIcon,
  HomeIcon,
  FireIcon,
  UsersIcon,
  CameraIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { 
  GiBarn, 
  GiArchBridge, 
  GiCampfire, 
  GiDiceSixFacesFive, 
  GiPerson, 
  GiCampingTent, 
  GiSparkles
} from 'react-icons/gi';
import Button from "@/components/Button";
import Card from "@/components/Card";
import { FeatureCard } from "@/components/Card";

const servicesData = [
  {
    title: '10 Acres of Lawn & Garden',
    description: 'Enjoy open lawn and garden areas with beautiful views of the San Juan Islands.',
    icon: HomeIcon,
    color: 'from-primary-500 to-secondary-500',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200'
  },
  {
    title: 'Red Barn',
    description: 'A 24 x 30 barn featuring an indoor/outdoor bar area, refrigerator, woodstove, and sliding doors to the back field.',
    icon: GiBarn,
    color: 'from-secondary-500 to-primary-500',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200'
  },
  {
    title: 'Wedding Ceremony Platform',
    description: 'A dedicated platform with a pergola that is perfect for your wedding ceremony.',
    icon: GiArchBridge,
    color: 'from-primary-600 to-secondary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200'
  },
  {
    title: 'Fire Pit & S\'mores Station',
    description: 'Gather around our fire pit and enjoy a cozy s\'mores station with your guests.',
    icon: GiCampfire,
    color: 'from-secondary-600 to-primary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200'
  },
  {
    title: 'Games & Amenities',
    description: 'Includes a horseshoe pit, yard games, portable toilets, banquet tables, punch bowls, water, and electricity.',
    icon: GiDiceSixFacesFive,
    color: 'from-primary-500 to-secondary-500',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200'
  },
  {
    title: 'On-Site Assistance',
    description: 'Venue owner on site for help and questions, with an optional wedding day coordinator available for an additional fee.',
    icon: GiPerson,
    color: 'from-secondary-500 to-primary-500',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200'
  },
  {
    title: 'Camping Option',
    description: 'Camping is available (extra charges apply).',
    icon: GiCampingTent,
    color: 'from-primary-600 to-secondary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200'
  },
  {
    title: 'Special Features',
    description: 'Our venue offers exclusive features such as customizable lighting, premium sound systems, and on-site catering coordination.',
    icon: GiSparkles,
    color: 'from-secondary-600 to-primary-600',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200'
  },
  {
    title: 'Photography Opportunities',
    description: 'Multiple scenic backdrops including the barn, ceremony platform, gardens, and stunning San Juan Island views for your special photos.',
    icon: CameraIcon,
    color: 'from-primary-500 to-secondary-500',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200'
  },
];

const ServicesPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* SEO Structured Data */}
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Wedding & Event Venue Services",
            "description": "Comprehensive wedding and event venue services at Miller's Hill Farm on Lummi Island",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Miller's Hill Farm",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2206 Tuttle Lane",
                "addressLocality": "Lummi Island",
                "addressRegion": "WA",
                "postalCode": "98262",
                "addressCountry": "US"
              }
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "48.72159088961969",
                "longitude": "-122.69856615392804"
              },
              "geoRadius": "100000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Venue Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "10 Acres of Lawn & Garden",
                    "description": "Enjoy open lawn and garden areas with beautiful views of the San Juan Islands"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Red Barn Venue",
                    "description": "A 24 x 30 barn featuring an indoor/outdoor bar area, refrigerator, woodstove, and sliding doors"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Wedding Ceremony Platform",
                    "description": "A dedicated platform with a pergola that is perfect for your wedding ceremony"
                  }
                }
              ]
            }
          })
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="absolute inset-0 bg-[url('/hero_bg.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <SparklesIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 font-display">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
            We can accommodate up to 200 guests for your next wedding or event. Our venue features wide-open spaces
            perfect for food trucks, dance floors, lawn games, and dining.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={PhoneIcon}
              iconPosition="left"
              className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Get in Touch
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
              className="border-2 hover:bg-primary-50 transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Reserve Your Date
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
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600 font-medium">Guest Capacity</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10</div>
              <div className="text-gray-600 font-medium">Acres of Space</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
              <div className="text-gray-600 font-medium">Days Access</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-600 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">75+</div>
              <div className="text-gray-600 font-medium">Years of History</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl mb-6 shadow-lg">
              <CheckCircleIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Venue <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a perfect event, from beautiful outdoor spaces to essential amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl ${service.bgColor} border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col`}
              >
                {/* Icon Header */}
                <div className={`p-6 bg-gradient-to-br ${service.color} text-white flex-1 flex flex-col`}>
                  <div className="flex items-center justify-start mb-4">
                    <service.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed flex-1">{service.description}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weddings Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero_bg.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30">
              <HeartIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Wedding <span className="text-yellow-200">Services</span>
            </h2>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Complete Wedding Package</h3>
                <p className="text-lg text-white/90 leading-relaxed mb-4">
                  A deposit is required to hold your wedding date and the final payment is due 30 days prior to your wedding. 
                  This includes Friday set-up with a two-hour rehearsal, all day Saturday, and cleanup by noon on Sunday.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  We can coordinate any of your rental needs, such as tables, chairs, linens, or tents. Guests provide all 
                  food and beverages. We work with excellent caterers and can coordinate food and beverages if needed. 
                  Food trucks are also a popular choice.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h4 className="text-xl font-bold mb-4">What&apos;s Included</h4>
                  <ul className="text-left space-y-3 text-white/90">
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      Friday set-up & rehearsal
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      All day Saturday access
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      Sunday cleanup until noon
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      On-site assistance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              href="/vendors"
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-white/30 text-white hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              View Recommended Vendors
            </Button>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl mb-6 shadow-lg">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Important <span className="gradient-text">Policies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please review our policies to ensure a smooth and successful event
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6">
                <BuildingOffice2Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Alcohol Policy</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Champagne, beer, and wine are permitted. We require a banquet permit from the Department of Licensing 
                and a licensed bartender.
              </p>
              <a
                href="https://lcb.wa.gov/licensing/order-banquet-permits-online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-sm rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500 shadow-md hover:shadow-lg"
              >
                Get Permit
              </a>
            </div>

            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Insurance</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Event insurance must also be provided and is easily obtained from your homeowners insurance provider 
                or through Wedsafe.
              </p>
              <a
                href="https://www.wedsafe.com/Pages/home.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-sm rounded-xl border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500 shadow-md hover:shadow-lg"
              >
                Get Insurance
              </a>
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
            Let us know if you have any other questions or would like to schedule a tour!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={PhoneIcon}
              iconPosition="left"
              className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Contact Us
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
              className="border-2 hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Schedule Tour
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
