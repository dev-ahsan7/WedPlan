import { getTokenFromClient } from './getTokenFromClient';

const API_URI = process.env.NEXT_PUBLIC_API_URI;

// Sends a request with the user's token and throws the server's message on errors
export const sendWithToken = async (method: string, path: string, body?: object) => {
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
