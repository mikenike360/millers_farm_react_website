"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/components/supabaseClient";
import MyLightboxGallery from "@/components/Gallery";
import { CameraIcon, HeartIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

export default function GalleryPage() {
  const [images, setImages] = useState<{ thumbnail: string; full: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getImages() {
      try {
        setLoading(true);
        const { data, error } = await supabase.storage
          .from("millers_farm_images")
          .list("", {
            limit: 100,
            sortBy: { column: "name", order: "asc" },
          });

        if (error) {
          setError("Failed to fetch images");
          return;
        }

        if (!data || data.length === 0) {
          setImages([]);
          return;
        }

        // Process the images - Supabase storage returns FileObject with name property
        const processedImages = data.map((file) => {
          const { data: urlData } = supabase.storage
            .from("millers_farm_images")
            .getPublicUrl(file.name);
          
          // Create both thumbnail and full size URLs
          const fullUrl = urlData.publicUrl;
          const thumbnailUrl = `${fullUrl}?width=200&height=200&resize=cover`;
          
          return {
            thumbnail: thumbnailUrl,
            full: fullUrl
          };
        });

        setImages(processedImages);
      } catch (err) {
        setError("Failed to load images");
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CameraIcon className="w-6 h-6 text-white animate-pulse" />
          </div>
          <p className="text-gray-600 text-xl">Loading gallery...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CameraIcon className="w-6 h-6 text-white" />
          </div>
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            size="lg"
          >
            Try Again
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="absolute inset-0 bg-[url('/hero_bg.jpeg')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 font-display">
            Our <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
            Take a visual journey through the beautiful moments and stunning settings that make 
            Miller&apos;s Hill Farm the perfect venue for your special day
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              href="/reserve"
              variant="primary"
              size="xl"
              icon={CalendarIcon}
              iconPosition="left"
              className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Book Your Date
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="xl"
              icon={HeartIcon}
              iconPosition="left"
              className="border-2 hover:bg-primary-50 transform hover:-translate-y-1 transition-all duration-300 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Get in Touch
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{images.length}+</div>
              <div className="text-gray-600 font-medium">Beautiful Images</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">10+</div>
              <div className="text-gray-600 font-medium">Years of Memories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Happy Couples</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <MyLightboxGallery images={images} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Ready to <span className="text-yellow-200">Capture</span> Your Moments?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Book your date at Miller&apos;s Hill Farm and create memories that will last a lifetime. 
            Our stunning venue is the perfect backdrop for your special day.
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
              href="/contact"
              variant="primary"
              size="xl"
              icon={HeartIcon}
              iconPosition="left"
              className="bg-primary-600 text-white hover:bg-primary-700 min-w-[220px] text-sm [&>svg]:w-5 [&>svg]:h-5"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
