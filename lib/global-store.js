import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from 'lib/supabase-client'
import { useRouter } from 'next/router'
import { prependAndDedupe } from './data-helpers'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const GlobalStateContext = createContext({})

const blankProfile = {
  profile: null,
  decks: null,
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

export function GlobalStateProvider({ children }) {
  const [user, setUser] = useState()
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingLanguages, setLoadingLanguages] = useState(true)
  const [profileResponse, setProfileResponse] = useState()
  const [profileError, setProfileError] = useState()
  const [languages, setLanguages] = useState()
  const [loadedCards, setLoadedCards] = useState()
  const router = useRouter()

  useEffect(() => {
    // regardless of user logged in status, we still fetch the language index
    // for use throughout the app
    supabase
      .from('language')
      .select('*')
      .then(({ data, error }) => {
        let languageList = {}
        data.map(d => (languageList[d.code] = d.name))
        if (data) setLanguages(languageList)
        if (error) setProfileError(error)
        // console.log(languageList, error)
        setLoadingLanguages(false)
      })
    console.log('running useEffect to get languages')
  }, [])

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoadingProfile(false)
        setLoadingLanguages(false)
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
  }, [user])

  const value = useMemo(() => {
    const { decks, profile } = profileContextObject(profileResponse)
    console.log('useMemo')
    return {
      user,
      profile,
      decks,
      profileError,
      languages,
      signUp: data => supabase.auth.signUp(data),
      signIn: data => supabase.auth.signIn(data),
      signOut: () => {
        router.push('/')
        supabase.auth.signOut()
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
      isLoading: loadingProfile || loadingLanguages,
      loadedCards,
      addLoadedCard: card =>
        setLoadedCards(prev => {
          prev[card.id] = card
          return { ...prev }
        }),
    }
  }, [
    user,
    profileResponse,
    profileError,
    languages,
    loadingProfile,
    loadingLanguages,
    loadedCards,
  ])

  console.log(
    'Render context provider',
    loadingLanguages,
    loadingProfile,
    value
  )
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
