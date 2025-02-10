import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { LocaleParams } from '@/utils/types';
import useProfileQuery from '@/hooks/use-profile-query';
import { requireAuth } from '@/utils/supabase/auth.server';
import Dashboard from '@/components/protected/dashboard';
import { createSupbaseServerClient } from '@/utils/supabase/server';

interface SsrDashboardProps {
  params: Promise<LocaleParams> | LocaleParams;
}

export default async function SsrDashboard({ params }: SsrDashboardProps) {
  const queryClient = new QueryClient()
  const supabase = await createSupbaseServerClient();

   const { locale } = await params
    const user = await requireAuth(locale)
  
    if (!user) {
      return null // Prevent rendering if not authenticated
    }
  

  await queryClient.prefetchQuery(useProfileQuery(
    { userUuid: user.id, client: supabase }
  ))

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard user={user} />
    </HydrationBoundary>
  )
}