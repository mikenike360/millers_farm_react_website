import React from "react";
import Head from "next/head";
import { TruckIcon } from "@heroicons/react/24/outline"; // Heroicons Truck Icon

const VendorsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Recommended Vendors</title>
        <meta
          name="description"
          content="Discover our recommended vendors for cakes & desserts, catering, florists, photography, rentals, décor, event planners, and accommodations."
        />
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-base-200 p-4">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6">
          {/* Hero Icon */}
          <div className="flex justify-center mb-4">
            <TruckIcon className="w-12 h-12 text-primary" />
          </div>

          <div className="card-body">
            <h1 className="card-title text-2xl font-bold text-center">
              Recommended Vendors
            </h1>

            <section>
              <h2 className="text-lg font-semibold mt-4">Cakes & Desserts</h2>
              <ul className="list-disc list-inside">
                <li>Antler Baking Co.</li>
                <li>Saltadena</li>
                <li>Pure Bliss Desserts</li>
                <li>Barb’s Pies and Pastries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mt-4">Catering</h2>
              <ul className="list-disc list-inside">
                <li>Crave Catering</li>
                <li>Paella Works</li>
                <li>Gusto Wood Fire Pizza</li>
                <li>Danielle’s Back East Barbeque</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mt-4">Florists</h2>
              <ul className="list-disc list-inside">
                <li>Full Bloom Farm</li>
                <li>Triple Wren Farms</li>
                <li>Pozie by Natalie</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mt-4">Photography</h2>
              <ul className="list-disc list-inside">
                <li>Jagger Photography</li>
                <li>Jamie V Photography</li>
                <li>Aleesha Wiest Photography</li>
                <li>Alejandra Maria Photography</li>
                <li>Breanna Plus Kevin</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mt-4">Rentals/Décor</h2>
              <ul className="list-disc list-inside">
                <li>Pacific Party Canopies</li>
                <li>Wander Events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mt-4">Event Planners</h2>
              <ul className="list-disc list-inside">
                <li>Ever After Events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mt-4">Accommodations</h2>
              <ul className="list-disc list-inside">
                <li>Stay and Sea Vacation</li>
                <li>Airbnb</li>
                <li>VRBO</li>
                <li>Silver Reef Casino</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default VendorsPage;
