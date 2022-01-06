import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from 'lib/supabase-client'
import { useRouter } from 'next/router'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const GlobalStateContext = createContext({
  isLoadingProfile: true,
  isLoadingLanguages: true,
  user: null,
  profile: null,
  decks: null,
  profileError: null,
})

export function GlobalStateProvider({ children }) {
  const [user, setUser] = useState()
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingLanguages, setLoadingLanguages] = useState(true)
  const [profileResponse, setProfileResponse] = useState()
  const [profileError, setProfileError] = useState()
  const [languages, setLanguages] = useState()
  const router = useRouter()

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

    if (!user) {
      setProfileResponse(null)
      setLoadingProfile(false)
    } else {
      // user and session are present so we will run the async query
      supabase
        .from('profile')
        .select(`*, decks:user_deck(*)`)
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            setProfileError(error)
          } else {
            setProfileResponse(data)
          }
          console.log('end of .then', data, error)
          setLoadingProfile(false)
        })
    }
    console.log('end of useEffect,', `session is ${!session ? 'not ' : ''}here`)
    return () => {
      listener?.unsubscribe()
    }
  }, [user])

  const value = useMemo(() => {
    const { decks, profile } = profileContextObject(profileResponse)
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
        setProfileResponse({ profileResponse, ...data }),
      insertDeckData: data => setProfileResponse({ decks: [data, ...decks] }),
      isLoading: loadingProfile || loadingLanguages,
    }
  }, [
    user,
    profileResponse,
    profileError,
    languages,
    loadingProfile,
    loadingLanguages,
  ])

  console.log(loadingLanguages, loadingProfile, value)
  return (
    <GlobalStateContext.Provider value={value}>
      {loadingProfile || loadingLanguages ? null : children}
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
