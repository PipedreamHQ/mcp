'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { createContext, useContext } from 'react';

type AuthContextType = {
  isAuthDisabled: boolean;
  guestSession?: {
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
};

const AuthContext = createContext<AuthContextType>({ isAuthDisabled: false });

export function SessionProvider({ 
  children, 
  isAuthDisabled, 
  guestSession 
}: { 
  children: React.ReactNode;
  isAuthDisabled: boolean;
  guestSession?: {
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}) {
  // For NextAuth, we need to provide a full session object with expires
  const session = isAuthDisabled ? (guestSession ? {
    ...guestSession,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
  } : undefined) : undefined;
  
  
  return (
    <AuthContext.Provider value={{ isAuthDisabled, guestSession }}>
      <NextAuthSessionProvider session={session}>
        {children}
      </NextAuthSessionProvider>
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}