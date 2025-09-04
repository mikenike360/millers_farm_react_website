"use client";
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Contact() {
  const contactInfo = [
    {
      icon: PhoneIcon,
      title: "Phone",
      value: "1-360-739-9262",
      href: "tel:1-360-739-9262",
      color: "text-primary-600"
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      value: "info@millershill.com",
      href: "mailto:info@millershill.com",
      color: "text-secondary-600"
    },
    {
      icon: MapPinIcon,
      title: "Address",
      value: "2206 Tuttle Lane, Lummi Island, WA 98262",
      href: "https://maps.google.com/?q=2206+Tuttle+Lane,+Lummi+Island,+WA+98262",
      color: "text-accent-600"
    },
    {
      icon: ClockIcon,
      title: "Business Hours",
      value: "Mon–Fri: 8:30am – 5pm | Sat: 9am – 12pm",
      color: "text-neutral-600"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;d love to hear from you! Whether you have questions about our venue, 
            want to schedule a tour, or are ready to book your special day.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Contact <span className="gradient-text">Information</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach out to us through any of these channels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                variant="elevated"
                size="md"
                icon={info.icon}
                iconColor={info.color}
                iconSize={32}
                className="text-center group hover:transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.href ? (
                  <a 
                    href={info.href} 
                    target={info.href.startsWith('http') ? "_blank" : "_self"}
                    rel={info.href.startsWith('http') ? "noopener noreferrer" : ""}
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

      {/* Contact Form & Map Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 font-display">
                  Send Us a <span className="gradient-text">Message</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Please fill out the form below and we will get back to you shortly.
                </p>
              </div>
              
              <Card variant="elevated" size="lg" className="p-8">
                <form
                  action="https://formspree.io/f/xkgolerg"
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300 resize-none"
                      placeholder="Tell us about your event or ask any questions..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 shadow-soft hover:shadow-glow hover:scale-105 flex items-center justify-center"
                  >
                    <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
                    Send Message
                  </button>
                </form>
              </Card>
            </div>

            {/* Map & Quick Actions */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                  Find Our <span className="gradient-text">Location</span>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We are easily accessible via local roads. Please refer to the map below for detailed directions.
                </p>
                
                <div className="space-y-4">
                  <a
                    href="https://maps.google.com/?q=2206+Tuttle+Lane,+Lummi+Island,+WA+98262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-600 hover:text-white focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
                  >
                    <MapPinIcon className="w-6 h-6 mr-2" />
                    Get Directions
                  </a>
                  
                  <Button
                    href="/reserve"
                    variant="secondary"
                    size="md"
                    icon={CalendarIcon}
                    iconPosition="left"
                    className="w-full min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
                  >
                    Schedule a Tour
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
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
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Don&apos;t wait to secure your perfect date. Contact us today to begin planning 
            your dream event at Miller&apos;s Hill Farm.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/reserve"
              variant="outline"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
              className="border-white/30 text-white hover:bg-primary-600 hover:text-white min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Reserve Your Date
            </Button>
            <Button
              href="tel:1-360-739-9262"
              variant="primary"
              size="xl"
              icon={PhoneIcon}
              iconPosition="left"
              className="bg-primary-600 text-white hover:bg-primary-700 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Call Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
