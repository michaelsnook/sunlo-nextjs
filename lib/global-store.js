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

const blankProfile = {
  session: null,
  user: null,
  isLoading: true,
}

const GlobalStateContext = createContext(blankProfile)

export function GlobalStateProvider({ children }) {
  const [thisSession, setSession] = useState()
  const [user, setUser] = useState()
  const [loadingUser, setLoadingUser] = useState(true)

  const queryClient = useQueryClient()

  const router = useRouter()

  useEffect(() => {
    if (loadingUser)
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log('GlobalContext resolved getSession', session)
        setSession(session ?? null)
        setUser(session?.user ?? null)
        setLoadingUser(false)

        return
      })

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // handles a logout event
        console.log(`Supabase auth event:`, event)
        // 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', 'USER_UPDATED', 'PASSWORD_RECOVERY'
        if (event === 'USER_UPDATED') {
          setUser(session?.user ?? null)
        }
        if (event === 'SIGNED_OUT') {
          setLoadingUser(false)
          setUser(null)
          setSession(null)
          queryClient.invalidateQueries([
            'user_profile',
            'user_decks',
            'user_deck',
          ])
        }
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
          setSession(session)
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
  }, [loadingUser, queryClient])

  const value = {
    session: thisSession,
    user,
    signUp: data => supabase.auth.signUp(data),
    signIn: data => supabase.auth.signIn(data),
    signOut: path => {
      supabase.auth.signOut().then(() => {
        router?.push(path ?? '/')
      })
    },
    isLoading: loadingUser,
  }

  console.log(`render GlobalStateContext.Provider`)
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
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
