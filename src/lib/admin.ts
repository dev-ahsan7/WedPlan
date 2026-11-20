import { sendWithToken } from './sendWithToken';
import type { AdminUserDetails } from './types';

export const getUserDetails = (id: string): Promise<AdminUserDetails> =>
  sendWithToken('GET', `/admin/users/${id}`);

export const setUserBlocked = (id: string, isBlocked: boolean) =>
  sendWithToken('PATCH', `/admin/users/${id}/block`, { isBlocked });

export const setServiceStatus = (id: string, status: string) =>
  sendWithToken('PATCH', `/admin/services/${id}/status`, { status });
