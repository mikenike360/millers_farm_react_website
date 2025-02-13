"use client";
import React, { useState } from "react";
import Carousel from "@/components/Carousel";
import { FaSearch, FaCalendarAlt, FaUsers } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define a TypeScript interface for reservations
interface Reservation {
  id: string;
  name: string;
  start_date: string; // Assuming it's stored as an ISO string
  end_date: string;   // Assuming it's stored as an ISO string
}

export default function Home() {
  // Use strongly typed state instead of `any[]`
  const [reservations] = useState<Reservation[]>([]);
  const [reservationType, setReservationType] = useState("Wedding");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="h-screen md:h-[700px] relative"
        style={{
          backgroundImage: "url('hero_bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 h-full">
          <h1 className="text-5xl font-bold font-serif mb-5 drop-shadow-lg">
            Welcome to Miller&apos;s Hill Farm!
          </h1>
          <p className="text-md mb-5 font-bold font-serif leading-relaxed drop-shadow-lg max-w-lg mx-auto">
            Where rustic charm meets timeless elegance. Celebrate life’s most
            cherished moments amidst rolling hills and serene waterfront views.
          </p>

          {/* Booking Form */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
            {/* Inputs Wrapper */}
            <div className="flex flex-wrap gap-4 w-full justify-center">
              {/* Check-In Date */}
              <div className="bg-neutral text-black rounded-lg shadow-md p-3 flex items-center gap-2 w-fit">
                <FaCalendarAlt className="text-white" />
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  className="appearance-none outline-none bg-neutral text-white px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-36"
                  placeholderText="Check-In"
                />
              </div>

              {/* Check-Out Date */}
              <div className="bg-neutral text-white rounded-lg shadow-md p-3 flex items-center gap-2 w-fit">
                <FaCalendarAlt className="text-white" />
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  className="appearance-none outline-none bg-neutral text-white px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-36"
                  placeholderText="Check-Out"
                />
              </div>

              {/* Reservation Type Dropdown */}
              <div className="bg-neutral rounded-lg shadow-md p-3 flex items-center gap-2 w-fit relative">
                <FaUsers />
                <select
                  value={reservationType}
                  onChange={(e) => setReservationType(e.target.value)}
                  className="appearance-none outline-none bg-neutral px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-48"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement Party">Engagement Party</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Anniversary Celebration">Anniversary Celebration</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Family Reunion">Family Reunion</option>
                  <option value="Graduation Party">Graduation Party</option>
                  <option value="Live Music Event">Live Music Event</option>
                  <option value="Fundraiser">Fundraiser</option>
                  <option value="Private Dinner">Private Dinner</option>
                  <option value="Food Tasting">Food Tasting</option>
                  <option value="Art Exhibition">Art Exhibition</option>
                  <option value="Other">Other</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
                  ▼
                </span>
              </div>
            </div>

            {/* Search Button */}
            <button className="mx-auto bg-button bg-neutral hover:bg-primary text-white px-6 py-2 rounded-lg flex items-center shadow-md">
              <FaSearch className="mr-2" /> Book Now!
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="bg-base-200 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Couples Say
        </h2>
        <div className="max-w-4xl mx-auto">
          <Carousel />
        </div>
      </section>

      {/* Reservations List Section */}
      <section className="py-10 px-4 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">
          Current Reservations
        </h2>
        <div className="max-w-lg mx-auto">
          {reservations.length === 0 ? (
            <p className="text-center">No reservations found.</p>
          ) : (
            <ul className="list-disc pl-5">
              {reservations.map((res) => (
                <li key={res.id} className="mb-2">
                  <strong>{res.name}</strong> reserved on{" "}
                  {new Date(res.start_date).toLocaleDateString()} to{" "}
                  {new Date(res.end_date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-content py-10 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Tie the Knot?</h2>
          <p className="mb-6">
            Schedule a tour, request more information, or reserve your date to
            make your dream wedding a reality.
          </p>
          <button className="btn btn-secondary">Contact Us</button>
        </div>
      </section>
    </div>
  );
}
