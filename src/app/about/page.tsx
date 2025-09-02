"use client";
import Image from "next/image";
import { MapPinIcon, CakeIcon, BriefcaseIcon, SparklesIcon, HeartIcon, UsersIcon, CalendarIcon, StarIcon, HomeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function About() {
  const services = [
    {
      icon: CakeIcon,
      title: "Weddings & Celebrations",
      description: "Create unforgettable memories with a scenic backdrop and historic charm.",
      color: "from-primary-500 to-secondary-500"
    },
    {
      icon: BriefcaseIcon,
      title: "Corporate Events",
      description: "Host team-building retreats, meetings, or product launches in a truly inspiring environment.",
      color: "from-secondary-500 to-primary-500"
    },
    {
      icon: UsersIcon,
      title: "Family Gatherings",
      description: "Celebrate birthdays, anniversaries, reunions, and more in a warm, welcoming space.",
      color: "from-primary-600 to-secondary-600"
    },
    {
      icon: SparklesIcon,
      title: "Custom Events",
      description: "Enjoy our adaptable setting for any unique event you have in mind.",
      color: "from-secondary-600 to-primary-600"
    }
  ];

  const highlights = [
    {
      icon: HomeIcon,
      title: "Family-Owned Since 1940s",
      description: "Four generations of love and care for this special place"
    },
    {
      icon: PaperAirplaneIcon,
      title: "Historic Aviation Heritage",
      description: "Original airstrip and hangar add unique character to events"
    },
    {
      icon: StarIcon,
      title: "Island Paradise",
      description: "Stunning views of the San Juan Islands and surrounding waters"
    },
    {
      icon: HeartIcon,
      title: "Personal Touch",
      description: "Barbara Miller personally ensures every event is perfect"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="absolute inset-0 bg-[url('/hero_bg.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 font-display">
            About <span className="gradient-text">Miller&apos;s Hill Farm</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
            A cherished, family-owned venue on Lummi Island since the 1940s, where history meets elegance, 
            and every event becomes a treasured memory
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={HeartIcon}
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
              Book Your Date
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner & Venue Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl mb-6 shadow-lg">
              <HomeIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
              Our Family <span className="gradient-text">Legacy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A cherished, family-owned venue on Lummi Island since the 1940s, where history meets elegance, 
              and every event becomes a treasured memory
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Owner Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Barbara Miller</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Miller&apos;s Farm has been a cherished, family-owned venue on Lummi Island since the 1940s. 
                  Founded by Jack Miller and now lovingly managed by owner Barbara Miller, our historic property 
                  has evolved from a working farm with thriving cattle and one of the island&apos;s finest gardens 
                  into a versatile event space.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The original airstrip and hangar now serve as a unique gathering area for weddings, corporate events, 
                  family celebrations, and other special occasions, while maintaining the authentic charm that makes 
                  this place so special.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, Barbara continues her father&apos;s legacy, ensuring every event at Miller&apos;s Hill Farm 
                  is infused with the same warmth, attention to detail, and genuine care that has made this venue 
                  beloved for generations.
                </p>
              </div>
              
              {/* Owner Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image
                    src="/owner.jpg"
                    alt="Owner Barbara Miller"
                    width={320}
                    height={320}
                    className="relative w-80 h-80 object-cover rounded-full border-4 border-white shadow-soft transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg">
                    <p className="text-sm font-semibold text-gray-900">Barbara Miller</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Island Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/island.jpg"
                alt="Lummi Island, WA"
                width={800}
                height={600}
                className="relative w-full h-auto object-cover rounded-3xl shadow-soft transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-sm font-semibold text-gray-900">Lummi Island, WA</p>
                <p className="text-xs text-gray-600">San Juan Islands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Button Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5 rounded-3xl"></div>
            <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-full blur-xl"></div>
            
            {/* Content */}
            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-soft">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">
                Discover Our <span className="gradient-text">Rich History</span>
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                From Jack Miller&apos;s aviation dreams to Barbara&apos;s continued legacy, 
                explore the fascinating story behind Miller&apos;s Hill Farm
              </p>
              <Button
                href="/history"
                variant="primary"
                size="xl"
                icon={StarIcon}
                iconPosition="left"
                className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
              >
                Explore Our History
              </Button>
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
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                {/* Icon Header */}
                <div className={`p-6 bg-gradient-to-br ${service.color} text-white`}>
                  <div className="flex items-center justify-start mb-4">
                    <service.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{service.description}</p>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="text-center">
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Accessibility Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero_bg.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MapPinIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Conveniently Located in the <span className="text-yellow-200">San Juan Islands</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4">Easy Accessibility</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Our venue combines island charm with easy accessibility. Lummi Island is just a 10-minute ferry ride 
                from Bellingham, WA—making travel convenient for guests and ensuring a smooth experience for any event.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4">Perfect Balance</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Whether planning a destination wedding or a corporate retreat, Miller&apos;s Farm offers the perfect 
                balance of seclusion and accessibility, creating an unforgettable experience for all.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xl text-white/90">
              Contact us to reserve your date today!
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
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              href="/contact"
              variant="primary"
              size="xl"
              icon={HeartIcon}
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
              className="border-2 hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Reserve Your Date
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
