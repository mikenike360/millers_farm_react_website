"use client";

import Image from "next/image";
import { MapPinIcon, CakeIcon, BriefcaseIcon, SparklesIcon, HeartIcon, UsersIcon, CalendarIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function About() {
  const services = [
    {
      icon: CakeIcon,
      title: "Weddings & Celebrations",
      description: "Create unforgettable memories with a scenic backdrop and historic charm."
    },
    {
      icon: BriefcaseIcon,
      title: "Corporate Events",
      description: "Host team-building retreats, meetings, or product launches in a truly inspiring environment."
    },
    {
      icon: UsersIcon,
      title: "Family Gatherings",
      description: "Celebrate birthdays, anniversaries, reunions, and more in a warm, welcoming space."
    },
    {
      icon: SparklesIcon,
      title: "Custom Events",
      description: "Enjoy our adaptable setting for any unique event you have in mind."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
            About <span className="gradient-text">Miller&apos;s Hill Farm</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A cherished, family-owned venue on Lummi Island since the 1940s, where history meets elegance
          </p>
        </div>
      </section>

      {/* Owner & Venue Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Owner Info */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 font-display">
                  Our Family Legacy
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Miller&apos;s Farm has been a cherished, family-owned venue on Lummi Island since the 1940s. 
                  Founded by Jack Miller and now lovingly managed by owner Barbara Miller, our historic property 
                  has evolved from a working farm with thriving cattle and one of the island&apos;s finest gardens 
                  into a versatile event space.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The original airstrip and hangar now serve as a unique gathering area for weddings, corporate events, 
                  family celebrations, and other special occasions.
                </p>
              </div>
              
              {/* Owner Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image
                    src="/owner.jpg"
                    alt="Owner Barbara Miller"
                    width={280}
                    height={280}
                    className="relative w-70 h-70 object-cover rounded-full border-4 border-white shadow-soft transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Island Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/island.jpg"
                alt="Lummi Island, WA"
                width={800}
                height={600}
                className="relative w-full h-auto object-cover rounded-2xl shadow-soft transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Services We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we provide the perfect setting for your special moments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                variant="elevated"
                size="lg"
                icon={service.icon}
                iconColor="text-primary-600"
                iconSize={16}
                className="group text-center hover:transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Accessibility Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <MapPinIcon className="w-10 h-10 mx-auto mb-6 text-white/80" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Conveniently Located in the <span className="gradient-text">San Juan Islands</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Easy Accessibility</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Our venue combines island charm with easy accessibility. Lummi Island is just a 10-minute ferry ride 
                from Bellingham, WA—making travel convenient for guests and ensuring a smooth experience for any event.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Perfect Balance</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Whether planning a destination wedding or a corporate retreat, Miller&apos;s Farm offers the perfect 
                balance of seclusion and accessibility.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xl text-white/90">
              To discover more about our family&apos;s legacy, visit our{" "}
              <Button
                href="/history"
                variant="outline"
                size="md"
                className="border-white/30 text-white hover:bg-white hover:text-primary-600"
              >
                History Page
              </Button>
              {" "}or contact us to reserve your date today!
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            Ready to Create <span className="gradient-text">Memories</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Let us help you plan the perfect event in our beautiful venue
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={HeartIcon}
              iconPosition="left"
            >
              Get in Touch
            </Button>
            <Button
              href="/reserve"
              variant="secondary"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
            >
              Reserve Your Date
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
