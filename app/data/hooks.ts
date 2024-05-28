'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { getLanguageDetails, getPhraseDetails } from './fetchers'
import supabase from 'lib/supabase-client'
import type { Scalars, Maybe } from 'types/utils'
import { Deck, DeckStub, Profile, CardStub } from 'types/client-types'
import { useAuth } from 'lib/auth-context'

export type UseQueryResult = {
  status: string
  error: Maybe<any>
  data: Maybe<any>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export const useCard = (
  id: string
): UseQueryResult & { data: Maybe<CardStub> } =>
  useQuery({
    queryKey: ['card', id],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await supabase
        .from('user_card')
        .select('*')
        .eq('id', queryKey[1])
        .maybeSingle()
      if (error) throw error
      else return data
    },
    enabled: typeof id === 'string' && id.length > 0,
    // retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

export function useAllDecks(): UseQueryResult & { data: Array<DeckStub> } {
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

const fetchDeck = async (lang: string): Promise<Deck> => {
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
  if (error) throw Error(error.message)
  if (!data) return null

  const rawCards = Array.isArray(data?.user_card) ? data.user_card : []

  const deck: Deck = {
    id: data?.id,
    lang: data?.lang,
    all_phrase_ids: rawCards.map(card => card.phrase_id),
    cards: {
      active: rawCards.filter(card => card.status === 'active'),
      learned: rawCards.filter(card => card.status === 'learned'),
      skipped: rawCards.filter(card => card.status === 'skipped'),
    },
  }

  return deck
}

export function useDeck(deckLang: string): UseQueryResult {
  return useQuery({
    queryKey: ['user_deck', deckLang],
    queryFn: ({ queryKey }) => fetchDeck(queryKey[1]),
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
    queryFn: async ({ queryKey }) => getPhraseDetails(queryKey[1]),
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

export function useProfile(): UseQueryResult {
  const router = useRouter()
  const pathname = usePathname()
  const { userId } = useAuth()
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: async (): Promise<Profile | null | false> => {
      const { data, error } = await supabase
        .from('user_profile')
        .select(`*, user_decks:user_deck(id, lang)`)
        .eq('uid', userId)
        .maybeSingle()
      if (error) throw error
      if (!data)
        if (pathname !== '/getting-started') {
          router.push('/getting-started')
        }
      return data || null
    },
    enabled: router && pathname && userId ? true : false,
  })
}
