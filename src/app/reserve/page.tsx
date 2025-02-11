"use client";
import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase } from "@/components/supabaseClient";
import AlertModal from "@/components/AlertModal";

interface BookingEvent extends Event {
  confirmed: boolean;
}

export default function ReservationPage() {
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const localizer = useMemo(
    () =>
      dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales: { "en-US": enUS },
      }),
    []
  );

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

  const goToStep2 = () => {
    if (!startDate || !endDate) {
      setAlertMessage("Please enter both a start and end date before continuing.");
      return;
    }
    setStep(2);
  };

  const goToStep3 = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setAlertMessage("Please enter your name, email, and phone number.");
      return;
    }
    setStep(3);
  };

  const confirmReservations = async () => {
    const reservationEvent: BookingEvent = {
      title: `${name}'s Reservation`,
      start: startDate!,
      end: endDate!,
      allDay: true,
      confirmed: false, //  Fix: Include 'confirmed' to match BookingEvent type
    };

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newBookings: [reservationEvent],
        name,
        email,
        phone,
        notes,
      }),
    });

    const data = await response.json();
    if (data.error) {
      setAlertMessage("Error saving reservation.");
      return;
    }

    setBookings([...bookings, reservationEvent]);
    setStartDate(null);
    setEndDate(null);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setStep(1);
    setAlertMessage("Your reservation has been submitted. We will confirm shortly.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      {alertMessage && (
        <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      <h2 className="text-2xl font-bold text-center mb-4">Full-Day / Weekend Reservation</h2>

      {/* Step 1: Select Date */}
      {step === 1 && (
        <>
          <p className="text-center mb-4">
            Enter the dates for your reservation. The calendar below shows existing reservations.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
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

          {/* Calendar */}
          <div className="bg-blue-400 text-black p-4 mt-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-center mb-3">Existing Reservations</h3>
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
            />
          </div>

          <button className="btn btn-primary mt-4 w-full" onClick={goToStep2}>
            Next: Your Info →
          </button>
        </>
      )}

      {/* Step 2: User Information */}
      {step === 2 && (
        <div className="bg-secondary p-4 rounded-lg shadow-md">
          <label className="block mb-2 font-semibold">Your Name</label>
          <input className="input input-bordered w-full mb-3" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="block mb-2 font-semibold">Your Email</label>
          <input className="input input-bordered w-full mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="block mb-2 font-semibold">Your Phone</label>
          <input className="input input-bordered w-full mb-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button className="btn btn-primary mt-4 w-full" onClick={goToStep3}>
            Review →
          </button>
        </div>
      )}

      {/* Step 3: Review & Confirm */}
      {step === 3 && (
        <div className="bg-secondary p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Review & Confirm</h3>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <button className="btn btn-primary w-full" onClick={confirmReservations}>
            Confirm Reservation
          </button>
        </div>
      )}
    </div>
  );
}
