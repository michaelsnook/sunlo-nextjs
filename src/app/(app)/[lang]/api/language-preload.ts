'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import type { UseSBQuery, LanguageFull } from 'types/main'

// this function can safely be called on the server
export async function fetchLangPreload(lang: string) {
  return supabase
    .from('language_plus')
    .select(
      `*, phrases:phrase(*, translations:phrase_translation(*))` // relations:phrase_relation(*)
    )
    .eq('lang', lang)
    .maybeSingle()
}

export function useLangPreload(lang: string): UseSBQuery<LanguageFull> {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['language', lang, 'full'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await fetchPublicLanguageData(queryKey[1])
      if (error) throw error

      const all_pids = data.phrases?.map(phrase => phrase.id) ?? []
      queryClient.setQueryData(['language', lang, 'all_pids'], all_pids)

      data.phrases.forEach(phrase => {
        queryClient.setQueryData(
          ['language', lang, 'phrase', phrase.id],
          phrase
        )
      })

      let meta = { ...data }
      delete meta.phrases
      queryClient.setQueryData(['language', lang, 'meta'], meta)
      meta = null
      return data
    },
    enabled: typeof lang === 'string' && lang.length === 3,
  })
}
