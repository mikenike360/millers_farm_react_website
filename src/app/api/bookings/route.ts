// src/app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../components/supabaseClient";

export async function POST(req: NextRequest) {
  const { newBookings, name, email, phone, notes } = await req.json();

  // Convert each booking's start and end to ISO strings
  const insertData = newBookings.map((b: any) => ({
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
    // Log the error for debugging
    console.error("Supabase Insert Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, bookings: data });
}

