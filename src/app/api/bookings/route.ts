import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/components/supabaseClient";

interface BookingData {
  start: string; // Ensure start date is a string
  end: string;   // Ensure end date is a string
}

export async function POST(req: NextRequest) {
  const { newBookings, name, email, phone, notes } = await req.json();

  // Ensure newBookings is an array of BookingData
  if (!Array.isArray(newBookings)) {
    return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
  }

  const insertData = newBookings.map((b: BookingData) => ({
    title: `${name}'s Reservation`,
    start_date: new Date(b.start).toISOString(),
    end_date: new Date(b.end).toISOString(),
    name,
    email,
    phone,
    notes,
    confirmed: false,
  }));

  const { data, error } = await supabase.from("bookings").insert(insertData);

  if (error) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, bookings: data });
}
