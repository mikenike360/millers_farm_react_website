"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../components/supabaseClient"; // Adjust path based on your project structure
import { useRouter } from "next/navigation";

const ADMIN_EMAILS = ["michael.venema2010@gmail.com"]; // List your admin emails here

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [pendingBookings, setPendingBookings] = useState<any[]>([]);
  const [confirmedBookings, setConfirmedBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Check authentication when the page loads
  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login"); // Redirect to login page if not authenticated
        return;
      }
      setUser(data.user);
    };
    checkAuth();
  }, [router]);

  // 2. Redirect non-admins to home page
  useEffect(() => {
    if (user && !ADMIN_EMAILS.includes(user.email)) {
      alert("Unauthorized: Only admins can access this page.");
      router.push("/");
    }
  }, [user, router]);

  // 3. Fetch both pending and confirmed reservations for admins
  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email)) return;

    async function fetchBookings() {
      // Fetch pending (unconfirmed) bookings
      const { data: pendingData, error: pendingError } = await supabase
        .from("bookings")
        .select("*")
        .eq("confirmed", false);
      // Fetch confirmed bookings
      const { data: confirmedData, error: confirmedError } = await supabase
        .from("bookings")
        .select("*")
        .eq("confirmed", true);

      if (!pendingError && pendingData) {
        setPendingBookings(pendingData);
      }
      if (!confirmedError && confirmedData) {
        setConfirmedBookings(confirmedData);
      }
      setLoading(false);
    }
    fetchBookings();
  }, [user]);

  // Confirm a pending reservation (move it from pending to confirmed)
  const confirmBooking = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ confirmed: true })
      .eq("id", id);

    if (error) {
      alert("Error confirming booking!");
    } else {
      // Remove from pending and add to confirmed (or refetch both)
      const updatedPending = pendingBookings.filter((b) => b.id !== id);
      setPendingBookings(updatedPending);
      // Optionally, fetch the updated record and add it to confirmed
      const { data } = await supabase.from("bookings").select("*").eq("id", id).single();
      setConfirmedBookings([...confirmedBookings, data]);
      alert("Reservation confirmed!");
    }
  };

  // Delete a reservation (can be pending or confirmed)
  const deleteBooking = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting booking!");
    } else {
      setPendingBookings(pendingBookings.filter((b) => b.id !== id));
      setConfirmedBookings(confirmedBookings.filter((b) => b.id !== id));
      alert("Reservation deleted!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Panel</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Pending Reservations Section */}
          <h3 className="text-xl font-bold mt-4">Pending Reservations</h3>
          {pendingBookings.length === 0 ? (
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
                {pendingBookings.map((booking) => (
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

          {/* Confirmed Reservations Section */}
          <h3 className="text-xl font-bold mt-8">Confirmed Reservations</h3>
          {confirmedBookings.length === 0 ? (
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
                {confirmedBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border px-4 py-2">{booking.name}</td>
                    <td className="border px-4 py-2">
                      {new Date(booking.start_date).toLocaleDateString()} -{" "}
                      {new Date(booking.end_date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{booking.email}</td>
                    <td className="border px-4 py-2">{booking.phone}</td>
                    <td className="border px-4 py-2">{booking.notes}</td>
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
