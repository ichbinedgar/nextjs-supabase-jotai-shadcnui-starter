import getProfileById from '@/queries/getProfileById'
import type { CustomSupbaseClient } from '@/utils/supabase/client'

type ProfileQuery = {
  userUuid: string
  client: CustomSupbaseClient
}

const useProfileQuery = ({ userUuid, client }: ProfileQuery) => {
  const queryKey = ['profile', userUuid]

  const queryFn = async () => {
    return getProfileById(client, userUuid).then((result) => result.data)
  }

  return { queryKey, queryFn }
}

export default useProfileQuery
