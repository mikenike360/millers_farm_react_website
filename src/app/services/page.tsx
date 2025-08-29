"use client";

import React from 'react';
import Script from 'next/script';
import { 
  CheckCircleIcon, 
  HeartIcon, 
  ShieldCheckIcon,
  BuildingOffice2Icon,
  StarIcon,
  SparklesIcon,
  PhoneIcon,
  CalendarIcon,
  HomeIcon,
  FireIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import Button from "@/components/Button";
import Card from "@/components/Card";
import { FeatureCard } from "@/components/Card";

const servicesData = [
  {
    title: '10 Acres of Lawn & Garden',
    description: 'Enjoy open lawn and garden areas with beautiful views of the San Juan Islands.',
    icon: HomeIcon
  },
  {
    title: 'Red Barn',
    description: 'A 24 x 30 barn featuring an indoor/outdoor bar area, refrigerator, woodstove, and sliding doors to the back field.',
    icon: BuildingOffice2Icon
  },
  {
    title: 'Wedding Ceremony Platform',
    description: 'A dedicated platform with a pergola that is perfect for your wedding ceremony.',
    icon: HeartIcon
  },
  {
    title: 'Fire Pit & S\'mores Station',
    description: 'Gather around our fire pit and enjoy a cozy s\'mores station with your guests.',
    icon: FireIcon
  },
  {
    title: 'Games & Amenities',
    description: 'Includes a horseshoe pit, yard games, portable toilets, banquet tables, punch bowls, water, and electricity.',
    icon: CheckCircleIcon
  },
  {
    title: 'On-Site Assistance',
    description: 'Venue owner on site for help and questions, with an optional wedding day coordinator available for an additional fee.',
    icon: UsersIcon
  },
  {
    title: 'Camping Option',
    description: 'Camping is available (extra charges apply and limited to 15-20 people).',
    icon: StarIcon
  },
  {
    title: 'Special Features',
    description: 'Our venue offers exclusive features such as customizable lighting, premium sound systems, and on-site catering coordination.',
    icon: SparklesIcon
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            We can accommodate up to 200 guests for your next wedding or event. Our venue features wide-open spaces
            perfect for food trucks, dance floors, lawn games, and dining.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={PhoneIcon}
              iconPosition="left"
            >
              Get in Touch
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="lg"
              icon={CalendarIcon}
              iconPosition="left"
            >
              Reserve Your Date
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6">
              <CheckCircleIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Venue <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a perfect event, from beautiful outdoor spaces to essential amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <FeatureCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                iconSize={64}
                className="group hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Weddings Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 border border-white/20">
              <HeartIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Wedding <span className="gradient-text">Services</span>
            </h2>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3">Complete Wedding Package</h3>
                <p className="text-base text-white/90 leading-relaxed mb-3">
                  A deposit is required to hold your wedding date and the final payment is due 30 days prior to your wedding. 
                  This includes Friday set-up with a two-hour rehearsal, all day Saturday, and cleanup by noon on Sunday.
                </p>
                <p className="text-base text-white/90 leading-relaxed">
                  We can coordinate any of your rental needs, such as tables, chairs, linens, or tents. Guests provide all 
                  food and beverages. We work with excellent caterers and can coordinate food and beverages if needed. 
                  Food trucks are also a popular choice.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h4 className="text-lg font-bold mb-3">What&apos;s Included</h4>
                  <ul className="text-left space-y-2 text-white/90">
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                      Friday set-up & rehearsal
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                      All day Saturday access
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                      Sunday cleanup until noon
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
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
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-white/30 text-white hover:text-white"
            >
              View Recommended Vendors
            </Button>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Important <span className="gradient-text">Policies</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please review our policies to ensure a smooth and successful event
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              variant="elevated"
              size="lg"
              icon={BuildingOffice2Icon}
              iconColor="text-primary-600"
              iconSize={64}
              className="group hover:transform hover:-translate-y-2"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">Alcohol Policy</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Champagne, beer, and wine are permitted. We require a banquet permit from the Department of Licensing 
                and a licensed bartender.
              </p>
              <a
                href="https://lcb.wa.gov/licensing/order-banquet-permits-online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-sm rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500"
              >
                Get Permit
              </a>
            </Card>

            <Card
              variant="elevated"
              size="lg"
              icon={ShieldCheckIcon}
              iconColor="text-primary-600"
              iconSize={64}
              className="group hover:transform hover:-translate-y-2"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">Insurance</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Event insurance must also be provided and is easily obtained from your homeowners insurance provider 
                or through Wedsafe.
              </p>
              <a
                href="https://www.wedsafe.com/Pages/home.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-sm rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500"
              >
                Get Insurance
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Let us know if you have any other questions or would like to schedule a tour!
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
              Schedule Tour
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
