import { routing } from '@/i18n/routing'
import { createSupbaseServerClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const DEFAULT_LANGUAGE = routing.defaultLocale
  const code = requestUrl.searchParams.get('code')
  const locale = requestUrl.searchParams.get('locale') || DEFAULT_LANGUAGE
  const origin = requestUrl.origin
  const redirectTo = requestUrl.searchParams.get('redirect_to')

  if (code) {
    const supabase = await createSupbaseServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  if (redirectTo) {
    // Ejemplo: si redirect_to = "/profile", tu URL final será
    //          https://tusitio.com/es/profile
    return NextResponse.redirect(`${origin}/${locale}${redirectTo}`)
  }

  return NextResponse.redirect(`${origin}/${locale}/protected`)
}
