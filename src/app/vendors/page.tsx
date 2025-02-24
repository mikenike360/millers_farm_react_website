import React from "react";
import Head from "next/head";
import {
  CakeIcon,
  FireIcon,
  BuildingStorefrontIcon,
  CameraIcon,
  HomeIcon,
  TruckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const vendors = [
  {
    title: "Cakes & Desserts",
    icon: CakeIcon,
    items: [
      { name: "Antler Baking Co.", link: "https://www.antlerbakingcompany.com/" },
      { name: "Saltadena", link: "https://www.saltadena.com/" },
      { name: "Pure Bliss Desserts", link: "https://www.pureblissdesserts.com/" },
      { name: "Barb’s Pies and Pastries", link: "https://www.barbspiesandpastries.com/" },
    ],
  },
  {
    title: "Catering",
    icon: FireIcon,
    items: [
      { name: "Crave Catering", link: "https://www.cravecatering.com/" },
      { name: "Paella Works", link: "https://www.paellaworks.com/" },
      { name: "Gusto Wood Fire Pizza", link: "https://www.gustowoodfiredpizza.com/" },
      { name: "Back East Barbeque", link: "https://www.backeastbbq.com/" },
    ],
  },
  {
    title: "Florists",
    icon: BuildingStorefrontIcon,
    items: [
      { name: "Full Bloom Farm", link: "https://www.fullbloomfarm.com/" },
      { name: "Triple Wren Farms", link: "https://www.triplewrenfarms.com/" },
      { name: "Pozie by Natalie", link: "https://www.poziebynatalie.com/" },
    ],
  },
  {
    title: "Photography",
    icon: CameraIcon,
    items: [
      { name: "Jagger Photography", link: "https://www.jaggerphotography.com/" },
      { name: "Jamie V Photography", link: "https://www.jamievphotography.com/" },
      { name: "Aleesha Wiest Photography", link: "https://www.aleeshawiestphotography.com/" },
      { name: "Breanna Plus Kevin", link: "https://www.breannapluskevin.com/" },
    ],
  },
  {
    title: "Rentals/Décor",
    icon: TruckIcon,
    items: [
      { name: "Pacific Party Canopies", link: "https://www.pacificpartycanopies.com/" },
    ],
  },
  {
    title: "Event Planners",
    icon: CalendarIcon,
    items: [
      { name: "Ever After Events", link: "https://everaftereventsllc.com/" },
    ],
  },
  {
    title: "Accommodations",
    icon: HomeIcon,
    items: [
      { name: "Stay and Sea Vacation", link: "https://www.stayandseavacations.com/" },
      { name: "Airbnb", link: "https://www.airbnb.com/" },
      { name: "VRBO", link: "https://www.vrbo.com/" },
      { name: "Silver Reef Casino", link: "https://www.silverreefcasino.com/" },
    ],
  },
];

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
      <main className="flex flex-col items-center min-h-screen bg-base-200 p-4 pt-24">
        <h1 className="text-3xl font-bold text-center mb-6">Recommended Vendors</h1>
        {/* Vendor image below the main title */}
        <img
          src="/vendor.png"
          alt="Vendor"
          className="mb-6 w-64 h-auto object-contain max-w-2xl"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {vendors.map(({ title, icon: Icon, items }) => (
            <div
              key={title}
              className="card bg-gradient-to-r from-red-400 to-orange-200 shadow-xl p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Icon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {items.map(({ name, link }) => (
                  <li key={name}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default VendorsPage;
