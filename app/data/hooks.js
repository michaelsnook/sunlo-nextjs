'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllDecks, getDeck } from './fetchers'

export function useDeck(deckLang) {
  return useQuery({
    queryKey: ['deck', deckLang],
    queryFn: async () => getDeck(deckLang),
    enabled: !!deckLang,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useAllDecks() {
  return useQuery({
    queryKey: ['decks'],
    queryFn: getAllDecks,
    enabled: true,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

/* export function useAllPhrases() {
  return useQuery({
    queryKey: ['phrases'],
    queryFn: async () => {
      const data = await request({
        document: allPhraseDetailsQuery,
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
*/
