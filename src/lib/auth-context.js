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
  isAuth: false,
  userId: null,
  userEmail: null,
}

const AuthContext = createContext(blank)

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [userId, setUserId] = useState()
  const [userEmail, setUserEmail] = useState()

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
          setIsAuth(false)
          setUserId(null)
          setUserEmail(null)
          queryClient.removeQueries({ queryKey: ['user_profile'] })
          queryClient.removeQueries({ queryKey: ['user_deck'] })
        } else {
          if (session?.user.id !== userId) {
            queryClient.invalidateQueries({ queryKey: ['user_profile'] })
            queryClient.invalidateQueries({ queryKey: ['user_deck'] })
          }

          setIsAuth(session?.user?.role === 'authenticated')
          setUserId(session?.user?.id)
          setUserEmail(session?.user?.email)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [queryClient, userId])

  const value = {
    isAuth,
    userId,
    userEmail,
  }

  // console.log(`Rendering AuthContext.Provider`, value)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// A for whenever we need to access the auth context

export function useAuth() {
  const context = useContext(AuthContext)
  // console.log(`Running useAuth`, context)

  if (!context) {
    throw new Error('You need to wrap AuthProvider.')
  }

  return context
}
