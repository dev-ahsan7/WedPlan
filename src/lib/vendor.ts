import { sendWithToken } from './sendWithToken';

export type ServiceInput = {
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
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
