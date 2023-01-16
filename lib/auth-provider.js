'use client'

import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from 'lib/supabase-client'
import { useRouter } from 'next/navigation'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const AuthStateContext = createContext({})

export function AuthStateProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    if (!user) {
      setProfile(null)
      setIsLoading(false)
    } else {
      // user and session are present so we will run the async query
      supabase
        .from('profile')
        .select(`*, decks:user_deck(id, lang)`)
        .eq('uid', user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            setError(error)
          } else {
            setError() // there's only one possible error in this context
            setProfile(data)
            // if there is a user but no profile this means they've missed
            // the starting screen and need to find their way back
            if (!data || data === [] || data === {})
              router.push('/app/profile/start')
          }
          setIsLoading(false)
        })
    }

    return () => {
      listener?.unsubscribe()
    }
  }, [user])

  const value = useMemo(() => {
    return {
      user,
      profile,
      error,
      signUp: data => supabase.auth.signUp(data),
      signIn: data => supabase.auth.signIn(data),
      signOut: () => {
        router.push('/')
        supabase.auth.signOut()
      },
      isLoading,
    }
  }, [user, profile, error, isLoading])

  console.log('Render context provider', isLoading, value)

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  )
}

// a hook to use whenever we need to consume data from `AuthStateProvider`.
// So, We don't need React.useContext everywhere we need data from AuthStateContext.

export function useAuthState() {
  const context = useContext(AuthStateContext)

  if (!context) {
    throw new Error('You need to wrap AuthStateProvider.')
  }

  return context
}
