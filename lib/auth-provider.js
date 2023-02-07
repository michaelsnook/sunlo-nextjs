'use client'

import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from 'lib/supabase-client'
import { useRouter } from 'next/navigation'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const AuthStateContext = createContext({
  user: null,
})

export function AuthStateProvider({ children }) {
  const [user, setUser] = useState(null)
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
    return () => {
      listener.unsubscribe()
    }
  }, [user])

  const value = useMemo(() => {
    return {
      user,
      signUp: data => supabase.auth.signUp(data),
      signIn: data => supabase.auth.signIn(data),
      signOut: () => {
        router.push('/')
        supabase.auth.signOut()
      },
    }
  }, [user])

  // console.log('Render auth provider', isLoading, value)

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
