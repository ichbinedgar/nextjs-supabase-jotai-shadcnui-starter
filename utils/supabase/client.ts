import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

export type CustomSupbaseClient = SupabaseClient<Database>

let client: CustomSupbaseClient | null = null

export const getSupbaseClient = () => {
  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey)

  return client
}
