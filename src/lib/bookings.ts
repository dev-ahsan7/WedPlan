import { getTokenFromClient } from './getTokenFromClient';

const API_URI = process.env.NEXT_PUBLIC_API_URI;

type BookingRequest = {
  serviceId: string;
  eventDate: string;
  eventLocation: string;
  message: string;
};

// Sends a booking request and throws the server's message when it fails
export const createBooking = async (booking: BookingRequest) => {
  const token = await getTokenFromClient();
  const response = await fetch(`${API_URI}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(booking),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Could not send the booking request.');
  }
  return result;
};
