"use client";

import React from "react";
import Image from "next/image";
import { 
  HeartIcon, 
  CalendarIcon, 
  MapPinIcon,
  PaperAirplaneIcon,
  HomeIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";



const HistoryPage: React.FC = () => {
  const timelineEvents = [
    {
      year: "1940s",
      title: "The Beginning",
      description: "Jack Miller purchases the land with a cabin upon returning to Lummi Island after completing his naval service during World War II.",
      image: "/JackLucille.jpg",
      imageAlt: "Jack and Lucille"
    },
    {
      year: "1947",
      title: "Marriage & Family",
      description: "Jack and Lucille were married and built a home where they raised their three children. Jack raised cattle and maintained a large, bountiful vegetable garden.",
      image: "/millers_retreat.jpg",
      imageAlt: "Miller's Retreat",
      showCabinLink: true
    },
    {
      year: "1970s",
      title: "Flying Dreams",
      description: "Jack fulfilled his dream of flying by creating an airstrip in the upper pasture and building a small hangar, which now serves as a gathering area for events.",
      image: "/hangar2.jpg",
      imageAlt: "Hangar"
    },
    {
      year: "2000s",
      title: "Wedding Venue",
      description: "After hosting family weddings and other events, inquiries from friends and neighbors led to the birth of Miller's Hill Farm, sharing this beautiful sanctuary with the public!",
      image: "/illuminating_the_dark.png",
      imageAlt: "Illuminating the Dark"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
            The Rich <span className="gradient-text">History</span> of Miller&apos;s Hill Farm
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A family legacy spanning over 75 years, from naval service to memorable weddings and events. 
            Discover the story behind our beloved venue.
          </p>
        </div>
      </section>



      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-display">
                A Family <span className="gradient-text">Legacy</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Miller&apos;s Hill Farm has been in our family for over 75 years. Our grandfather,
                Jack Miller, purchased the land with a cabin upon returning to Lummi
                Island after completing his naval service during World War II.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                It wasn&apos;t long after that he met our grandmother, eighteen-year-old Lucille Adema,
                from Clear Lake, Washington, and together they built a life and legacy that continues today.
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/hangar.jpg"
                alt="Historic Hangar"
                width={600}
                height={400}
                className="relative w-full h-auto object-cover rounded-2xl shadow-soft transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Our <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey through the decades of our family&apos;s story
            </p>
          </div>
          
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center px-2">
                        <span className="text-white font-bold text-lg">{event.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
                    {event.showCabinLink && (
                      <div className="text-center">
                        <a
                          href="https://stay-sea.hosted.ownerrez.com/millers-island-retreat-orp5b664f0x"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 shadow-soft hover:shadow-glow hover:scale-105 text-sm"
                        >
                          <HomeIcon className="w-4 h-4 mr-2" />
                          Rent Our Family Cabin
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={event.image}
                      alt={event.imageAlt}
                      width={600}
                      height={400}
                      className="relative w-full h-auto object-cover rounded-2xl shadow-soft transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Continuing the <span className="gradient-text">Legacy</span>
          </h2>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed mb-12">
            It has been a real pleasure hosting so many wonderful weddings and events here.
            The property holds many fond memories for our family, and we would love the
            opportunity to share this beautiful sanctuary with you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                              <HomeIcon className="w-10 h-10 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-3">Family Home</h3>
              <p className="text-white/90">Built with love and maintained with care for over 75 years</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                              <PaperAirplaneIcon className="w-10 h-10 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-3">Aviation Heritage</h3>
              <p className="text-white/90">Jack&apos;s flying dreams live on in our historic hangar</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                              <UsersIcon className="w-10 h-10 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-3">Community Gathering</h3>
              <p className="text-white/90">From family potlucks to beautiful weddings</p>
            </div>
          </div>
          
          <p className="text-lg text-white/90">
            Jack passed away in 1995, and Lucille passed away in 2015. We know they would both be very happy and proud
            of Miller&apos;s Hill Farm!
          </p>
        </div>
      </section>

      {/* Final Image Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
            Today&apos;s <span className="gradient-text">Miller&apos;s Hill Farm</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            The beautiful venue that continues to create memories for generations to come
          </p>
          
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Image
              src="/barn_at_night.png"
              alt="Barn at Night"
              width={800}
              height={600}
              className="relative w-full h-auto object-cover rounded-2xl shadow-soft transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            Be Part of Our <span className="gradient-text">Story</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Create your own memories at this historic venue that has been part of our family for generations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/about"
              variant="primary"
              size="xl"
              icon={HeartIcon}
              iconPosition="left"
              className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Learn More About Us
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
              className="border-2 hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Reserve Your Date
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HistoryPage;
