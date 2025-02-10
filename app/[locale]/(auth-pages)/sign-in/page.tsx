// app/[locale]/login/page.tsx
import { signInAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Link} from '@/i18n/routing';
import { getTranslations } from "next-intl/server";

interface LoginProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Message>;
}

export default async function Login({
  params,
  searchParams,
}: LoginProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations("Login");

  return (
    <form action={signInAction} className="flex-1 flex flex-col min-w-64 prose dark:prose-invert mx-auto">
      {/* Hidden input to include locale */}
      <input type="hidden" name="locale" value={locale} />

      <h1 className="text-2xl font-medium">{t("signIn")}</h1>
      <p className="text-sm text-foreground">
        {t("dontHaveAccount")}{" "}
        <Link className="text-foreground font-medium underline" href={`/sign-up`}>
          {t("signUp")}
        </Link>
      </p>
      <div className="flex flex-col gap-4">
        <Label htmlFor="email">{t("email")}</Label>
        <Input name="email" placeholder={t("emailPlaceholder")} required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">{t("password")}</Label>
          <Link
            className="text-xs text-foreground underline"
            href={`/forgot-password`}
          >
            {t("forgotPassword")}
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder={t("passwordPlaceholder")}
          required
        />
        <SubmitButton pendingText={t("pendingText")} formAction={signInAction}>
          {t("signIn")}
        </SubmitButton>
        <FormMessage message={resolvedSearchParams} />
      </div>
    </form>
  );
}
