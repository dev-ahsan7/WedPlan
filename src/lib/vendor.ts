import { getTokenFromClient } from './getTokenFromClient';

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export type ServiceInput = {
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
};

// Sends a request with the user's token and throws the server's message on errors
const sendWithToken = async (method: string, path: string, body?: object) => {
  const token = await getTokenFromClient();
  const response = await fetch(`${API_URI}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong. Please try again.');
  }
  return result;
};

export const createService = (service: ServiceInput) =>
  sendWithToken('POST', '/services', service);

export const updateService = (id: string, service: ServiceInput) =>
  sendWithToken('PATCH', `/services/${id}`, service);

export const setServiceAvailability = (id: string, isActive: boolean) =>
  sendWithToken('PATCH', `/services/${id}/availability`, { isActive });

export const deleteService = (id: string) => sendWithToken('DELETE', `/services/${id}`);

export const respondToBooking = (id: string, status: 'accepted' | 'rejected') =>
  sendWithToken('PATCH', `/vendor/bookings/${id}`, { status });
