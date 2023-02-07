import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from 'lib/supabase-client'
import { useRouter } from 'next/router'
import { prependAndDedupe } from './data-helpers'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const blankProfile = {
  user: null,
  profile: null,
  profileError: null,
  decks: null,
  isLoading: true,
}

const GlobalStateContext = createContext(blankProfile)

const profileContextObject = profileResponseData => {
  console.log('convert profileResponse to context { profile, decks }')
  // a successful profile response!
  // extract decks to its own top-level item
  // and calculate the publicURL of the avatar
  if (!profileResponseData) return blankProfile
  let { decks, ...profile } = profileResponseData
  const { publicURL } = supabase.storage
    .from('avatars')
    .getPublicUrl(profile?.avatar_url)
  if (publicURL) profile.avatar_public_url = publicURL

  if (!profile) return blankProfile
  if (!decks) return { profile, decks: [] }

  return { profile, decks }
}

export function GlobalStateProvider({ children }) {
  const [user, setUser] = useState()
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [profileResponse, setProfileResponse] = useState()
  const [profileError, setProfileError] = useState()
  const [loadedCards, setLoadedCards] = useState()

  const router = useRouter()

  useEffect(() => {
    if (loadingUser)
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log('useEffect 1: resolved getSession', session)
        setUser(session?.user ?? null)
        setLoadingUser(false)
        setLoadingProfile(true)
        return
      })

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // handles a logout event
        console.log(`Supabase auth event:`, event)
        // 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED', 'PASSWORD_RECOVERY'
        if (event === 'USER_UPDATED') {
          setUser(session?.user ?? null)
        }
        if (event === 'SIGNED_OUT') {
          setLoadingUser(false)
          setLoadingProfile(false)
          setUser(null)
          setProfileResponse(null)
          setProfileError(null)
        }
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
          setLoadingUser(false)
          setLoadingProfile(true)
        }
      }
    )

    return () => {
      listener.subscription
    }
  }, [])

  useEffect(() => {
    if (!user?.id) {
      setProfileResponse(null)
      setLoadingProfile(loadingUser || false)
    } else {
      // user is done loading so we will run the async query
      console.log(`useEffect 2: fetching profileData`)
      if (loadingProfile)
        supabase
          .from('profile')
          .select(`*, decks:user_deck(id, lang)`)
          .eq('uid', user.id)
          .maybeSingle()
          .then(({ data, error }) => {
            if (error) {
              setProfileError(error)
            } else {
              setProfileResponse(data)
              // if there is a user but no profile this means they've missed
              // the starting screen and need to find their way back
              if (!data || data === [] || data === {})
                router.push('/app/profile/start')
            }
            setLoadingProfile(false)
          })
    }
  }, [user])

  const { decks, profile } = profileResponse
    ? profileContextObject(profileResponse)
    : { decks: null, profile: null }

  const value = {
    user,
    profile,
    decks,
    profileError,
    signUp: data => supabase.auth.signUp(data),
    signIn: data => supabase.auth.signIn(data),
    signOut: path => {
      supabase.auth.signOut()
      router?.push(path ?? '/')
    },
    mergeProfileData: data =>
      setProfileResponse(prev => {
        return { ...prev, ...data }
      }),
    insertDeckData: data =>
      setProfileResponse(prev => {
        prev.decks = prependAndDedupe(data, prev.decks)
        return [...prev]
      }),
    isLoading: loadingUser || loadingProfile,
    loadedCards,
    addLoadedCard: card =>
      setLoadedCards(prev => {
        prev[card.id] = card
        return { ...prev }
      }),
  }

  console.log(`render GlobalStateContext.Provider`)
  return (
    <GlobalStateContext.Provider value={value}>
      {value.isLoading ? null : children}
    </GlobalStateContext.Provider>
  )
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
