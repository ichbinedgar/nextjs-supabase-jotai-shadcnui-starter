import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../database.types'

export type CustomSupbaseClient = SupabaseClient<Database>

let client: CustomSupbaseClient | null = null

export const getSupbaseClient = () => {
  if (client) {
    return client
  }

  client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  return client
}
