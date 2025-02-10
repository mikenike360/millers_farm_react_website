"use client";

import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Image from "next/image";

export default function Gallery({ images }: { images: string[] }) {
  return (
    <LightGallery speed={500} download licenseKey="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <a
            href={src}
            data-src={src}
            data-lg-size="1600-900"
            key={index}
            className="block"
          >
            <Image
              src={src}
              width={400} // Adjust as needed
              height={300} // Adjust as needed
              className="w-full h-48 object-cover rounded-lg shadow-md"
              alt={`Gallery Image ${index + 1}`}
            />
          </a>
        ))}
      </div>
    </LightGallery>
  );
}
