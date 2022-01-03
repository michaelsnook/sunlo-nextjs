import supabase from 'lib/supabase-client'
import { createContext, useState, useEffect, useContext } from 'react'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const GlobalStateContext = createContext({
  user: {},
  profile: {},
  decks: [],
  profileError: {},
})

export function GlobalStateProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState()
  const [decks, setDecks] = useState()
  const [profileError, setProfileError] = useState()
  const [languages, setLanguages] = useState()

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
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
        console.log(languageList, error)
      })

    if (!user) {
      setProfile()
      setLoading(false)
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
            // a successful profile response!
            // extract decks to its own top-level item
            // and calculate the publicURL of the avatar
            const { decks: decksData, ...profileData } = data
            const { publicURL } = supabase.storage
              .from('avatars')
              .getPublicUrl(profileData?.avatar_url)
            setProfile(
              profileData
                ? {
                    ...profileData,
                    avatar_public_url: publicURL,
                  }
                : null
            )
            setDecks(decksData ?? [])
          }
          // cleanup the profile request process
          setProfileError(error)
          setLoading(false)
          console.log('end of .then', data)
        })
    }
    console.log('end of useEffect,', `session is ${!session ? 'not ' : ''}here`)
    return () => {
      listener?.unsubscribe()
    }
  }, [user])

  const value = {
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
  }

  return (
    <GlobalStateContext.Provider value={value}>
      {loading || !languages ? null : children}
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
