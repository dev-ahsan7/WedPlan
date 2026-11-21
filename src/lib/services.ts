import { getTokenFromServer } from './getTokenFromServer';
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

// Returns null when the service doesn't exist or isn't visible to this user
export const getService = async (id: string): Promise<Service | null> => {
  const token = await getTokenFromServer();
  const response = await fetch(`${API_URI}/services/${id}`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Could not load this service.');
  }

  return response.json();
};

// The location filter is optional, so the page still works without it
export const getLocations = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URI}/services/locations`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch {
    return [];
  }
};
