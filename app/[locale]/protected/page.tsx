import Dashboard from "@/components/protected/dashboard";
import { requireAuth } from "@/utils/supabase/auth.server";

 
export default async function ProtectedPage() {

  const user = await requireAuth();

  if (!user) {
    return null; // Prevent rendering if not authenticated
  }
 
  return (
    <div>
      <Dashboard user={user} />
    </div>
  );
}
