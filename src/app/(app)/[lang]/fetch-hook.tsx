'use client'

import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import type { UseAPIQuery, DeckAPIData, LanguageAPIData } from 'types/main'

// this function can safely be called on the server
export async function fetchPublicLanguageData(
  lang: string
): Promise<PostgrestSingleResponse<LanguageAPIData>> {
  return supabase
    .from('language_plus')
    .select('*, phrase(*)')
    .eq('lang', lang)
    .maybeSingle()
}

export function useLangDataQuery(lang: string): UseAPIQuery<LanguageAPIData> {
  return useQuery({
    queryKey: ['language', lang, 'meta'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await fetchPublicLanguageData(queryKey[1])
      if (error) throw error
      // console.log(`In the fetcher function, returnin' your data`, data, error)
      return data
    },
    enabled: typeof lang === 'string' && lang.length === 3,
  })
}

export function useDeckDataQuery(lang: string): UseAPIQuery<DeckAPIData> {
  return useQuery({
    queryKey: ['deck', lang, 'meta'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await supabase
        .from('user_deck_plus')
        .select('*, user_card(*)')
        .eq('lang', lang)
        .maybeSingle()
      if (error) throw error
      return data
    },
  })
}
