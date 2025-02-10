import React from "react";
import { supabase } from "../components/supabaseClient";
import Gallery from "../components/Gallery"; // Import the Client Component

//  Server-side Data Fetching (App Router)
async function getImages() {
  const { data, error } = await supabase.storage
    .from("millers_farm_images")
    .list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  return (
    data
      ?.map((file) => {
        if (!file.name) return null;
        const { data: publicUrlData } = supabase.storage
          .from("millers_farm_images")
          .getPublicUrl(file.name);
        return publicUrlData.publicUrl;
      })
      .filter((url): url is string => Boolean(url)) || []
  );
}

export default async function GalleryPage() {
  const images = await getImages(); // Fetch images on the server

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Gallery</h1>

      {images.length === 0 ? (
        <p className="text-lg text-red-600">
          No images found. Please check your Supabase bucket.
        </p>
      ) : (
        <Gallery images={images} /> //  Use the Client Component
      )}
    </div>
  );
}
