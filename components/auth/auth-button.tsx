// src/components/AuthButton.tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { useAtom } from "jotai";
import { signOutAction } from "@/app/[locale]/actions";
import Link from "next/link";
import { authUserAtom } from "@/utils/atoms/authAtoms";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { hasValidEnvAtom } from "@/utils/atoms/atoms";

export default function AuthButton() {
  // Retrieve the current locale
  const locale = useLocale();
  // Initialize translations for the "AuthButton" namespace
  const t = useTranslations("AuthButton");
  const [user] = useAtom(authUserAtom);
  const [hasValidEnv] = useAtom(hasValidEnvAtom);
  // If the environment variables aren’t configured, show a warning
  if (!hasValidEnv) {
    return (
      <div className="flex gap-4 items-center">
        <div>
          <Badge variant="default" className="font-normal pointer-events-none">
            {t("updateEnv")}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            disabled
            className="opacity-75 cursor-not-allowed pointer-events-none"
          >
            <Link href={`/${locale}/sign-in`}>{t("signIn")}</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="default"
            disabled
            className="opacity-75 cursor-not-allowed pointer-events-none"
          >
            <Link href={`/${locale}/sign-up`}>{t("signUp")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Show different UI based on whether a user is logged in
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span>{t("greeting", { email: user.email })}</span>
        <form action={signOutAction}>
          {/* Hidden input to send the locale */}
          <input type="hidden" name="locale" value={locale} />
          <Button type="submit" variant="outline">
            {t("signOut")}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href={`/${locale}/sign-in`}>{t("signIn")}</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href={`/${locale}/sign-up`}>{t("signUp")}</Link>
      </Button>
    </div>
  );
}
