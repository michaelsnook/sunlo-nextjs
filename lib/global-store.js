import supabase from './supabase-client'
import useSWR from 'swr'
import { createContext, useState, useEffect, useContext, useMemo } from 'react'

// stolen shamelessly from https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig

const GlobalStateContext = createContext({
  user: {},
  profile: {},
  profileError: {},
  mutateProfile: () => {},
})

const fetcher = async user_id => {
  const { data, error } = await supabase
    .from('profile')
    .select(`*, decks:user_deck(*)`)
    .eq('id', user_id)
    .single()

  if (error) throw error
  return data
}

export function GlobalStateProvider(props) {
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(supabase.auth.user())
    console.log('use effect and set user')
  }, [])
  const {
    data: profile,
    error: profileError,
    mutate: mutateProfile,
  } = useSWR(user?.id, fetcher)

  const { publicURL } = supabase.storage
    .from('avatars')
    .getPublicUrl('msnoo-avatar.png')

  const value = useMemo(() => {
    return {
      user,
      profile: {
        avatar_public_url: publicURL,
        ...profile,
      },
      profileError,
      mutateProfile,
    }
  }, [user, profile, profileError, mutateProfile])

  return <GlobalStateContext.Provider value={value} {...props} />
}

// a hook to use whenever we need to consume data from `GlobalStateProvider`.
// So, We don't need React.useContext everywhere we need data from GlobalStateContext.

export function useGlobalState() {
  const context = useContext(GlobalStateContext)

  if (!context) {
    throw new Error('You need to wrap GlobalStateProvider.')
  }

  return context
}
