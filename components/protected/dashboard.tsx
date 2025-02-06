'use client'
import useProfileQuery from '@/hooks/use-profile-query'
import { profileAtom } from '@/utils/atoms/atoms'
import { authUserAtom } from '@/utils/atoms/authAtoms'
import { useAtom } from 'jotai'
import { InfoIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

interface DashboardProps {
  user: any
}

export default function Dashboard({ user }: DashboardProps) {
  const [authUser, setAuthUser] = useAtom(authUserAtom)
  const [profile, setProfile] = useAtom(profileAtom)
  // ✅ Update Jotai state from server-provided user
  useEffect(() => {
    if (!authUser && user) {
      setAuthUser(user)
    }
  }, [authUser, user, setAuthUser])

  if (!authUser) {
    redirect('/sign-in')
  }


  
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useProfileQuery(authUser?.id ?? '');


  return (
    <div className='flex-1 w-full flex flex-col gap-12'>
      fsdfasd
      <div className='w-full'>
        <div className='bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center'>
          <InfoIcon size='16' strokeWidth={2} />
          page This is a protected page that you can only see as an authenticated user
        </div>
      </div>
      <div className='flex flex-col gap-2 items-start'>
        <h2 className='font-bold text-2xl mb-4'>Your user details</h2>
        <pre className='text-xs font-mono p-3 rounded border max-h-32 overflow-auto'>
          {JSON.stringify(user, null, 2)}
         
        </pre>
        <pre className='text-xs font-mono p-3 rounded border max-h-32 overflow-auto'>
           {isLoading ? 'loading' :JSON.stringify(profileData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
