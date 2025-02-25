import React from "react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The Rich History of Miller’s Hill Farm",
  description:
    "Learn about the rich history of Miller’s Farm, a family legacy spanning 75 years, from naval service to memorable weddings and events.",
};

const HistoryPage: React.FC = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-base-200 p-4 pt-24">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header Card */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 font-mono">
            The Rich History of Miller&#39;s Hill Farm
          </h1>
        </div>

        {/* Section 1: Introduction with image */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center font-mono">
            Introduction
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4 p-4">
            <div className="md:w-1/2">
              <p className="text-gray-900 font-mono">
                Miller&#39;s Hill Farm has been in our family for over 75 years. Our grandfather,
                Jack Miller, purchased the land with a cabin upon returning to Lummi
                Island after completing his naval service during World War II. It wasn&#39;t
                long after that he met our grandmother, eighteen-year-old Lucille Adema,
                from Clear Lake, Washington.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/JackLucille.jpg"
                alt="Jack and Lucille"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md transition transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Marriage and Home */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center font-mono">
            Marriage and Home
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:items-center p-4">
            <div className="md:w-1/2">
              <Image
                src="/millers_retreat.jpg"
                alt="Miller's Retreat"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md transition transform duration-300 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-900 font-mono">
                Jack and Lucille were married in 1947. They built a home where they raised
                their three children. (
                <a
                  href="https://stay-sea.hosted.ownerrez.com/millers-island-retreat-orp5b664f0x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Miller&apos;s Retreat
                </a>
                ) Jack raised cattle on the land and could always be found working in his large, bountiful vegetable garden at the top of the hill.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Flying & Hangar */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center font-mono">
            Flying & Hangar
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
            <div className="md:w-1/2">
              <p className="text-gray-900 font-mono">
                In the 1970s, Jack fulfilled his dream of flying. He created an airstrip in
                the upper pasture and built a small hangar, which is now a gathering area for
                events. Jack would host frequent “fly-ins,” where planes would fly in from all
                over, and they would have big potlucks in the hangar. His experimental propeller
                airplane he was building still hangs from the rafters.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/hangar2.jpg"
                alt="Hangar 2"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md transition transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Ferry & Wedding Inquiries with Reef image */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center font-mono">
            Ferry & Wedding Inquiries
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
            <div className="md:w-1/2">
              <Image
                src="/reef.jpg"
                alt="Reef"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md transition transform duration-300 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-900 font-mono">
                Jack worked on the island ferry for over forty years until his retirement, and
                Lucille ran a beauty shop behind their home for many years. It wasn&#39;t until
                many years later that Jack and Lucille&#39;s twin great-granddaughters decided to get
                married on the property (two summers in a row). And the next thing you know, we
                were getting inquiries from other people about having their own weddings and events
                here. And the rest, as they say, is history — that&#39;s how Miller&#39;s Farm Island Weddings
                was born.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Conclusion */}
        <div className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center p-6 font-mono">
            Conclusion
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="md:w-1/2">
              <p className="text-gray-900 font-mono">
                It has been a real pleasure hosting so many wonderful weddings and events here.
                The property holds many fond memories for our family, and we would love the
                opportunity to share this beautiful sanctuary with you. Jack passed away in 1995,
                and Lucille passed away in 2015. We know they would both be very happy and proud
                of Miller&#39;s Hill Farm!
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/millers_hill_farm_nighttime.jpg"
                alt="Miller's Hill Farm at Night"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md transition transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="flex justify-center">
          <a href="/about">
            <button className="px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </main>
  );
};

export default HistoryPage;
