"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/components/supabaseClient";
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  title: string;
  confirmed: boolean;
}

interface ReservationCalendarProps {
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
  selectedStartDate?: Date | null;
  selectedEndDate?: Date | null;
}

export default function ReservationCalendar({ 
  onDateSelect, 
  selectedStartDate, 
  selectedEndDate 
}: ReservationCalendarProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [currentMonth]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("*");

      if (error) {
        console.error("Error fetching bookings:", error);
      } else {
        console.log("Fetched bookings:", data);
        console.log("Sample booking structure:", data?.[0]);
        setBookings(data || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDateBooked = (date: Date): boolean => {
    return bookings.some(booking => {
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);
      // Normalize dates to start of day for comparison
      const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      
      const isInRange = checkDate >= startDate && checkDate <= endDate;
      console.log(`Checking date ${checkDate.toDateString()}:`, {
        booking: booking.title,
        start: startDate.toDateString(),
        end: endDate.toDateString(),
        isInRange,
        confirmed: booking.confirmed
      });
      return isInRange;
    });
  };

  const isDateConfirmed = (date: Date): boolean => {
    return bookings.some(booking => {
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);
      // Normalize dates to start of day for comparison
      const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      
      return checkDate >= startDate && checkDate <= endDate && booking.confirmed;
    });
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date > selectedStartDate && date < selectedEndDate;
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days from previous month to fill first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from next month to fill last week
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    
    if (date < today) {
      return; // Can't select past dates
    }
    
    if (isDateBooked(date)) return; // Can't select booked dates
    
    // Normalize the clicked date for comparison
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (!selectedStartDate) {
      // No selection exists - start a new selection
      onDateSelect?.(date, date);
    } else if (!selectedEndDate) {
      // Only start date exists
      const startDate = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate());
      
      if (clickedDate.getTime() === startDate.getTime()) {
        // Clicked the same date as start - remove selection
        onDateSelect?.(null, null);
      } else {
        // Clicked different date - set as end date
        if (clickedDate > startDate) {
          onDateSelect?.(selectedStartDate, date);
        } else {
          onDateSelect?.(date, selectedStartDate);
        }
      }
    } else {
      // Both start and end dates exist
      const startDate = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate());
      const endDate = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), selectedEndDate.getDate());
      
      if (clickedDate.getTime() === startDate.getTime()) {
        // Clicked start date - remove entire selection
        onDateSelect?.(null, null);
      } else if (clickedDate.getTime() === endDate.getTime()) {
        // Clicked end date - remove entire selection
        onDateSelect?.(null, null);
      } else if (clickedDate > startDate && clickedDate < endDate) {
        // Clicked inside range - shorten end date to clicked date
        onDateSelect?.(selectedStartDate, date);
      } else if (clickedDate < startDate) {
        // Clicked before start - extend range backward
        onDateSelect?.(date, selectedEndDate);
      } else if (clickedDate > endDate) {
        // Clicked after end - extend range forward
        onDateSelect?.(selectedStartDate, date);
      }
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-2xl shadow-soft p-4 md:p-6">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
        <h3 className="text-lg md:text-xl font-bold text-gray-900">Availability Calendar</h3>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <select
              value={currentMonth.getMonth()}
              onChange={(e) => setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(e.target.value), 1))}
              className="px-2 md:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            
            <select
              value={currentMonth.getFullYear()}
              onChange={(e) => setCurrentMonth(new Date(parseInt(e.target.value), currentMonth.getMonth(), 1))}
              className="px-2 md:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
            >
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-4 text-xs md:text-sm">
        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-gray-300 rounded"></div>
          <span className="text-xs md:text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-red-100 border-2 border-red-300 rounded"></div>
          <span className="text-xs md:text-sm text-gray-600">Booked</span>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-500 border-2 border-blue-600 rounded"></div>
          <span className="text-xs md:text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-100 border-2 border-blue-200 rounded"></div>
          <span className="text-xs md:text-sm text-gray-600">In Range</span>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
          <span className="text-xs md:text-sm text-gray-600">Confirmed</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
          const isBooked = isDateBooked(date);
          const isConfirmed = isDateConfirmed(date);
          const isSelected = isDateSelected(date);
          const isInRange = isDateInRange(date);
          const isStartDate = selectedStartDate && date.toDateString() === selectedStartDate.toDateString();
          const isEndDate = selectedEndDate && date.toDateString() === selectedEndDate.toDateString();

          let bgColor = "bg-white";
          let borderColor = "border-gray-200";
          let textColor = "text-gray-400";

          if (isPast) {
            // Past dates are disabled
            bgColor = "bg-gray-100";
            borderColor = "border-gray-200";
            textColor = "text-gray-300";
          } else if (isConfirmed) {
            // Confirmed bookings - yellow
            bgColor = "bg-yellow-100";
            borderColor = "border-yellow-300";
            textColor = "text-yellow-800";
          } else if (isBooked && !isConfirmed) {
            // Pending bookings - red (entire range)
            bgColor = "bg-red-100";
            borderColor = "border-red-300";
            textColor = "text-red-800";
          } else if (isStartDate && !isBooked) {
            // Start date is always highlighted (only if not booked)
            bgColor = "bg-blue-500";
            borderColor = "border-blue-600";
            textColor = "text-white";
          } else if (isEndDate && !isBooked) {
            // End date is always highlighted (only if not booked)
            bgColor = "bg-blue-500";
            borderColor = "border-blue-600";
            textColor = "text-white";
          } else if (isInRange && selectedStartDate && selectedEndDate && !isBooked) {
            // Only show range when we have both dates and not booked
            bgColor = "bg-blue-100";
            borderColor = "border-blue-200";
            textColor = "text-blue-600";
          } else if (isCurrentMonth) {
            textColor = "text-gray-900";
          }

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={isBooked || isPast}
              className={`
                p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200
                ${bgColor} ${borderColor} ${textColor}
                ${isCurrentMonth && !isPast && !isBooked && !isSelected && !isStartDate && !isEndDate ? 'hover:bg-gray-50 hover:border-gray-300' : ''}
                ${isBooked || isPast ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:shadow-md'}
                ${isStartDate || isEndDate ? 'font-bold' : ''}
              `}
            >
              <div className="flex items-center justify-center">
                {date.getDate()}
                {isBooked && (
                  <div className="ml-1">
                    {isConfirmed ? (
                      <CheckCircleIcon className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <XCircleIcon className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Calendar Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center text-sm text-gray-600">
          {!selectedStartDate ? (
            <p>Click a date to select your start date</p>
          ) : !selectedEndDate ? (
            <p>Click another date to select your end date, or click the same date to cancel</p>
          ) : (
            <p>Date range selected! Click start/end dates to cancel, or click other dates to adjust range</p>
          )}
          <p className="mt-1">Blue dates are selected, blue range shows your selection</p>
        </div>
      </div>
    </div>
  );
}
