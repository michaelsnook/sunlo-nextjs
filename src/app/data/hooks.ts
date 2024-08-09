'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { Deck, Profile, ReviewsCollated, UseSBQuery } from 'types/main'
import { useAuth } from 'components/auth-context'
import { collateArray } from 'lib/utils'
import { PostgrestError } from '@supabase/supabase-js'

const fetchDeck = async (lang: string): Promise<Deck> => {
  let { data } = await supabase
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
    .throwOnError()

  if (!data) throw new Error('404')

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

export function useDeck(deckLang: string) {
  return useQuery({
    queryKey: ['user_deck', deckLang],
    queryFn: ({ queryKey }) => fetchDeck(queryKey[1]),
    enabled: !!deckLang,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  }) as UseQueryResult<Deck>
}

export function useProfile() {
  const { userId } = useAuth()
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: async (): Promise<Profile | null> => {
      const { data } = await supabase
        .from('user_profile')
        .select(`*, deck_stubs:user_deck_plus(*)`)
        .eq('uid', userId)
        .maybeSingle()
        .throwOnError()

      return {
        languages_spoken: [],
        deck_stubs: [],
        ...data,
      }
    },
    enabled: userId ? true : false,
  }) as UseQueryResult<Profile, PostgrestError>
}

export const useRecentReviewActivity = () => {
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
  }) as UseQueryResult<ReviewsCollated>
}
