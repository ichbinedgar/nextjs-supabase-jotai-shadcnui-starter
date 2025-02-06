// app/[locale]/reset-password/page.tsx
import { resetPasswordAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTranslations } from "next-intl/server";

interface ResetPasswordProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Message>;
}

export default async function ResetPassword({
  params,
  searchParams,
}: ResetPasswordProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations("ResetPassword");

  return (
    <form
      action={resetPasswordAction}
      className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
    >
      {/* Pass the locale value to the server via a hidden input */}
      <input type="hidden" name="locale" value={locale} />
      
      <h1 className="text-2xl font-medium">{t("resetPasswordTitle")}</h1>
      <p className="text-sm text-foreground/60">
        {t("resetPasswordSubtitle")}
      </p>
      <Label htmlFor="password">{t("newPasswordLabel")}</Label>
      <Input
        type="password"
        name="password"
        placeholder={t("newPasswordPlaceholder")}
        required
      />
      <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder={t("confirmPasswordPlaceholder")}
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        {t("resetPasswordButton")}
      </SubmitButton>
      <FormMessage message={resolvedSearchParams} />
    </form>
  );
}
