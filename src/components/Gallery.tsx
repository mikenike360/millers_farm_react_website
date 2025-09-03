"use client";

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { FiSearch, FiHeart, FiShare2 } from "react-icons/fi";

interface MyLightboxGalleryProps {
  images: { thumbnail: string; full: string }[];
}

// Helper function to convert filename to clean, readable names
const getAltTextFromFilename = (url: string): string => {
  const filename = url.split('/').pop() || "";
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
  
  // Words to filter out
  const filterWords = ['zoom', 'zoomed', 'img', 'image', 'photo', 'pic', 'copy', 'copy2', 'copy3', 'Lummi', 'Island', 'from'];
  
  // Clean the filename: convert underscores to spaces, remove numbers and odd characters
  let cleanName = nameWithoutExtension
    .replace(/_/g, ' ') // Convert underscores to spaces
    .replace(/[0-9]/g, '') // Remove all numbers
    .replace(/[^a-zA-Z\s]/g, '') // Remove all non-letter characters except spaces
    .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
    .trim(); // Remove leading/trailing spaces
  
  // Remove unwanted words and the letter 'x' from anywhere
  const words = cleanName
    .split(' ')
    .filter(word => word.length > 0 && !filterWords.includes(word.toLowerCase()))
    .map(word => word
      .replace(/x/gi, '') // Remove 'x' from anywhere in the word (case insensitive)
      .replace(/^[a-z]/, (match) => match.toUpperCase()) // Capitalize first letter
    )
    .filter(word => word.length > 0); // Remove any empty words that resulted from removing 'x'
  
  // Join words back together
  cleanName = words.join(' ');
  
  // If we end up with nothing meaningful, provide a default
  if (cleanName.length < 3) {
    cleanName = 'Venue Photo';
  }
  
  return cleanName;
};

export default function MyLightboxGallery({ images = [] }: MyLightboxGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  // Convert full-size images into slides for the lightbox
  const slides = images.map(({ full }) => ({ src: full }));

  const handleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening lightbox
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleShare = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening lightbox
    const imageUrl = images[index].full;
    const imageTitle = getAltTextFromFilename(images[index].thumbnail);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: imageTitle,
          text: `Check out this beautiful photo from Miller's Hill Farm!`,
          url: imageUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(imageUrl);
        // You could add a toast notification here
        alert('Image URL copied to clipboard!');
      } catch (error) {
        alert('Failed to copy image URL');
      }
    }
  };

  if (!images.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-200">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiSearch className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Images Available</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We're currently updating our gallery. Check back soon for beautiful photos of our venue!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Gallery Header */}
      <div className="text-center mb-8 md:mb-16">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4 md:mb-6">
          <FiSearch className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 font-display">
          Photo <span className="gradient-text">Gallery</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore our stunning venue through the lens of beautiful moments captured here
        </p>
        <div className="mt-4 md:mt-6 text-xs md:text-sm text-gray-500">
          Click any image to view in full size • {images.length} photos available
        </div>
      </div>

      {/* Masonry Grid Layout */}
      <div className="gallery-masonry">
        {images.map(({ thumbnail, full }, index) => (
          <div
            key={index}
            className="gallery-item group relative overflow-hidden rounded-2xl 
                       bg-white shadow-soft hover:shadow-2xl cursor-pointer"
            onClick={() => setOpenIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image Container */}
            <div className="gallery-image-container aspect-[4/3]">
              <Image
                src={thumbnail}
                alt={getAltTextFromFilename(thumbnail)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="gallery-image object-cover"
                priority={index < 8}
              />
              
              {/* Gradient Overlay */}
              <div className="gallery-overlay absolute inset-0 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Hover Content */}
              <div className="gallery-hover-content absolute inset-0 flex items-center justify-center opacity-0 
                              group-hover:opacity-100 transition-all duration-500">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full 
                                 flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <FiSearch className="w-7 h-7" />
                  </div>
                  <p className="font-semibold text-lg mb-2">View Full Size</p>
                  <p className="text-sm text-white/80">Click to explore</p>
                </div>
              </div>

              {/* Image Info Badge */}
              <div className="gallery-badge absolute top-4 left-4 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full 
                               text-xs font-medium text-gray-800 shadow-lg">
                  Photo {index + 1}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="gallery-actions absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                              transition-all duration-500 space-y-2">
                <button 
                  className={`w-8 h-8 backdrop-blur-sm rounded-full 
                             flex items-center justify-center transition-colors duration-200 shadow-lg
                             ${likedImages.has(index) 
                               ? 'bg-red-500 text-white hover:bg-red-600' 
                               : 'bg-white/90 text-gray-700 hover:bg-white'}`}
                  onClick={(e) => handleLike(index, e)}
                >
                  <FiHeart className={`w-5 h-5 ${likedImages.has(index) ? 'fill-current' : ''}`} />
                </button>
                <button 
                  className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full 
                             flex items-center justify-center text-gray-700 
                             hover:bg-white transition-colors duration-200 shadow-lg"
                  onClick={(e) => handleShare(index, e)}
                >
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Caption - Show clean, meaningful names */}
            {(() => {
              const cleanName = getAltTextFromFilename(thumbnail);
              // Only show caption if it's meaningful (not just "Venue Photo")
              return cleanName !== 'Venue Photo' && cleanName.length > 0 ? (
                <div className="p-4 pt-3">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {cleanName}
                  </h3>
                </div>
              ) : null;
            })()}
          </div>
        ))}
      </div>

      {/* Gallery Footer */}
      <div className="text-center mt-16 pt-8 border-t border-gray-200">
        <p className="text-gray-600 mb-4">
          All photos showcase the natural beauty and charm of Miller's Hill Farm
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>• High-resolution images</span>
          <span>• Professional photography</span>
          <span>• Regular updates</span>
        </div>
      </div>

      {/* Enhanced Lightbox */}
      <Lightbox
        open={openIndex !== null}
        index={openIndex || 0}
        close={() => setOpenIndex(null)}
        slides={slides}
        carousel={{
          finite: true,
          preload: 2,
        }}
        render={{
          buttonPrev: openIndex === 0 ? () => null : undefined,
          buttonNext: openIndex === slides.length - 1 ? () => null : undefined,
        }}
        animation={{
          fade: 300,
          swipe: 500,
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
      />
    </div>
  );
}
