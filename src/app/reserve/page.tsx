"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
import Modal from "@/components/Modal";

interface BookingEvent extends Event {
  confirmed: boolean;
}

export default function ReservationPage() {
  const searchParams = useSearchParams();

  // Extract and parse start/end dates from the URL
  const urlStartDate = searchParams.get("checkIn");
  const urlEndDate = searchParams.get("checkOut");
  const initialStartDate = urlStartDate ? new Date(urlStartDate) : null;
  const initialEndDate = urlEndDate ? new Date(urlEndDate) : null;

  // Extract eventType from URL and set as initial state
  const urlEventType = searchParams.get("eventType") || "Not Defined";
  const [eventType, setEventType] = useState<string>(urlEventType);

  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
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
      confirmed: false,
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
    // Reset form fields
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
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg mt-14">
      {alertMessage && (
        <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      <h2 className="text-2xl font-bold text-center mb-4">
        Full-Day / Weekend Reservation
      </h2>

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

            {/* Event Type Dropdown */}
            <div className="bg-neutral text-white rounded-lg shadow-md p-4 flex flex-col">
              <label className="block font-semibold mb-2">Event Type</label>
              <select
                className="select select-bordered bg-white text-black px-3 py-2 rounded-md border-0 focus:border-primary focus:ring-2 focus:ring-primary w-44"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
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
            </div>
          </div>

          <button className="btn btn-primary mt-4 w-full" onClick={goToStep2}>
            Next: Your Info →
          </button>
          <p className="text-black text-center">
            The calendar below shows all our existing reservations.
          </p>

          {/* Calendar */}
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
            />
          </div>
        </>
      )}

      {/* Modal for Step 2: User Details with Back Button */}
      <Modal isOpen={step === 2} onClose={() => setStep(1)}>
        <h3 className="text-xl font-semibold text-center mb-4">
          Enter Your Information
        </h3>
        <input
          type="text"
          className="input input-bordered w-full mb-2"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="input input-bordered w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          className="input input-bordered w-full mb-2"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full mb-2"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex gap-4">
          <button className="btn btn-secondary w-full" onClick={() => setStep(1)}>
            Back
          </button>
          <button className="btn btn-primary w-full" onClick={goToStep3}>
            Next: Confirm →
          </button>
        </div>
      </Modal>

      {/* Modal for Step 3: Confirmation */}
      <Modal isOpen={step === 3} onClose={() => setStep(2)}>
        <h3 className="text-xl font-semibold text-center mb-4">
          Confirm Your Reservation
        </h3>
        <div className="mb-4">
          <p>
            <strong>Reservation Dates:</strong>{" "}
            {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
          </p>
          <p>
            <strong>Event Type:</strong> {eventType}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          {notes && (
            <p>
              <strong>Notes:</strong> {notes}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary w-full" onClick={() => setStep(2)}>
            Back
          </button>
          <button className="btn btn-success w-full" onClick={confirmReservations}>
            Confirm &amp; Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}
