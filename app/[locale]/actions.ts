'use server'

import { encodedRedirect } from '@/utils/utils'
import { createSupbaseServerClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect, routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export const signUpAction = async (formData: FormData) => {
  const DEFAULT_LANGUAGE = routing.defaultLocale

  console.log('DEFAULT_LANGUAGE', DEFAULT_LANGUAGE)

  const t = await getTranslations('Actions')
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const fullName = formData.get('fullName')?.toString()
  // Get locale from form values (default to "en" if not provided)
  const locale = formData.get('locale')?.toString() || DEFAULT_LANGUAGE
  const supabase = await createSupbaseServerClient()
  const origin = (await headers()).get('origin')

  if (!email || !password) {
    return encodedRedirect('error', '/sign-up', t('emailAndPasswordRequired'), locale)
  }
  if (!fullName) {
    return encodedRedirect('error', '/sign-up', t('fullNameRequired'), locale)
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?locale=${locale}`,
      data: {
        full_name: fullName //  Add the full name to the user data
      }
    }
  })

  if (error) {
    console.error(`${error.code} ${error.message}`)
    return encodedRedirect('error', '/sign-up', error.message, locale)
  }
  return encodedRedirect('success', '/sign-up', t('signupSuccessMessage'), locale)
}

export const signInAction = async (formData: FormData) => {
  const DEFAULT_LANGUAGE = routing.defaultLocale

  const t = await getTranslations('Actions')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  // Get locale from form values
  const locale = formData.get('locale')?.toString() || DEFAULT_LANGUAGE
  const supabase = await createSupbaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message, locale)
  }

  return redirect({
    href: '/protected',
    locale: locale || DEFAULT_LANGUAGE
  })
}

export const forgotPasswordAction = async (formData: FormData) => {
  const DEFAULT_LANGUAGE = routing.defaultLocale

  const t = await getTranslations('Actions')
  const email = formData.get('email')?.toString()
  // Get locale from form values
  const locale = formData.get('locale')?.toString() || DEFAULT_LANGUAGE
  const supabase = await createSupbaseServerClient()
  const origin = (await headers()).get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect('error', '/forgot-password', t('emailRequired'), locale)
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/${locale}/protected/reset-password&locale=${locale}`
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect('error', '/forgot-password', t('couldNotResetPassword'), locale)
  }

  if (callbackUrl) {
    return redirect({
      href: callbackUrl,
      locale: locale || DEFAULT_LANGUAGE
    })
  }

  return encodedRedirect('success', '/forgot-password', t('checkEmailForResetLink'), locale)
}

export const resetPasswordAction = async (formData: FormData) => {
  const DEFAULT_LANGUAGE = routing.defaultLocale

  const t = await getTranslations('Actions')
  // Get locale from form values
  const locale = formData.get('locale')?.toString() || DEFAULT_LANGUAGE
  const supabase = await createSupbaseServerClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return encodedRedirect('error', '/protected/reset-password', t('passwordsRequired'), locale)
  }

  if (password !== confirmPassword) {
    return encodedRedirect('error', '/protected/reset-password', t('passwordsDoNotMatch'), locale)
  }

  const { error } = await supabase.auth.updateUser({
    password
  })

  if (error) {
    return encodedRedirect('error', '/protected/reset-password', t('passwordUpdateFailed'), locale)
  }

  return encodedRedirect('success', '/protected/reset-password', t('passwordUpdated'), locale)
}

export const signOutAction = async (formData: FormData) => {
  const DEFAULT_LANGUAGE = routing.defaultLocale
  // Get locale from form values
  const locale = formData.get('locale')?.toString() || DEFAULT_LANGUAGE
  const supabase = await createSupbaseServerClient()
  await supabase.auth.signOut()
  return redirect({
    href: '/sign-in',
    locale: locale || DEFAULT_LANGUAGE
  })
}

export const signOutActionNavUser = async (locale: string) => {
  const DEFAULT_LANGUAGE = routing.defaultLocale
  const supabase = await createSupbaseServerClient()
  await supabase.auth.signOut()
  return redirect({
    href: '/sign-in',
    locale: locale || DEFAULT_LANGUAGE
  })
}
