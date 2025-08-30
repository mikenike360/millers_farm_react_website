import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/components/supabaseClient";
import { sendPushoverNotification, formatReservationNotification } from "@/components/pushoverService";

console.log("Pushover service imported successfully");
console.log("sendPushoverNotification function:", typeof sendPushoverNotification);
console.log("formatReservationNotification function:", typeof formatReservationNotification);

interface BookingData {
  start: string; // Ensure start date is a string
  end: string;   // Ensure end date is a string
}

interface Booking {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  eventType?: string;
  confirmed: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { newBookings, name, email, phone, notes, eventType } = await req.json();

    // Ensure newBookings is an array of BookingData
    if (!Array.isArray(newBookings)) {
      return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
    }

    const insertData = newBookings.map((b: BookingData) => ({
      title: `${name}'s ${eventType || 'Reservation'}`,
      start_date: new Date(b.start).toISOString(),
      end_date: new Date(b.end).toISOString(),
      name,
      email,
      phone,
      notes,
      eventType,
      confirmed: false,
    }));

    const { data, error } = await supabase
      .from("bookings")
      .insert(insertData)
      .select(); // Add .select() to return the inserted data

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    // Send Pushover notification for the new booking
    if (data && data.length > 0) {
      console.log("About to send notification for booking:", data[0]);
      const booking = data[0] as Booking; // Get the first booking for notification
      const notification = formatReservationNotification(booking);
      console.log("Formatted notification:", notification);
      
      // Send notification asynchronously - don't block the booking
      console.log("Calling sendPushoverNotification...");
      sendPushoverNotification(notification).catch((notificationError) => {
        console.error("Failed to send notification:", notificationError);
        // Don't fail the booking if notification fails
      });
    } else {
      console.log("No data returned from Supabase, skipping notification");
    }

    return NextResponse.json({ success: true, bookings: data });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
