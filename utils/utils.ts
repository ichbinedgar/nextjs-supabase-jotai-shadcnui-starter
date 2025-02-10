import { redirect, routing } from '@/i18n/routing'

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string, locale?: string) {
  const DEFAULT_LANGUAGE = routing.defaultLocale
  //  `${path}?${type}=${encodeURIComponent(message)}`
  return redirect({
    href: `${path}?${type}=${encodeURIComponent(message)}`,
    locale: locale || DEFAULT_LANGUAGE
  })
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
