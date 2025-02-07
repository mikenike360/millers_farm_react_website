"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase } from "../components/supabaseClient"; 
import AlertModal from "../components/AlertModal"; 

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function ReservationPage() {
  const [bookings, setBookings] = useState<Event[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // Tracks the calendar's month/year
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase.from("bookings").select("*");
      if (!error && data) {
        setBookings(
          data.map((b) => ({
            id: b.id,
            title: b.title,
            start: new Date(b.start_date),
            end: new Date(b.end_date),
            allDay: true,
            confirmed: b.confirmed,
          }))
        );
      }
    };
    fetchBookings();
  }, []);

  const changeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const changeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
      <h2 className="text-2xl font-bold text-center mb-4">
        Full-Day / Weekend Reservation
      </h2>

      {step === 1 && (
        <>
          <p className="text-center mb-4">
            Enter the dates for your reservation. The calendar below shows existing reservations.
          </p>

          {/* Date Selection Fields */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Start Date Box */}
            <div className="bg-neutral text-white rounded-lg shadow-md p-4 flex flex-col">
              <label className="block font-semibold mb-2">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="input input-bordered bg-white text-black px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-44"
                placeholderText="Select a start date"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            {/* End Date Box */}
            <div className="bg-neutral text-white rounded-lg shadow-md p-4 flex flex-col">
              <label className="block font-semibold mb-2">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="input input-bordered bg-white text-black px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-44"
                placeholderText="Select an end date"
                dateFormat="MMMM d, yyyy"
              />
            </div>
          </div>

          {/* Dropdowns for Month & Year Selection */}
          <div className="flex justify-center gap-4 my-4">
            {/* Month Dropdown */}
            <select
              value={currentDate.getMonth()}
              onChange={changeMonth}
              className="input input-bordered bg-white text-black px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {format(new Date(2025, index, 1), "MMMM")}
                </option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select
              value={currentDate.getFullYear()}
              onChange={changeYear}
              className="input input-bordered bg-white text-black px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary"
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const year = new Date().getFullYear() - 2 + index; // Range: 2 years back, 2 years forward
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Existing Reservations Calendar */}
          <div className="bg-blue-400 text-black p-4 mt-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-center mb-3">
              Existing Reservations
            </h3>
            <Calendar
              localizer={localizer}
              events={bookings}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={["month"] as View[]}
              date={currentDate}
              onNavigate={(newDate) => setCurrentDate(newDate)}
              style={{ height: 600 }}
              popup
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.confirmed ? "#22c55e" : "#facc15",
                  border: "1px solid rgb(74, 96, 222)",
                  color: "#1f2937",
                  textAlign: "center",
                  padding: "2px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                },
              })}
            />
          </div>

          <button className="btn btn-primary mt-4 w-full" onClick={() => setStep(2)}>
            Next: Your Info →
          </button>
        </>
      )}
    </div>
  );
}
