"use client";

import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  fade: true,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: true,
        arrows: false,
      }
    }
  ]
};

const testimonials = [
  {
    quote: "Miller's Hill Farm was everything we dreamed of and more. Our guests couldn't stop raving about the beautiful scenery and the perfect blend of rustic charm and elegance. The staff went above and beyond to make our day special.",
    author: "Sarah & James",
    rating: 5,
    event: "Wedding",
    date: "June 2024"
  },
  {
    quote: "We fell in love with the barn, the water views, and the personal touch from the entire staff. It was the most magical day we could have imagined. The venue truly made our wedding unforgettable.",
    author: "Emily & Andrew",
    rating: 5,
    event: "Wedding",
    date: "August 2024"
  },
  {
    quote: "I couldn't have asked for a better venue. The entire day was seamless, the photos are breathtaking, and our guests are still talking about how beautiful everything was. Pure perfection!",
    author: "Jason & Claire",
    rating: 5,
    event: "Wedding",
    date: "September 2024"
  },
  {
    quote: "The perfect venue for our intimate ceremony. The natural beauty of the island combined with the thoughtful amenities made our special day truly memorable. We're so grateful we found this place.",
    author: "Michael & Lisa",
    rating: 5,
    event: "Wedding",
    date: "July 2024"
  }
];

export default function Carousel() {
  return (
    <div className="relative">
      <Slider {...settings} className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-8 py-12">
            <div className="text-center max-w-4xl mx-auto">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <FaQuoteLeft className="text-white text-2xl" />
                </div>
              </div>
              
              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-serif italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-300 text-xl mx-1" />
                ))}
              </div>
              
              {/* Author Info */}
              <div className="space-y-2">
                <p className="text-lg font-bold text-white">
                  {testimonial.author}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
                  <span>{testimonial.event}</span>
                  <span>•</span>
                  <span>{testimonial.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Custom CSS for better slider appearance */}
      <style jsx global>{`
        .testimonial-slider .slick-dots {
          bottom: -30px;
        }
        
        .testimonial-slider .slick-dots li button:before {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }
        
        .testimonial-slider .slick-dots li.slick-active button:before {
          color: white;
        }
        
        .testimonial-slider .slick-slide {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .testimonial-slider .slick-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
