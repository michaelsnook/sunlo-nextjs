'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getAllDecks,
  getDeck,
  getProfile,
  getAllPhrasesInLanguage,
  getOnePhraseDetails,
} from './fetchers'
import { Scalars } from './gql/graphql'

export function useAllDecks() {
  return useQuery({
    queryKey: ['decks'],
    queryFn: getAllDecks,
    enabled: true,
    // retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useAllPhrasesInLanguage(lang: string) {
  return useQuery({
    queryKey: ['phrases', 'lang', lang],
    queryFn: async () => getAllPhrasesInLanguage(lang),
    enabled: !!lang,
    // retry: 3,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useDeck(deckLang: string) {
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

export function usePhrase(id: Scalars['UUID']) {
  return useQuery({
    queryKey: ['phrase', id],
    queryFn: async () => getOnePhraseDetails(id),
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: true,
    // retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
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
