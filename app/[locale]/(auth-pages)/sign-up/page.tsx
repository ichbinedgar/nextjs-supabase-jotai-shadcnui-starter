// app/[locale]/signup/page.tsx
import { signUpAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Link} from '@/i18n/routing';
import { getTranslations } from "next-intl/server";

interface SignupProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Message>;
}

export default async function Signup({
  params,
  searchParams,
}: SignupProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations("Signup");

  // If a message exists in the search parameters, show it.
  if ("message" in resolvedSearchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={resolvedSearchParams} />
      </div>
    );
  }

  return (
    <form action={signUpAction} className="flex flex-col min-w-64 max-w-64 mx-auto  prose dark:prose-invert">
      {/* Include locale as a hidden input */}
      <input type="hidden" name="locale" value={locale} />

      <h1 className="text-2xl font-medium">{t("signUp")}</h1>
      <p className="text-sm text-foreground">
        {t("alreadyHaveAccount")}{" "}
        <Link className="text-primary font-medium underline" href={`/sign-in`}>
          {t("signIn")}
        </Link>
      </p>
      <div className="flex flex-col gap-2">

          {/* Campo FULL NAME */}
        <Label htmlFor="fullName">{t("fullName")}</Label>
        <Input
          type="text"
          name="fullName"
          placeholder={t("fullNamePlaceholder")}
          required
        />

        <Label htmlFor="email">{t("email")}</Label>
        <Input name="email" placeholder={t("emailPlaceholder")} required />
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          type="password"
          name="password"
          placeholder={t("passwordPlaceholder")}
          minLength={6}
          required
        />
        
        <SubmitButton formAction={signUpAction} pendingText={t("pendingText")}>
          {t("signUp")}
        </SubmitButton>
        <FormMessage message={resolvedSearchParams} />
      </div>
    </form>
  );
}
