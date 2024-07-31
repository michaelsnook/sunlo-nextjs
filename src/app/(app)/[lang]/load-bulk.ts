'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import type { UseSBQuery, DeckFull, LanguageFull } from 'types/main'
import { buildLanguageCache, buildDeckCache } from './build-cache'

// this function can safely be called on the server
export async function fetchPublicLanguageData(lang: string) {
  return supabase
    .from('language_plus')
    .select('*, phrase(*, phrase_translation(*))')
    .eq('lang', lang)
    .maybeSingle()
}

export function useLangDataQuery(lang: string): UseSBQuery<LanguageFull> {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['language', lang, 'full'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await fetchPublicLanguageData(queryKey[1])
      if (error) throw error
      buildLanguageCache(queryClient, data)
      return data
    },
    enabled: typeof lang === 'string' && lang.length === 3,
  })
}

export function useDeckDataQuery(lang: string): UseSBQuery<DeckFull> {
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
