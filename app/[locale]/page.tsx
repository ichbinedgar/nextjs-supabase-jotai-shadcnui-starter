import Hero from "@/components/hero";
import { requireAuth } from "@/utils/supabase/auth.server";
import { redirect } from "next/navigation";

// Define an interface for the params object.
interface Params {
  locale: string;
}

// Define the props interface.
// The `params` property can be either a Promise or a direct object.
interface PageProps {
  params: Promise<Params> | Params;
}

export default async function Home({ params }: PageProps) {
  // Await params if it's a promise; otherwise, use it directly.
  const resolvedParams: Params = params instanceof Promise ? await params : params;
  const locale = resolvedParams.locale || "es"; // Provide a fallback locale

  // Check user authentication.
  const user = await requireAuth({
    disableRedirect: true,
  });


  if (user?.id) {
    // Redirect to the localized protected route
    redirect(`/${locale}/protected`);
  }

  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Welcome</h2>
      </main>
    </>
  );
}
