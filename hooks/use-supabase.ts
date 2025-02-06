import { getSupbaseClient } from '@/utils/supabase/client'
import { useMemo } from 'react'

function useSupabase() {
  return useMemo(getSupbaseClient, [])
}

export default useSupabase
