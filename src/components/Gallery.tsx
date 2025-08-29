"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

interface MyLightboxGalleryProps {
  images: { thumbnail: string; full: string }[];
}

// Helper function to convert filename to descriptive alt text
const getAltTextFromFilename = (url: string): string => {
  // Extract the file name from the URL
  const filename = url.split('/').pop() || "";
  // Remove the file extension
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
  // Replace underscores with spaces
  const nameWithSpaces = nameWithoutExtension.replace(/_/g, " ");
  // Capitalize each word
  const capitalized = nameWithSpaces
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return `Miller's Hill Farm - ${capitalized}`;
};

export default function MyLightboxGallery({ images = [] }: MyLightboxGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Convert full-size images into slides for the lightbox
  const slides = images.map(({ full }) => ({ src: full }));

  if (!images.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiSearch className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 text-xl">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10">
      <div className="mx-auto max-w-screen-lg px-4">

        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
            Photo <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our recent photos. Click any image to view it in full glory!
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {images.map(({ thumbnail }, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl 
                         hover:shadow-xl cursor-pointer 
                         flex items-center justify-center group 
                         animate-fadeInUp bg-white shadow-soft border border-gray-100"
              onClick={() => setOpenIndex(index)}
              style={{ animationDelay: `${index * 0.05}s` }} 
            >
              {/* Thumbnail Image */}
              <Image
                src={thumbnail}
                alt={getAltTextFromFilename(thumbnail)}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-auto max-w-[240px] max-h-[240px] 
                           object-scale-down transition-transform 
                           duration-300 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
                              opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white flex items-center space-x-2">
                  <FiSearch className="text-2xl" />
                  <span className="font-medium">View Full</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={openIndex !== null}
          index={openIndex || 0}
          close={() => setOpenIndex(null)}
          slides={slides}
          carousel={{
            finite: true,
          }}
          render={{
            buttonPrev: openIndex === 0 ? () => null : undefined,
            buttonNext: openIndex === slides.length - 1 ? () => null : undefined,
          }}
        />
      </div>
    </div>
  );
}
