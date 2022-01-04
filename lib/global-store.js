import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from 'lib/supabase-client'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const GlobalStateContext = createContext({
  isLoading: true,
  user: {},
  profile: {},
  decks: [],
  profileError: {},
})

export function GlobalStateProvider({ children }) {
  const [user, setUser] = useState()
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingLanguages, setLoadingLanguages] = useState(true)
  const [profile, setProfile] = useState()
  const [decks, setDecks] = useState()
  const [profileError, setProfileError] = useState()
  const [languages, setLanguages] = useState()

  const loadProfileIntoContext = profileResponseData => {
    // a successful profile response!
    // extract decks to its own top-level item
    // and calculate the publicURL of the avatar
    if (!profileResponseData) throw { message: 'no profile data at all' }
    const { decks: decksData, ...profileData } = profileResponseData
    const { publicURL } = supabase.storage
      .from('avatars')
      .getPublicUrl(profileData?.avatar_url)

    setProfile({
      ...profileData,
      avatar_public_url: publicURL ?? '',
    })
    if (decksData) setDecks(decksData)
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
      setProfile({})
      setLoadingProfile(false)
    } else {
      // user and session are present so we will run the async query
      supabase
        .from('profile')
        .select(`*, decks:user_deck(*)`)
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          // cleanup the profile request process
          if (error) {
            setProfileError(error)
          } else {
            loadProfileIntoContext(data)
          }
          console.log('end of .then', data)
          setLoadingProfile(false)
        })
    }
    console.log('end of useEffect,', `session is ${!session ? 'not ' : ''}here`)
    return () => {
      listener?.unsubscribe()
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      profile,
      decks,
      profileError,
      languages,
      signUp: data => supabase.auth.signUp(data),
      signIn: data => supabase.auth.signIn(data),
      signOut: () => {
        supabase.auth.signOut()
        router.push('/')
      },
      setProfile: data => setProfile(data),
      insertDeck: data => setDecks([data, ...decks]),
      isLoading: loadingProfile || loadingLanguages,
    }),
    [
      user,
      profile,
      decks,
      profileError,
      languages,
      loadingProfile,
      loadingLanguages,
    ]
  )

  console.log(loadingLanguages, loadingProfile)
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
