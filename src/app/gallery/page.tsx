import React from "react";
import { supabase } from "@/components/supabaseClient";
import MyLightboxGallery from "@/components/Gallery"; // Import our client component

async function getImages(): Promise<{ thumbnail: string; full: string }[]> {
  const { data, error } = await supabase.storage
    .from("millers_farm_images")
    .list("", {
      limit: 100,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  if (!data || !Array.isArray(data)) {
    console.warn("Invalid data from Supabase:", data);
    return [];
  }

  const images = data
    .map((file) => {
      if (!file.name) return null;

      //  Generate full-size URL
      const { data: fullUrlData } = supabase.storage
        .from("millers_farm_images")
        .getPublicUrl(file.name);

      //  Supabase image transformation: resize dynamically (200x150)
      const thumbnailUrl = `${fullUrlData.publicUrl}?width=200&height=150&resize=cover`;

      return {
        thumbnail: thumbnailUrl,  // Dynamically resized thumbnail
        full: fullUrlData?.publicUrl || "",
      };
    })
    .filter((img): img is { thumbnail: string; full: string } => Boolean(img?.full));

  console.log("Final Image URLs:", images);
  return images;
}



export default async function GalleryPage() {
  const images = await getImages();

  return (
    <div>
      <MyLightboxGallery images={images} />
    </div>
  );
}
