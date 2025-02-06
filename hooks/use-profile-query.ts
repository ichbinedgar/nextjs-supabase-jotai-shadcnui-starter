import { useQuery } from '@tanstack/react-query'
import useSupabase from './use-supabase'
import getProfileById from '@/queries/getProfileById'

const useProfileQuery = (userUuid: string) => {
  const client = useSupabase()
  const queryKey = ['profile', userUuid]

  const queryFn = async () => {
    return getProfileById(client, userUuid).then((result) => result.data)
  }

  return useQuery({ queryKey, queryFn })
}

export default useProfileQuery
