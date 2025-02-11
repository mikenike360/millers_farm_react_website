"use client";
import React from "react";

/**
 * MinimalGallery simply shows the received `images` as <img> tags.
 * If `images` is undefined or empty, it displays a fallback message.
 */
export default function MinimalGallery({ images = [] }: { images?: string[] }) {
  console.log("MinimalGallery received images:", images);

  if (!Array.isArray(images) || images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Image ${index}`} style={{ width: 200, height: "auto" }} />
        </div>
      ))}
    </div>
  );
}
