import { getTokenFromServer } from './getTokenFromServer';
import type { AdminOverview, AdminUser, Booking, Service, Transaction } from './types';

const API_URI = process.env.NEXT_PUBLIC_API_URI;

// Every dashboard request sends the user's token to the server
const fetchWithToken = async (path: string) => {
  const token = await getTokenFromServer();
  const response = await fetch(`${API_URI}${path}`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Could not load your dashboard data.');
  }

  return response.json();
};

export const getVendorServices = (): Promise<Service[]> =>
  fetchWithToken('/vendor/services');

export const getVendorBookings = (): Promise<Booking[]> =>
  fetchWithToken('/vendor/bookings');

export const getMyBookings = (): Promise<Booking[]> => fetchWithToken('/bookings/my');

export const getAdminOverview = (): Promise<AdminOverview> =>
  fetchWithToken('/admin/overview');

export const getAdminUsers = (query = ''): Promise<AdminUser[]> =>
  fetchWithToken(`/admin/users${query}`);

export const getAdminServices = (query = ''): Promise<Service[]> =>
  fetchWithToken(`/admin/services${query}`);

export const getAdminTransactions = (): Promise<Transaction[]> =>
  fetchWithToken('/admin/transactions');
