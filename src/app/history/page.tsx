import React from "react";
import { Metadata } from "next";
import { NewspaperIcon } from "@heroicons/react/24/outline"; // Heroicons Newspaper Icon

export const metadata: Metadata = {
  title: "The Rich History of Miller’s Farm",
  description:
    "Learn about the rich history of Miller’s Farm, a family legacy spanning 75 years, from naval service to memorable weddings and events.",
};

const HistoryPage: React.FC = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6">
        {/* Hero Icon */}
        <div className="flex justify-center mb-4">
          <NewspaperIcon className="w-12 h-12 text-primary" />
        </div>

        <div className="card-body">
          <h1 className="card-title text-2xl font-bold text-center">
            The Rich History of Miller&#39;s Farm
          </h1>

          <p>
            Miller&#39;s Farm has been in our family for 75 years. Our grandfather,
            Jack Miller, purchased the land with a cabin upon returning to Lummi
            Island after completing his naval service during World War II. It wasn&#39;t
            long after that he met our grandmother, eighteen-year-old Lucille Adema,
            from Clear Lake, Washington.
          </p>

          <p>
            Jack and Lucille were married in 1947. They built a home where they raised
            their three children. (Miller&#39;s Retreat) Jack raised cattle on the land and
            could always be found working in his large bountiful vegetable garden at the
            top of the hill.
          </p>

          <p>
            In the 1970s, Jack fulfilled his dream of flying. He created an airstrip in
            the upper pasture and built a small hangar, which is now a gathering area for
            events. Jack would host frequent “fly-ins,” where planes would fly in from all
            over, and they would have big potlucks in the hangar. His experimental propeller
            airplane he was building hangs from the rafters.
          </p>

          <p>
            Jack worked on the island ferry for over forty years until his retirement, and
            Lucille ran a beauty shop behind their home for many years. It wasn&#39;t until
            many years later that Jack and Lucille&#39;s twin great-granddaughters decided to get
            married on the property (two summers in a row). And the next thing you know, we
            were getting inquiries from other people about having their own weddings and events
            here. And the rest, as they say, is history — that&#39;s how Miller&#39;s Farm Island Weddings
            was born.
          </p>

          <p>
            It has been a real pleasure hosting so many wonderful weddings and events here.
            The property holds many fond memories for our family, and we would love the
            opportunity to share this beautiful sanctuary with you. Jack passed away in 1995,
            and Lucille passed away in 2015. We know they would both be very happy and proud
            of Miller&#39;s Farm Island Weddings.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HistoryPage;
