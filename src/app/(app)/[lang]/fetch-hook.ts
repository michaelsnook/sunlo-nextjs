'use client'

import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import type { UseAPIQuery, DeckAPIData, LanguageAPIData } from 'types/main'
import { buildLanguageCache, buildDeckCache } from './build-cache'

// this function can safely be called on the server
export async function fetchPublicLanguageData(
  lang: string
): Promise<PostgrestSingleResponse<LanguageAPIData>> {
  return supabase
    .from('language_plus')
    .select('*, phrase(*, phrase_translation(*))')
    .eq('lang', lang)
    .maybeSingle()
}

export function useLangDataQuery(lang: string): UseAPIQuery<LanguageAPIData> {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['language', lang, 'full'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await fetchPublicLanguageData(queryKey[1])
      if (error) throw error
      // console.log(`In the fetcher function, returnin' your data`, data, error)
      buildLanguageCache(queryClient, data)
      return data
    },
    enabled: typeof lang === 'string' && lang.length === 3,
  })
}

export function useDeckDataQuery(lang: string): UseAPIQuery<DeckAPIData> {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['user_deck', lang, 'full'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await supabase
        .from('user_deck_plus')
        .select('*, user_card(*, user_card_review(*))')
        .eq('lang', queryKey[1])
        .maybeSingle()
      if (error) throw error
      buildDeckCache(queryClient, data)
      return data
    },
  })
}
