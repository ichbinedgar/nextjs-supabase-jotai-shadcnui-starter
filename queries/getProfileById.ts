import { CustomSupbaseClient } from '@/utils/supabase/client'

const getProfileById = async (client: CustomSupbaseClient, userUuid: string) => {
  return client.from('profiles').select('*').eq('id', userUuid).single()
}

export default getProfileById
