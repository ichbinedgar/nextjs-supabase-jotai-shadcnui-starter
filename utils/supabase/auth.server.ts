// utils/auth.server.ts
import { createSupbaseServerClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function requireAuth(locale: string, options?: { redirectTo?: string; disableRedirect?: boolean }) {
  const supabase = await createSupbaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // If redirection is enabled and the user is not authenticated, redirect
  if (!user && !options?.disableRedirect) {
    redirect(options?.redirectTo || `/${locale}/sign-in`)
  }

  return user ? { ...user, email: user.email ?? '' } : null
}
