import { ThemeSwitcher } from '@/components/non-protected-layout/theme-switcher'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import Providers from '@/components/providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navigation from '@/components/non-protected-layout/navigation'
import NotFoundPage from './not-found'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/protected-page-layout/app-sidebar'
import { requireAuth } from '@/utils/supabase/auth.server'

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const { locale } = await params
  const user = await requireAuth(locale,{
    disableRedirect: true
  })

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'es')) {
    return (
      <html lang={locale} suppressHydrationWarning>
        <body className='bg-background text-foreground prose dark:prose-invert'>
          <NotFoundPage />
        </body>
      </html>
    )
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  if (!user) {
    return (
      <html lang={locale} suppressHydrationWarning>
        <body className='bg-background text-foreground'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Providers locale={locale}>
              <NextIntlClientProvider messages={messages}>
                <main className='min-h-screen flex flex-col items-center'>
                  <div className='flex-1 w-full flex flex-col items-center'>
                    <Navigation />
                    <div className='flex flex-col max-w-5xl p-5'>{children}</div>
                    <footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16'>
                      <ThemeSwitcher />
                    </footer>
                  </div>
                </main>
              </NextIntlClientProvider>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <Providers locale={locale}>
            <NextIntlClientProvider messages={messages}>
              <SidebarProvider>
                <AppSidebar />
                <main>
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            </NextIntlClientProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
