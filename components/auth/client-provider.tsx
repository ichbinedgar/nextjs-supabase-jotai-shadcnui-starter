// app/ClientProvider.tsx
"use client";

import { hasValidEnvAtom } from '@/utils/atoms/atoms';
import { authUserAtom } from '@/utils/atoms/authAtoms';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider } from 'jotai';
import { ReactNode } from 'react';


interface Config {
  initialUser: any; // Replace with your actual user type if available.
  hasValidEnv: boolean;
}

interface ClientProviderProps {
  config: Config;
  children: ReactNode;
}

export default function ClientProvider({ config, children }: ClientProviderProps) {
  const { initialUser, hasValidEnv } = config;

  // Create a new custom store.
  const store = createStore();
  // Seed the store with the initial values.
  store.set(authUserAtom, initialUser);
  store.set(hasValidEnvAtom, hasValidEnv);

  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}><Provider store={store}>{children}</Provider></QueryClientProvider>;
}
