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
  // user: null,
  isAuth: false,
}

const AuthContext = createContext(blank)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const userId = user?.id ?? null

  const queryClient = useQueryClient()
  useEffect(() => {
    if (!queryClient) {
      console.log('Returning early bc queryClient hook has not come back')
      return
    }
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Auth state changed: ${event}`, session)
        if (event === 'SIGNED_OUT') {
          setUser(null)
          queryClient.removeQueries({ queryKey: ['user_profile'] })
          queryClient.removeQueries({ queryKey: ['user_decks'] })
          queryClient.removeQueries({ queryKey: ['user_deck'] })
        } else {
          if (session?.user.id !== userId) {
            queryClient.invalidateQueries({ queryKey: ['user_profile'] })
            queryClient.invalidateQueries({ queryKey: ['user_decks'] })
            queryClient.invalidateQueries({ queryKey: ['user_deck'] })
          }
          setUser(session?.user ?? null)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [queryClient, userId])

  const value = {
    user,
    isAuth: user?.role === 'authenticated',
    userId,
  }

  // console.log(`Rendering AuthContext.Provider`, value)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// a hook to use whenever we need to consume data from `AuthProvider`.
// So, We don't need React.useContext everywhere we need data from AuthContext.

export function useAuth() {
  const context = useContext(AuthContext)
  // console.log(`Running useAuth`, context)

  if (!context) {
    throw new Error('You need to wrap AuthProvider.')
  }

  return context
}
