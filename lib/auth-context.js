'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { useRouter } from 'next/navigation'

/* 
  Methods lifted shamelessly from 
  https://dev.to/saisandeepvaddi/simple-way-to-manage-state-in-react-with-context-kig
  and https://ruanmartinelli.com/posts/supabase-authentication-react
*/

const blank = {
  user: null,
  isLoading: true,
}

const AuthContext = createContext(blank)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const queryClient = useQueryClient()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      console.log(`Fetching user from server session`)
      // we're using the more expensive getUser instead of getSession to be
      // extra sure that the session is valid because the user is only accessed
      // on account management pages; everything else uses profile or nothing.
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user ?? null)
        setIsLoading(false)
        return
      })
    }
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // handles a logout event
        console.log(`Auth state change:`, event)
        // 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED', 'PASSWORD_RECOVERY'
        if (event === 'USER_UPDATED') {
          setUser(session?.user ?? null)
        }
        if (event === 'SIGNED_OUT') {
          setIsLoading(false)
          setUser(null)
          queryClient.invalidateQueries([
            'user_profile',
            'user_decks',
            'user_deck',
          ])
        }
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
          queryClient.invalidateQueries([
            'user_profile',
            'user_decks',
            'user_deck',
          ])
        }
      }
    )

    return () => {
      listener.subscription
    }
  }, [isLoading, queryClient])

  const value = {
    user,
    isLoading,
    signUp: data => supabase.auth.signUp(data),
    signIn: data => supabase.auth.signIn(data),
    signOut: path => {
      supabase.auth.signOut().then(() => {
        router?.push(path ?? '/')
      })
    },
  }

  console.log(`render AuthContext.Provider`)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// a hook to use whenever we need to consume data from `AuthProvider`.
// So, We don't need React.useContext everywhere we need data from AuthContext.

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('You need to wrap AuthProvider.')
  }

  return context
}
