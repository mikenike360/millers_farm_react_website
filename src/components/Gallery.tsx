"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { FiSearch } from "react-icons/fi"; // Example icon for hover overlay

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-brandGray to-gray-200">
        <p className="text-red-600 text-2xl">No images available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brandGray to-gray-200 py-10">
      <div className="mx-auto max-w-screen-lg px-4">
        {/* Heading Section */}
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-2 mt-12">
          Our Beautiful Gallery
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Explore our recent photos. Click any image to view it in full glory!
        </p>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {images.map(({ thumbnail }, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-white shadow-md 
                         hover:shadow-xl transition-shadow cursor-pointer 
                         flex items-center justify-center group 
                         animate-fadeInUp"
              onClick={() => setOpenIndex(index)}
              style={{ animationDelay: `${index * 0.05}s` }} 
              // ^ Stagger effect (each card delays by ~0.05s)
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

              {/* Hover Overlay (semi-transparent gradient) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent 
                              opacity-0 group-hover:opacity-90 
                              transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white flex items-center space-x-2">
                  <FiSearch className="text-2xl" />
                  <span className="font-medium">View Full</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={openIndex !== null}
        close={() => setOpenIndex(null)}
        slides={slides}
        index={openIndex ?? 0}
      />
    </div>
  );
}
