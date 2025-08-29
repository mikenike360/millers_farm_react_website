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
          console.error("Supabase error:", error);
          setError("Failed to load images");
          return;
        }

        if (!data || !Array.isArray(data)) {
          console.warn("Invalid data from Supabase:", data);
          setError("No images found");
          return;
        }

        const processedImages = data
          .map((file) => {
            if (!file.name) return null;

            // Generate full-size URL
            const { data: fullUrlData } = supabase.storage
              .from("millers_farm_images")
              .getPublicUrl(file.name);

            // Supabase image transformation: resize dynamically (200x150)
            const thumbnailUrl = `${fullUrlData.publicUrl}?width=200&height=150&resize=cover`;

            return {
              thumbnail: thumbnailUrl,  // Dynamically resized thumbnail
              full: fullUrlData?.publicUrl || "",
            };
          })
          .filter((img): img is { thumbnail: string; full: string } => Boolean(img?.full));

        console.log("Final Image URLs:", processedImages);
        setImages(processedImages);
      } catch (err) {
        console.error("Error fetching images:", err);
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
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <CameraIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
            Our <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Take a visual journey through the beautiful moments and stunning settings that make 
            Miller&apos;s Hill Farm the perfect venue for your special day
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/reserve"
              variant="primary"
              size="lg"
              icon={CalendarIcon}
              iconPosition="left"
            >
              Book Your Date
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              icon={HeartIcon}
              iconPosition="left"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{images.length}+</div>
              <div className="text-gray-600">Beautiful Images</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-600 mb-2">10+</div>
              <div className="text-gray-600">Years of Memories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">Happy Couples</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <MyLightboxGallery images={images} />
        </div>
      </section>
    </main>
  );
}
