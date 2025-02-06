// app/Providers.tsx
import { ReactNode } from 'react';
 import ClientProvider from './auth/client-provider';
import { requireAuth } from '@/utils/supabase/auth.server';

interface ProvidersProps {
  children: ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  const hasValidEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Use requireAuth to fetch the user but disable redirect (since Providers should not handle navigation)
  const initialUser = hasValidEnv ? await requireAuth({ disableRedirect: true }) : null;

  // Bundle the configuration values into a single object.
  const config = { initialUser, hasValidEnv };

  return (
    <ClientProvider config={config}>
      {children}
    </ClientProvider>
  );
}
