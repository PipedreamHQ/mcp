'use client';

import { useSession } from 'next-auth/react';
import { useAuthContext } from '@/components/session-provider';

export function useEffectiveSession() {
  const { data: session, status } = useSession();
  const { isAuthDisabled, guestSession } = useAuthContext();

  // If auth is disabled, always return the guest session
  if (isAuthDisabled && guestSession) {
    return {
      data: {
        ...guestSession,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      },
      status: 'authenticated' as const,
      update: () => Promise.resolve(null)
    };
  }

  // Otherwise return the real session
  return { data: session, status, update: () => Promise.resolve(null) };
}