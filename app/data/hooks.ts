'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getProfile,
  getAllPhrasesInLanguage,
  getPhraseDetails,
} from './fetchers'
import supabase from 'lib/supabase-client'
import type { Scalars, Maybe } from './gql/graphql'

export type UseQueryResult = {
  status: string
  error: Maybe<any>
  data: Maybe<any>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export function useAllDecks(): UseQueryResult {
  return useQuery({
    queryKey: ['user_decks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_deck')
        .select(`id, lang, user_card(*)`)
      if (error) throw error
      try {
        return data.sort((a, b) => {
          return b.user_card.length - a.user_card.length
        })
      } catch {
        return data
      }
    },
    enabled: true,
    // retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useAllPhrasesInLanguage(lang: string): UseQueryResult {
  return useQuery({
    queryKey: ['phrases', 'lang', lang],
    // fix this. use queryKey[2]
    queryFn: async () => getAllPhrasesInLanguage(lang),
    enabled: !!lang,
    // retry: 3,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useDeck(deckLang: string): UseQueryResult {
  console.log(`useDeck`, deckLang)
  return useQuery({
    queryKey: ['user_deck', deckLang],
    // fix this. use queryKey[1]
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_deck')
        .select(
          `
          id, lang, user_card(
            status, id, phrase_id, phrase(
              text, lang, id, phrase_translation(*)
            )
          )
        `
        )
        .eq('lang', deckLang)
        .maybeSingle()
      if (error) throw error
      return data
    },
    enabled: !!deckLang,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function usePhrase(id: Scalars['UUID']): UseQueryResult {
  return useQuery({
    queryKey: ['phrase', id],
    // fix this. use queryKey[1]
    queryFn: async () => getPhraseDetails(id),
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

export function useProfile(): UseQueryResult {
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: getProfile,
    enabled: true,
    // retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })
}
