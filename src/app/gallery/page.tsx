"use client";
import React, { useEffect, useState } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { supabase } from "../components/supabaseClient";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      console.log("Fetching images from Supabase...");

      const { data, error } = await supabase.storage
        .from("millers_farm_images")
        .list("", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      console.log("Supabase Response:", data);

      if (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        console.warn("No images found in the Supabase bucket.");
        setLoading(false);
        return;
      }

      // Generate public URLs for each file
      const imageUrls = data
        .map((file) => {
          if (!file.name) {
            console.warn("File with undefined name:", file);
            return null;
          }

          const { data: publicUrlData, error: urlError } = supabase.storage
            .from("millers_farm_images")
            .getPublicUrl(file.name);

          if (urlError) {
            console.warn(`Error generating URL for ${file.name}:`, urlError);
            return null;
          }

          console.log(`Generated URL for ${file.name}:`, publicUrlData.publicUrl);
          return publicUrlData.publicUrl;
        })
        .filter((url): url is string => Boolean(url));

      console.log("Final Image URLs:", imageUrls);
      setImages(imageUrls);
      setLoading(false);
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Gallery</h1>

      {loading ? (
        <p className="text-lg text-gray-600">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-lg text-red-600">
          No images found. Please check your Supabase bucket.
        </p>
      ) : (
        <LightGallery speed={500} download licenseKey="">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((src, index) => {
              console.log(`Rendering LightGallery image: ${src}`);
              return (
                <a
                  href={src}
                  data-src={src}
                  data-lg-size="1600-900"
                  key={index}
                  className="block"
                >
                  <img
                    src={src}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                    alt={`Gallery Image ${index + 1}`}
                  />
                </a>
              );
            })}
          </div>
        </LightGallery>
      )}
    </div>
  );
}
