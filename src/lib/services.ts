import type { Service } from './types';

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export const getServices = async (query = ''): Promise<Service[]> => {
  const response = await fetch(`${API_URI}/services${query}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Could not load the services.');
  }

  return response.json();
};

// Prices are in Bangladeshi taka, for example ৳45,000
export const formatPrice = (price: number) => `৳${price.toLocaleString('en-US')}`;
