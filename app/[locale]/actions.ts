'use server'

import { encodedRedirect } from '@/utils/utils'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

export const signUpAction = async (formData: FormData) => {
  const t = await getTranslations('Actions')
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  // Get locale from form values (default to "en" if not provided)
  const locale = formData.get('locale')?.toString() || 'en'
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  if (!email || !password) {
    return encodedRedirect('error', `/${locale}/sign-up`, t('emailAndPasswordRequired'))
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return encodedRedirect('error', `/${locale}/sign-up`, error.message)
  } else {
    return encodedRedirect('success', `/${locale}/sign-up`, t('signupSuccessMessage'))
  }
}

export const signInAction = async (formData: FormData) => {
  const t = await getTranslations('Actions')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  // Get locale from form values
  const locale = formData.get('locale')?.toString() || 'en'
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return encodedRedirect('error', `/${locale}/sign-in`, error.message)
  }

  return redirect(`/${locale}/protected`)
}

export const forgotPasswordAction = async (formData: FormData) => {
  const t = await getTranslations('Actions')
  const email = formData.get('email')?.toString()
  // Get locale from form values
  const locale = formData.get('locale')?.toString() || 'en'
  const supabase = await createClient()
  const origin = (await headers()).get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect('error', `/${locale}/forgot-password`, t('emailRequired'))
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/${locale}/protected/reset-password`
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect('error', `/${locale}/forgot-password`, t('couldNotResetPassword'))
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect('success', `/${locale}/forgot-password`, t('checkEmailForResetLink'))
}

export const resetPasswordAction = async (formData: FormData) => {
  const t = await getTranslations('Actions')
  // Get locale from form values
  const locale = formData.get('locale')?.toString() || 'en'
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return encodedRedirect('error', `/${locale}/protected/reset-password`, t('passwordsRequired'))
  }

  if (password !== confirmPassword) {
    return encodedRedirect('error', `/${locale}/protected/reset-password`, t('passwordsDoNotMatch'))
  }

  const { error } = await supabase.auth.updateUser({
    password
  })

  if (error) {
    return encodedRedirect('error', `/${locale}/protected/reset-password`, t('passwordUpdateFailed'))
  }

  return encodedRedirect('success', `/${locale}/protected/reset-password`, t('passwordUpdated'))
}

export const signOutAction = async (formData: FormData) => {
  console.log('Signing out...', formData)

  // Get locale from form values
  const locale = formData.get('locale')?.toString() || 'en'
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect(`/${locale}/sign-in`)
}
