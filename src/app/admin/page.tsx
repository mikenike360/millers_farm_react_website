"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/components/supabaseClient";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/AlertModal";
import { 
  CalendarIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  TrashIcon,
  ClockIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const ADMIN_EMAILS = ["michael.venema2010@gmail.com"];

interface User {
  id: string;
  name: string;
  email: string;
}

interface Booking {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  start_date: string;
  end_date: string;
  confirmed: boolean;
  notes?: string;
  eventType?: string;
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [newReservationCount, setNewReservationCount] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ id: string; name: string } | null>(null);
  
  // Manual reservation state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [manualStartDate, setManualStartDate] = useState<Date | null>(null);
  const [manualEndDate, setManualEndDate] = useState<Date | null>(null);
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualEventType, setManualEventType] = useState("");
  const [manualNotes, setManualNotes] = useState("");
  
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    } else {
      setAlertMessage("Error logging out. Please try again.");
    }
  };

  // Request notification permissions
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          setNotificationsEnabled(permission === "granted");
        });
      } else {
        setNotificationsEnabled(Notification.permission === "granted");
      }
    }
  }, []);

  // Check authentication on load
  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
        return;
      }
      setUser({
        id: data.user.id,
        name: data.user.user_metadata?.name || "Unknown",
        email: data.user.email || "",
      });
    };

    checkAuth();
  }, [router]);

  // Redirect if user is not an admin
  useEffect(() => {
    if (user && !ADMIN_EMAILS.includes(user.email)) {
      setAlertMessage("Unauthorized: Only admins can access this page.");
      setTimeout(() => router.push("/"), 2000);
    }
  }, [user, router]);

  // Fetch bookings and set up real-time subscription
  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email)) return;

    async function fetchBookings() {
      const { data, error } = await supabase.from("bookings").select("*");
      if (!error && data) {
        setBookings(data);
        setNewReservationCount(data.filter((b: Booking) => !b.confirmed).length);
      }
      setLoading(false);
    }
    
    fetchBookings();

    // Set up real-time subscription for new bookings
    const subscription = supabase
      .channel('bookings_changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'bookings' 
        }, 
        (payload) => {
          const newBooking = payload.new as Booking;
          setBookings(prev => [...prev, newBooking]);
          setNewReservationCount(prev => prev + 1);
          
          // Send browser notification
          if (notificationsEnabled && newBooking) {
            const notification = new Notification("New Reservation!", {
              body: `${newBooking.name} - ${newBooking.eventType || 'Event'} on ${new Date(newBooking.start_date).toLocaleDateString()}`,
              icon: "/logo.png",
              tag: "new-reservation",
              requireInteraction: true,
            });
            
            notification.onclick = () => {
              window.focus();
              notification.close();
            };
          }
          
          // Show alert modal
          setAlertMessage(`New reservation received from ${newBooking.name} for ${newBooking.eventType || 'an event'}!`);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, notificationsEnabled]);

  // Confirm a pending reservation
  const confirmBooking = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ confirmed: true })
      .eq("id", id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, confirmed: true } : b))
      );
      setNewReservationCount(prev => Math.max(0, prev - 1));
      setAlertMessage("Reservation confirmed successfully!");
    } else {
      setAlertMessage("Error confirming booking. Please try again.");
    }
  };

  // Show delete confirmation
  const showDeleteConfirmation = (id: string, name: string) => {
    setDeleteConfirmation({ id, name });
  };

  // Delete a booking
  const deleteBooking = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (!error) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setNewReservationCount(prev => Math.max(0, prev - 1));
      setAlertMessage("Reservation deleted successfully!");
    } else {
      setAlertMessage("Error deleting booking. Please try again.");
    }
    
    // Clear the delete confirmation
    setDeleteConfirmation(null);
  };

  const pendingBookings = bookings.filter((b) => !b.confirmed);
  const confirmedBookings = bookings.filter((b) => b.confirmed);

  // Helper functions for manual reservation calendar
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Create array of dates for the calendar grid
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, -firstDayOfWeek + i + 1);
      days.push(prevDate);
    }
    
    // Add all days in the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add empty cells to complete the grid (always 42 cells total for 6 rows)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push(nextDate);
    }
    
    return days;
  };

  const isDateBooked = (date: Date) => {
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return bookings.some(booking => {
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  const isDateConfirmed = (date: Date) => {
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return bookings.some(booking => {
      if (!booking.confirmed) return false;
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  const isDateSelected = (date: Date) => {
    if (!manualStartDate) return false;
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startDate = new Date(manualStartDate.getFullYear(), manualStartDate.getMonth(), manualStartDate.getDate());
    return checkDate.getTime() === startDate.getTime();
  };

  const isDateInRange = (date: Date) => {
    if (!manualStartDate || !manualEndDate) return false;
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startDate = new Date(manualStartDate.getFullYear(), manualStartDate.getMonth(), manualStartDate.getDate());
    const endDate = new Date(manualEndDate.getFullYear(), manualEndDate.getMonth(), manualEndDate.getDate());
    return checkDate > startDate && checkDate < endDate;
  };

  const handleManualDateClick = (date: Date) => {
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
      return; // Can't select past dates
    }
    
    if (isDateBooked(date)) return; // Can't select booked dates
    
    if (!manualStartDate) {
      // First click - set start date only
      setManualStartDate(date);
      setManualEndDate(null);
    } else if (manualStartDate && !manualEndDate) {
      // Second click - set end date to complete the range
      if (date >= manualStartDate) {
        setManualEndDate(date);
      } else {
        // If second date is before first, swap them
        setManualEndDate(manualStartDate);
        setManualStartDate(date);
      }
    } else {
      // Third click (or more) - start new selection
      setManualStartDate(date);
      setManualEndDate(null);
    }
  };

  const createManualReservation = async () => {
    if (!manualName || !manualPhone || !manualEventType || !manualStartDate || !manualEndDate) {
      setAlertMessage("Please fill in all required fields and select dates.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          name: manualName,
          email: manualEmail || null,
          phone: manualPhone,
          start_date: manualStartDate.toISOString(),
          end_date: manualEndDate.toISOString(),
          confirmed: true, // Directly confirmed
          notes: manualNotes || null,
          eventType: manualEventType,
          userId: user?.id || null,
        })
        .select();

      if (error) {
        setAlertMessage("Error creating reservation. Please try again.");
        return;
      }

      if (data && data.length > 0) {
        // Add to local state
        setBookings(prev => [...prev, data[0]]);
        
        // Reset form
        setManualStartDate(null);
        setManualEndDate(null);
        setManualName("");
        setManualEmail("");
        setManualPhone("");
        setManualEventType("");
        setManualNotes("");
        
        setAlertMessage("Manual reservation created successfully!");
      }
    } catch (error) {
      setAlertMessage("Error creating reservation. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <ShieldCheckIcon className="w-16 h-16 text-primary-600 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-display">
              Admin <span className="gradient-text">Panel</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Manage reservations and bookings for Miller&apos;s Hill Farm
          </p>
          {user && (
            <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl inline-block">
              <p className="text-gray-700">
                <span className="font-semibold">Logged in as:</span> {user.name} ({user.email})
              </p>
              <div className="mt-2 flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <BellIcon className={`w-6 h-6 mr-2 ${notificationsEnabled ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="text-sm">
                    {notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled'}
                  </span>
                </div>
                {newReservationCount > 0 && (
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold animate-pulse">
                    {newReservationCount} new
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 text-sm font-medium"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <ClockIcon className="w-10 h-10 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingBookings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircleIcon className="w-10 h-10 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">{confirmedBookings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <CalendarIcon className="w-10 h-10 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Reservations */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <ClockIcon className="w-8 h-8 text-orange-500 mr-3" />
                Pending Reservations
                {newReservationCount > 0 && (
                  <span className="ml-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    {newReservationCount} new
                  </span>
                )}
              </h3>
              <p className="text-gray-600 mt-2">Reservations awaiting confirmation</p>
            </div>
            
            {pendingBookings.length === 0 ? (
              <div className="p-8 text-center">
                <ClockIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No pending reservations</p>
                <p className="text-gray-400">All current bookings have been confirmed</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Details</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <UserIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{booking.name}</p>
                              {booking.eventType && (
                                <p className="text-xs text-gray-500">{booking.eventType}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <CalendarIcon className="w-6 h-6 text-gray-400 mr-2" />
                            <div>
                              <p className="text-sm text-gray-900">
                                {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {Math.ceil((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-900">
                              <EnvelopeIcon className="w-6 h-6 text-gray-400 mr-2" />
                              {booking.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-900">
                              <PhoneIcon className="w-6 h-6 text-gray-400 mr-2" />
                              {booking.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => confirmBooking(booking.id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                              <CheckCircleIcon className="w-6 h-6 mr-1" />
                              Confirm
                            </button>
                            <button
                              onClick={() => showDeleteConfirmation(booking.id, booking.name)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                              <TrashIcon className="w-6 h-6 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Confirmed Reservations */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <CheckCircleIcon className="w-8 h-8 text-green-500 mr-3" />
                Confirmed Reservations
              </h3>
              <p className="text-gray-600 mt-2">All confirmed and active bookings</p>
            </div>
            
            {confirmedBookings.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircleIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No confirmed reservations</p>
                <p className="text-gray-400">Confirmed bookings will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Details</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {confirmedBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-full">
                              <UserIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{booking.name}</p>
                              {booking.eventType && (
                                <p className="text-xs text-gray-500">{booking.eventType}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <CalendarIcon className="w-6 h-6 text-gray-400 mr-2" />
                            <div>
                              <p className="text-sm text-gray-900">
                                {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {Math.ceil((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-900">
                              <EnvelopeIcon className="w-6 h-6 text-gray-400 mr-2" />
                              {booking.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-900">
                              <PhoneIcon className="w-6 h-6 text-gray-400 mr-2" />
                              {booking.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {booking.notes ? (
                            <div className="flex items-start">
                              <DocumentTextIcon className="w-6 h-6 text-gray-400 mr-2 mt-0.5" />
                              <p className="text-sm text-gray-900 max-w-xs truncate" title={booking.notes}>
                                {booking.notes}
                              </p>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">No notes</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => showDeleteConfirmation(booking.id, booking.name)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                          >
                            <TrashIcon className="w-6 h-6 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Manual Reservation Input Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Create Manual Reservation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Add reservations directly to the system (phone bookings, walk-ins, etc.) - these will be marked as confirmed automatically.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Dates</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h4>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((date, index) => {
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                      const isBooked = isDateBooked(date);
                      const isConfirmed = isDateConfirmed(date);
                      const isSelected = isDateSelected(date);
                      const isInRange = isDateInRange(date);
                      const isStartDate = manualStartDate && date.toDateString() === manualStartDate.toDateString();
                      const isEndDate = manualEndDate && date.toDateString() === manualEndDate.toDateString();

                      let bgColor = "bg-white";
                      let borderColor = "border-gray-200";
                      let textColor = "text-gray-400";

                      if (isPast) {
                        bgColor = "bg-gray-100";
                        borderColor = "border-gray-200";
                        textColor = "text-gray-300";
                      } else if (isConfirmed) {
                        bgColor = "bg-yellow-100";
                        borderColor = "border-yellow-300";
                        textColor = "text-yellow-800";
                      } else if (isBooked && !isConfirmed) {
                        bgColor = "bg-red-100";
                        borderColor = "border-red-300";
                        textColor = "text-red-800";
                      } else if (isStartDate) {
                        bgColor = "bg-blue-500";
                        borderColor = "border-blue-600";
                        textColor = "text-white";
                      } else if (isEndDate) {
                        bgColor = "bg-blue-500";
                        borderColor = "border-blue-600";
                        textColor = "text-white";
                      } else if (isInRange && manualStartDate && manualEndDate) {
                        bgColor = "bg-blue-100";
                        borderColor = "border-blue-200";
                        textColor = "text-blue-600";
                      } else if (isCurrentMonth) {
                        textColor = "text-gray-900";
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleManualDateClick(date)}
                          disabled={isBooked || isPast}
                          className={`
                            p-2 text-sm font-medium rounded-lg border-2 transition-all duration-200
                            ${bgColor} ${borderColor} ${textColor}
                            ${isCurrentMonth && !isPast ? 'hover:bg-gray-50' : ''}
                            ${isBooked || isPast ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:shadow-md'}
                            ${isToday ? 'ring-2 ring-primary-500 ring-offset-2' : ''}
                            ${isStartDate || isEndDate ? 'font-bold' : ''}
                          `}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-100 rounded mr-2"></div>
                        <span>Confirmed</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Reservation Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      value={manualName}
                      onChange={(e) => setManualName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter guest name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter email (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={manualPhone}
                      onChange={(e) => setManualPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      value={manualEventType}
                      onChange={(e) => setManualEventType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select event type</option>
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={manualNotes}
                      onChange={(e) => setManualNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Any additional notes or special requests"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={createManualReservation}
                      disabled={!manualName || !manualPhone || !manualEventType || !manualStartDate || !manualEndDate}
                      className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Create Confirmed Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="modal modal-open" style={{ zIndex: 10000 }}>
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete the reservation for <strong>{deleteConfirmation.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button 
                className="btn btn-neutral" 
                onClick={() => setDeleteConfirmation(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={() => deleteBooking(deleteConfirmation.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </main>
  );
}
