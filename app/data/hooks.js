'use client'

import { useQuery } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'
import supabase from 'lib/supabase-client'
import {
  userDeckDetailsQuery,
  getAllMyDecksQuery,
  getManyCardsDetailsQuery,
} from 'app/data/queries'

export function useDeck(deckLang) {
  const filter = {
    lang: {
      eq: deckLang,
    },
  }

  const variables = { filter }

  console.log(`run useDeck for "${deckLang}"`)
  return useQuery({
    queryKey: ['deck', deckLang],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      const response = await request({
        url: endpoint,
        document: userDeckDetailsQuery,
        variables,
        requestHeaders: addTokenToHeaders(session.access_token),
      })
      console.log('response from await request', response)
      return response
    },
    enabled: !!deckLang,
    retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
export function useDecks() {
  return useQuery({
    queryKey: ['decks'],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) return {}

      const data2 = await request({
        url: endpoint,
        document: getAllMyDecksQuery,
        requestHeaders: addTokenToHeaders(session.access_token),
      })
      return data2
    },
    enabled: true,
    // retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })
}

export function usePhrases() {
  return useQuery({
    queryKey: ['phrases'],
    queryFn: async () => {
      const data = await request({
        url: endpoint,
        document: getManyCardsDetailsQuery,
        requestHeaders: defaultHeaders,
      })
      return data
    },
    enabled: true,
    // retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })
}
