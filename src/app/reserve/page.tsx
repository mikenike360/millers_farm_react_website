"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Event } from "react-big-calendar";
import { supabase } from "@/components/supabaseClient";
import AlertModal from "@/components/AlertModal";
import ReservationCalendar from "@/components/ReservationCalendar";
import { 
  CalendarIcon, 
  UserIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface BookingEvent extends Event {
  confirmed: boolean;
}

function ReservationContent() {
  const searchParams = useSearchParams();

  // Extract and parse dates from URL
  const urlStartDate = searchParams.get("checkIn");
  const urlEndDate = searchParams.get("checkOut");
  const initialStartDate = urlStartDate ? new Date(urlStartDate) : null;
  const initialEndDate = urlEndDate ? new Date(urlEndDate) : null;

  // Extract eventType from URL
  const urlEventType = searchParams.get("eventType") || "Wedding";
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

    // Check if dates are in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    
    if (startDate < today) {
      setAlertMessage("Start date cannot be in the past. Please select a future date.");
      return;
    }
    
    if (endDate < today) {
      setAlertMessage("End date cannot be in the past. Please select a future date.");
      return;
    }

    setStep(2);
  };

  const goToStep3 = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setAlertMessage("Please enter your name, email, and phone number.");
      return;
    }
    if (!eventType || eventType.trim() === "") {
      setAlertMessage("Please select an event type.");
      return;
    }
    setStep(3);
  };

  const confirmReservations = async () => {
    const reservationEvent: BookingEvent = {
      title: `${name}'s ${eventType}`,
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
        eventType,
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

  const steps = [
    { number: 1, title: "Select Dates", icon: CalendarIcon },
    { number: 2, title: "Your Information", icon: UserIcon },
    { number: 3, title: "Confirm", icon: CheckCircleIcon }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
            Reserve Your <span className="gradient-text">Date</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Secure your perfect date at Miller&apos;s Hill Farm for your special event
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step >= stepItem.number 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {step > stepItem.number ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      <stepItem.icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 transition-all duration-300 ${
                      step > stepItem.number ? 'bg-primary-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Step {step}: {steps[step - 1].title}
            </h2>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" size="xl" className="p-8" overflow="visible" hover={false}>
            {alertMessage && (
              <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)} />
            )}

            {/* Step 1: Date Selection */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Select Your Event Dates
                  </h3>
                  <p className="text-gray-600">
                    Choose the perfect dates for your special event
                  </p>
                </div>

                {/* Availability Calendar */}
                <div className="mb-8">
                  <ReservationCalendar
                    onDateSelect={(start, end) => {
                      // If start and end are the same, this is the first selection
                      if (start.getTime() === end.getTime()) {
                        setStartDate(start);
                        setEndDate(null); // Clear end date for first selection
                      } else {
                        // This is the second selection, set both dates
                        setStartDate(start);
                        setEndDate(end);
                      }
                    }}
                    selectedStartDate={startDate}
                    selectedEndDate={endDate}
                  />
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Or manually select your dates below
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="block font-semibold text-gray-900">
                      Start Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                      placeholderText="Select start date"
                      dateFormat="MMMM d, yyyy"
                      popperClassName="z-50"
                      popperPlacement="bottom-start"
                      minDate={new Date()}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block font-semibold text-gray-900">
                      End Date
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                      placeholderText="Select end date"
                      dateFormat="MMMM d, yyyy"
                      popperClassName="z-50"
                      popperPlacement="bottom-start"
                      minDate={startDate || new Date()}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block font-semibold text-gray-900">
                      Event Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
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
                
                <div className="text-center">
                  <Button
                    onClick={goToStep2}
                    variant="gradient"
                    size="lg"
                    icon={ArrowRightIcon}
                    iconPosition="right"
                  >
                    Next: Your Information
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: User Information */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Your Information
                  </h3>
                  <p className="text-gray-600">
                    Please provide your contact details
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300 resize-none"
                      rows={4}
                      placeholder="Any special requests or additional information..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    size="lg"
                    icon={ArrowLeftIcon}
                    iconPosition="left"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={goToStep3}
                    variant="gradient"
                    size="lg"
                    icon={ArrowRightIcon}
                    iconPosition="right"
                  >
                    Next: Confirm
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Confirm Your Reservation
                  </h3>
                  <p className="text-gray-600">
                    Please review your details before submitting
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-gray-900">Reservation Dates:</span>
                      <p className="text-gray-600">{startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Event Type:</span>
                      <p className="text-gray-600">{eventType || "Wedding"}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Name:</span>
                      <p className="text-gray-600">{name}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Email:</span>
                      <p className="text-gray-600">{email}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Phone:</span>
                      <p className="text-gray-600">{phone}</p>
                    </div>
                    {notes && (
                      <div className="md:col-span-2">
                        <span className="font-semibold text-gray-900">Notes:</span>
                        <p className="text-gray-600">{notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    size="lg"
                    icon={ArrowLeftIcon}
                    iconPosition="left"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={confirmReservations}
                    variant="gradient"
                    size="lg"
                    icon={CheckCircleIcon}
                    iconPosition="left"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirm & Submit
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div>Loading reservation page...</div>}>
      <ReservationContent />
    </Suspense>
  );
}
