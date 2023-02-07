import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from 'lib/supabase-client'
import { useRouter } from 'next/router'
import { prependAndDedupe } from './data-helpers'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const ProfileDeckContext = createContext({})

const blankProfile = {
  profile: null,
  decks: null,
  isLoading: true,
}

const profileContextObject = profileResponseData => {
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

export function ProfileDeckProvider({ children }) {
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [profileResponse, setProfileResponse] = useState()
  const [profileError, setProfileError] = useState()
  const [loadedCards, setLoadedCards] = useState()

  useEffect(() => {
    const session = supabase.auth.session() || null
    setUser(session?.user ?? null)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoadingProfile(false)
      }
    )

    if (!user) {
      setProfileResponse(null)
      setLoadingProfile(false)
    } else {
      // user and session are present so we will run the async query
      supabase
        .from('profile')
        .select(`*, decks:user_deck(id, lang)`)
        .eq('uid', user.id)
        .single()
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
          console.log('end of .then', data, error)
          setLoadingProfile(false)
        })
    }
    console.log(
      'end of useEffect for loading Profile,',
      `session is ${!session ? 'not ' : ''}here`
    )
    return () => {
      listener?.unsubscribe()
    }
  }, [profile, decks])

  const value = useMemo(() => {
    const { decks, profile } = profileContextObject(profileResponse)
    console.log('useMemo')
    return {
      profile,
      decks,
      profileError,
      mergeProfileData: data =>
        setProfileResponse(prev => {
          return { ...prev, ...data }
        }),
      insertDeckData: data =>
        setProfileResponse(prev => {
          prev.decks = prependAndDedupe(data, prev.decks)
          return [...prev]
        }),
      isLoading: loadingProfile,
      loadedCards,
      addLoadedCard: card =>
        setLoadedCards(prev => {
          prev[card.id] = card
          return { ...prev }
        }),
    }
  }, [profileResponse, profileError, loadingProfile, loadedCards])

  console.log('Render context provider', loadingProfile, value)
  return (
    <ProfileDeckContext.Provider value={value}>
      {value.isLoading ? null : children}
    </ProfileDeckContext.Provider>
  )
}

// a hook to use whenever we need to consume data from `ProfileDeckProvider`.
// So, We don't need React.useContext everywhere we need data from ProfileDeckContext.

export function useProfileDeck() {
  const context = useContext(ProfileDeckContext)

  if (!context) {
    throw new Error('You need to wrap ProfileDeckProvider.')
  }

  return context
}
