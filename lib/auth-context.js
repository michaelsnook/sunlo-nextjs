'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'

/* 
  Methods adapted mostly from 
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

  useEffect(() => {
    if (!queryClient) {
      console.log('returning early bc queryClient hook has not come back')
      return
    }
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Auth state changed: ${event}`, session)
        if (event === 'SIGNED_OUT') {
          setUser(null)
          queryClient?.removeQueries([
            'user_profile',
            'user_decks',
            'user_deck',
          ])
          setIsLoading(false)
        } else {
          setUser(session?.user ?? null)
          queryClient.invalidateQueries([
            'user_profile',
            'user_decks',
            'user_deck',
          ])
          setIsLoading(false)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [queryClient])

  const value = {
    user,
    isLoading,
  }

  console.log(`Rendering AuthContext.Provider`, value)

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
