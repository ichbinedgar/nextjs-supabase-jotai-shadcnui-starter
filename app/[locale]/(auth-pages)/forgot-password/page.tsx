// app/[locale]/forgot-password/page.tsx
import { forgotPasswordAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface ForgotPasswordProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Message>;
}

export default async function ForgotPassword({
  params,
  searchParams,
}: ForgotPasswordProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations("ForgotPassword");

  return (
    <form
      action={forgotPasswordAction}
      className="flex-1 flex flex-col w-full gap-2 text-foreground min-w-64 max-w-64 prose dark:prose-invert"
    >
      {/* Include locale as a hidden input */}
      <input type="hidden" name="locale" value={locale} />
      
      <div>
        <h1 className="text-2xl font-medium">{t("resetPassword")}</h1>
        <p className="text-sm text-secondary-foreground">
          {t("alreadyHaveAccount")}{" "}
          <Link className="text-primary underline" href={`/${locale}/sign-in`}>
            {t("signIn")}
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input name="email" placeholder={t("emailPlaceholder")} required />
        <SubmitButton formAction={forgotPasswordAction}>
          {t("resetPassword")}
        </SubmitButton>
        <FormMessage message={resolvedSearchParams} />
      </div>
    </form>
  );
}
