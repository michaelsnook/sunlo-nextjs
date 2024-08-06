'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { getLanguageDetails, getPhraseDetails } from './fetchers'
import supabase from 'lib/supabase-client'
import {
  Deck,
  Profile,
  ReviewsCollated,
  Phrase,
  Language,
  UseSBQuery,
  uuid,
} from 'types/main'
import { useAuth } from 'components/auth-context'
import { collateArray } from 'lib/utils'

export function useLanguageDetails(lang: string): UseSBQuery<Language> {
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
  if (error) throw error

  const rawCards = Array.isArray(data?.user_card) ? data.user_card : []

  const deck: Deck = {
    created_at: data.created_at,
    uid: data.uid,
    id: data.id,
    lang: data.lang,
    pids: {
      active: rawCards
        .filter(({ status }) => status === 'active')
        .map(c => c.phrase_id),
      learned: rawCards
        .filter(({ status }) => status === 'learned')
        .map(c => c.phrase_id),
      skipped: rawCards
        .filter(({ status }) => status === 'skipped')
        .map(c => c.phrase_id),
    },
  }

  return deck
}

export function useDeck(deckLang: string): UseSBQuery<Deck> {
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

export function useProfile(): UseSBQuery<Profile> {
  const router = useRouter()
  const pathname = usePathname()
  const { userId } = useAuth()
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from('user_profile')
        .select(`*, deck_stubs:user_deck_plus(*)`)
        .eq('uid', userId)
        .maybeSingle()
      if (error) throw error
      if (!data)
        if (pathname !== '/getting-started') {
          router.push('/getting-started')
          return null
        }

      return {
        languages_spoken: [],
        deck_stubs: [],
        ...data,
      }
    },
    enabled: router && pathname && userId ? true : false,
    placeholderData: {
      uid: null,
      username: null,
      avatar_url: null,
      languages_spoken: [],
      language_primary: 'eng',
      deck_stubs: [],
      created_at: null,
      updated_at: null,
    },
  })
}

export const useRecentReviewActivity = (): UseSBQuery<ReviewsCollated> => {
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
