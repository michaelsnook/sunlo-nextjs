'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { getLanguageDetails, getPhraseDetails } from './fetchers'
import supabase from 'lib/supabase-client'
import type { Scalars, Maybe } from 'types/utils'
import {
  Deck,
  Profile,
  CardStub,
  ReviewsCollated,
  Phrase,
  Language,
} from 'types/main'
import { useAuth } from 'components/auth-context'

export type UseQueryResult = {
  status: string
  error: Maybe<any>
  data: Maybe<any>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export const useCard = (
  id: Scalars['UUID']
): UseQueryResult & { data?: CardStub } =>
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
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

export function useLanguageDetails(
  lang: string
): UseQueryResult & { data?: Language } {
  return useQuery({
    queryKey: ['phrases', 'lang', lang],
    queryFn: async () => getLanguageDetails(lang),
    enabled: !!lang,
    // retry: 3,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

const fetchDeck = async (lang: string): Promise<Deck> => {
  let { data, error } = await supabase
    .from('user_deck')
    .select(
      `
      uid, created_at, id, lang, user_card(
        *, phrase(
          *, translations:phrase_translation(*)
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
    created_at: data.created_at,
    uid: data.uid,
    id: data.id,
    lang: data.lang,
    all_phrase_ids: rawCards.map(card => card.phrase_id),
    cards: {
      active: rawCards.filter(({ status }) => status === 'active'),
      learned: rawCards.filter(({ status }) => status === 'learned'),
      skipped: rawCards.filter(({ status }) => status === 'skipped'),
    },
  }

  return deck
}

export function useDeck(deckLang: string): UseQueryResult & { data?: Deck } {
  return useQuery({
    queryKey: ['user_deck', deckLang],
    queryFn: ({ queryKey }) => fetchDeck(queryKey[1]),
    enabled: !!deckLang,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function usePhrase(
  id: Scalars['UUID']
): UseQueryResult & { data?: Phrase } {
  return useQuery({
    queryKey: ['phrase', id],
    queryFn: async ({ queryKey }) => getPhraseDetails(queryKey[1]),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}

export function useProfile(): UseQueryResult & { data?: Profile } {
  const router = useRouter()
  const pathname = usePathname()
  const { userId } = useAuth()
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from('user_profile')
        .select(
          `*, user_deck_plus(uid, id, lang, created_at, cards_active, cards_learned, cards_skipped, lang_total_phrases, most_recent_review_at)`
        )
        .eq('uid', userId)
        .maybeSingle()
      if (error) throw error
      if (!data)
        if (pathname !== '/getting-started') {
          router.push('/getting-started')
        }

      const {
        uid,
        username,
        avatar_url,
        languages_spoken,
        language_primary,
        user_deck_plus: deck_stubs,
      } = data

      return {
        uid,
        username,
        avatar_url,
        languages_spoken,
        language_primary,
        deck_stubs,
      }
    },
    enabled: router && pathname && userId ? true : false,
  })
}

const collateArray = (data: Array<Object>, key: string): Object => {
  let result = {}
  for (let i in data) {
    let item = data[i]
    let itemKey = item[key]
    if (Array.isArray(result[itemKey])) result[itemKey].push(item)
    else result[itemKey] = [item]
  }
  return result
}

export const useRecentReviewActivity = (): UseQueryResult & {
  data?: ReviewsCollated
} => {
  return useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_card_review_plus')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error

      const result = collateArray(data, 'lang')
      console.log(`The collated array`, result)

      return {
        list: data,
        collated: result,
        keysInOrder: Object.keys(result),
      }
    },
  })
}
