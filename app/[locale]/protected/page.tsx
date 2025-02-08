import Dashboard from '@/components/protected/dashboard'
import { requireAuth } from '@/utils/supabase/auth.server'

// Define an interface for the params object.
interface Params {
  locale: string;
}

// Define the props interface.
// The `params` property can be either a Promise or a direct object.
interface PageProps {
  params: Promise<Params> | Params;
}

export default async function ProtectedPage({ params }: PageProps) {
  const { locale } = await params
  const user = await requireAuth(locale)

  if (!user) {
    return null // Prevent rendering if not authenticated
  }

  return <Dashboard user={user} />
}
