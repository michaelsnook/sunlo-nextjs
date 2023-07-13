'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { getLanguageDetails, getPhraseDetails } from './fetchers'
import supabase from 'lib/supabase-client'
import type { Scalars, Maybe } from 'types/utils'
import { Deck, DeckResponse, Profile, Language } from 'types/client-types'

type UseQueryResult = {
  status: string
  error: Maybe<any>
  data: Maybe<any>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

type UseAllDecksQueryResult = UseQueryResult & {
  data: Deck[]
}

type UseLanguageDetailsQueryResult = UseQueryResult & {
  data: Language[]
}

type UseProfileQueryResult = UseQueryResult & {
  data: Profile
}

const parseDeckResponse = (deckResponse: DeckResponse): Deck => {
  let deck = {
    id: deckResponse.id,
    lang: deckResponse.lang,
    all_phrase_ids: [],
    size: 0,
    cards: {
      active: [],
      skipped: [],
      learned: [],
    },
  }
  // for loop is very fast
  for (var i = 0; i < deckResponse.cards.length; i++) {
    deck.all_phrase_ids.push(deckResponse.cards[i].id)
    deck.cards[deckResponse.cards[i].status].push(deckResponse.cards[i])
  }
  deck.size = deck.cards.active.length + deck.cards.learned.length
  console.log(`Parsed deck: ${deck.lang}`, deck)
  return deck
}

export function useAllDecks(): UseAllDecksQueryResult {
  return useQuery({
    queryKey: ['user_decks'],
    queryFn: async () => {
      let { data, error } = await supabase
        .from('user_deck')
        .select(`id, lang, cards:user_card(*)`)
      if (error) throw error

      console.log(`useAllDecks, data response:`, data)
      return data
        .map(d => parseDeckResponse(d))
        .sort((a, b) => {
          return b.size - a.size
        })
    },
    enabled: true,
    // retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useLanguageDetails(
  lang: string
): UseLanguageDetailsQueryResult {
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
  if (error) throw error

  const deck: Deck = parseDeckResponse(data)

  return deck
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
    queryFn: async () => getPhraseDetails(id),
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: Infinity,
  })
}

export function useProfile(): UseProfileQueryResult {
  const router = useRouter()
  const pathname = usePathname()
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: async (): Promise<Profile | null | false> => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      // console.log('session is', session)
      if (!session) return null
      const uid = session.user.id
      const { data, error } = await supabase
        .from('user_profile')
        .select(`*, user_decks:user_deck(id, lang)`)
        .eq('uid', uid)
        .maybeSingle()
      if (error) throw error
      if (!data)
        if (pathname !== '/app/profile/start') {
          router.push('/app/profile/start')
        } else return false
      return data || null
    },
    enabled: router && pathname ? true : false,
  })
}
