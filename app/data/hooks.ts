'use client'

import { useQuery } from '@tanstack/react-query'
import { getLanguageDetails, getPhraseDetails } from './fetchers'
import supabase from 'lib/supabase-client'
import type { Scalars, Maybe } from './gql/graphql'
import { Profile } from 'types/client-types'

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
        .select(`id, lang, cards:user_card(*)`)
      if (error) throw error
      try {
        return data.sort((a, b) => {
          return b.cards.length - a.cards.length
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

export function useLanguageDetails(lang: string): UseQueryResult {
  return useQuery({
    queryKey: ['phrases', 'lang', lang],
    queryFn: async () => getLanguageDetails(lang),
    enabled: !!lang,
    // retry: 3,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

const fetchDeck = async (lang: string) => {
  let { data, error } = await supabase
    .from('user_deck')
    .select(
      `
          id, lang, user_card(
            status, id, phrase_id, phrase(
              text, lang, id, translations:phrase_translation(*)
            )
          )
        `
    )
    .eq('lang', lang)
    .maybeSingle()
  if (error) throw error

  data['all_phrase_ids'] = data?.user_card?.map(card => card.phrase_id)

  // unpack the cards into categories
  data['cards'] = {
    active: data?.user_card?.filter(card => card.status === 'active'),
    learned: data?.user_card?.filter(card => card.status === 'learned'),
    skipped: data?.user_card?.filter(card => card.status === 'skipped'),
  }
  return data
}

export function useDeck(deckLang: string): UseQueryResult {
  console.log(`useDeck`, deckLang)
  return useQuery({
    queryKey: ['user_deck', deckLang],
    // fix this. use queryKey[1]
    queryFn: async () => fetchDeck(deckLang),
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
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from('user_profile')
        .select(`*, user_decks:user_deck(id, lang)`)
        .maybeSingle()
      if (error) throw error

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
