// Pushover Configuration
// 1. Go to https://pushover.net/apps/build
// 2. Create a new application called "Miller's Hill Farm"
// 3. Copy the API token and replace PUSHOVER_APP_TOKEN below
const PUSHOVER_USER_KEY = "ucfqiea5qxhr4totpimfv3dwgy5sik";
const PUSHOVER_APP_TOKEN = "aky958c95v8kg1fn2mzdj5jnzmu9m5"; // Replace with your app token

interface PushoverNotification {
  title: string;
  message: string;
  priority?: number; // -2 to 2, 2 being highest priority
  sound?: string;
  url?: string;
  url_title?: string;
  expire?: number; // Time in seconds for priority=2 notifications
  retry?: number; // Retry interval in seconds for priority=2 notifications
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  start_date: string;
  end_date: string;
  eventType?: string;
  notes?: string;
}

export async function sendPushoverNotification(notification: PushoverNotification) {
  // Don't send if app token isn't set
  if (!PUSHOVER_APP_TOKEN) {
    console.warn("Pushover app token not configured. Skipping notification.");
    return false;
  }

  console.log("Attempting to send Pushover notification:", notification);

  try {
    const response = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: PUSHOVER_APP_TOKEN,
        user: PUSHOVER_USER_KEY,
        title: notification.title,
        message: notification.message,
        priority: notification.priority || 0,
        sound: notification.sound || "pushover",
        url: notification.url || "https://millershill.com/admin",
        url_title: notification.url_title || "View Admin Panel",
        ...(notification.expire && { expire: notification.expire }), // Add expire if present
        ...(notification.retry && { retry: notification.retry }), // Add retry if present
      }),
    });

    console.log("Pushover API response status:", response.status);

    if (!response.ok) {
      console.error("Pushover API error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Pushover error response:", errorText);
      return false;
    }

    const result = await response.json();
    console.log("Pushover API response:", result);
    
    if (result.status !== 1) {
      console.error("Pushover notification failed:", result);
      return false;
    }
    
    console.log("Pushover notification sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending Pushover notification:", error);
    return false;
  }
}

export function formatReservationNotification(booking: Booking) {
  const startDate = new Date(booking.start_date).toLocaleDateString();
  const endDate = new Date(booking.end_date).toLocaleDateString();
  const duration = Math.ceil(
    (new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  const title = `New ${booking.eventType || 'Reservation'}`;
  const message = `${booking.name} - ${startDate} to ${endDate} (${duration} days). Contact: ${booking.email} | ${booking.phone}${booking.notes ? `. Notes: ${booking.notes.substring(0, 100)}` : ''}`;

  const isHighPriority = booking.eventType === 'Wedding';
  
  return {
    title,
    message,
    priority: isHighPriority ? 2 : 1,
    sound: isHighPriority ? 'cosmic' : 'pushover',
    expire: isHighPriority ? 3600 : undefined, // 1 hour for high priority notifications
    retry: isHighPriority ? 300 : undefined, // 5 minutes retry for high priority notifications
  };
}
