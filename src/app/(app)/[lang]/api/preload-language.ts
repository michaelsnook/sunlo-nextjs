'use client'

import {
  useQuery,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query'
import type {
  pids,
  UseSBQuery,
  LanguagePrefetch,
  LanguageLoaded,
} from 'types/main'
import { mapArray, selects } from 'lib/utils'
import supabase from 'lib/supabase-client'

// this function can safely be called on the server
export async function prefetchLanguage(
  lang: string
): Promise<LanguagePrefetch> {
  const { data } = await supabase
    .from('language_plus')
    .select(selects.language_full())
    .eq('lang', lang)
    .maybeSingle()
    .throwOnError()
  return data
}

function transformLanguagePrefetchToLoaded({
  phrases = [],
  ...meta
}: LanguagePrefetch): LanguageLoaded {
  const pids: pids = phrases?.map(p => p.id)
  const phrase = mapArray(phrases, 'id')
  return {
    meta,
    pids,
    phrase,
  }
}

export function useLanguagePreload(lang: string): UseSBQuery<LanguageLoaded> {
  const client = useQueryClient()
  return useQuery({
    queryKey: ['language', lang, 'full'],
    queryFn: async ({ queryKey }) => {
      const data: LanguagePrefetch = await prefetchLanguage(queryKey[1])
      const result: LanguageLoaded = transformLanguagePrefetchToLoaded(data)
      populateLanguageCache(result, client)

      return result
    },
    enabled: typeof lang === 'string' && lang.length === 3,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}

function populateLanguageCache(
  { meta, pids, phrase }: LanguageLoaded,
  client: QueryClient
): void {
  client.setQueryData(['language', meta.lang, 'meta'], meta)
  client.setQueryData(['language', meta.lang, 'pids'], pids)
  // for now let's just stash both and see which one is more useful!
  client.setQueryData(['language', meta.lang, 'phrases'], phrase)
  pids.forEach(pid => {
    client.setQueryData(['language', meta.lang, 'phrase', pid], phrase[pid])
  })

  return
}
