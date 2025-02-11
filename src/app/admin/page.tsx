"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/components/supabaseClient"; // Adjust path if necessary
import { useRouter } from "next/navigation";

const ADMIN_EMAILS = ["michael.venema2010@gmail.com"]; // List your admin emails

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
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      alert("Unauthorized: Only admins can access this page.");
      router.push("/");
    }
  }, [user, router]);

  // Fetch bookings
  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email)) return;

    async function fetchBookings() {
      const { data, error } = await supabase.from("bookings").select("*");
      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    }
    
    fetchBookings();
  }, [user]);

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
      alert("Reservation confirmed!");
    } else {
      alert("Error confirming booking!");
    }
  };

  // Delete a booking
  const deleteBooking = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (!error) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      alert("Reservation deleted!");
    } else {
      alert("Error deleting booking!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Panel</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Pending Reservations */}
          <h3 className="text-xl font-bold mt-4">Pending Reservations</h3>
          {bookings.filter((b) => !b.confirmed).length === 0 ? (
            <p className="text-center text-gray-500">No pending reservations.</p>
          ) : (
            <table className="table-auto w-full mt-2">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Dates</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter((b) => !b.confirmed)
                  .map((booking) => (
                    <tr key={booking.id}>
                      <td className="border px-4 py-2">{booking.name}</td>
                      <td className="border px-4 py-2">
                        {new Date(booking.start_date).toLocaleDateString()} -{" "}
                        {new Date(booking.end_date).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">{booking.email}</td>
                      <td className="border px-4 py-2">{booking.phone}</td>
                      <td className="border px-4 py-2 flex gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => confirmBooking(booking.id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* Confirmed Reservations */}
          <h3 className="text-xl font-bold mt-8">Confirmed Reservations</h3>
          {bookings.filter((b) => b.confirmed).length === 0 ? (
            <p className="text-center text-gray-500">No confirmed reservations.</p>
          ) : (
            <table className="table-auto w-full mt-2">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Dates</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Notes</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .filter((b) => b.confirmed)
                  .map((booking) => (
                    <tr key={booking.id}>
                      <td className="border px-4 py-2">{booking.name}</td>
                      <td className="border px-4 py-2">
                        {new Date(booking.start_date).toLocaleDateString()} -{" "}
                        {new Date(booking.end_date).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">{booking.email}</td>
                      <td className="border px-4 py-2">{booking.phone}</td>
                      <td className="border px-4 py-2">{booking.notes || "N/A"}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
