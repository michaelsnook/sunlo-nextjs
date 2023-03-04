'use client'

import { useQuery } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'
import supabase from 'lib/supabase-client'
import {
  userDeckCardsQuery,
  getAllMyDecksQuery,
  getManyCardsDetailsQuery,
} from 'app/data/queries'
import { requestOptions } from './constants'

export function useDeck(deckLang) {
  const filter = {
    lang: {
      eq: deckLang,
    },
  }
  const variables = { filter }

  return useQuery({
    queryKey: ['deck', deckLang],
    queryFn: async () => {
      const {
        data: {
          session: { access_token },
        },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        console.log(`Error in useDeck, useQuery, getSession`, error)
        return {}
      }
      if (!access_token) {
        console.log(`Tried to access useDecks but session not valid`)
        return {}
      }

      const response = await request({
        document: userDeckCardsQuery,
        variables,
        ...requestOptions(access_token),
      })
      return response
    },
    enabled: !!deckLang,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
export function useDecks() {
  return useQuery({
    queryKey: ['decks'],
    queryFn: async () => {
      const {
        data: {
          session: { access_token },
        },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        console.log(`Error in useDecks, useQuery, getSession`, error)
        return {}
      }
      if (!access_token) {
        console.log(`Tried to access useDecks but session not valid`)
        return {}
      }

      const data2 = await request({
        document: getAllMyDecksQuery,
        ...requestOptions(access_token),
      })
      return data2
    },
    enabled: true,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function usePhrases() {
  return useQuery({
    queryKey: ['phrases'],
    queryFn: async () => {
      const data = await request({
        document: getManyCardsDetailsQuery,
        ...requestOptions(),
      })
      return data
    },
    enabled: true,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
