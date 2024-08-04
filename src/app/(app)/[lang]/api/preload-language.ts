import { QueryKey, UseQueryResult, useQuery } from '@tanstack/react-query'
import type {
  LanguageFetched,
  LanguageLoaded,
  PhrasesMap,
  pids,
} from 'types/main'
import { mapArray, selects } from 'lib/utils'
import supabase from 'lib/supabase-client'

// this fetcher can be called on the server
export async function fetchLanguage(lang: string): Promise<LanguageFetched> {
  const { data } = await supabase
    .from('language_plus')
    .select(selects.language_full())
    .eq('lang', lang)
    .maybeSingle()
    .throwOnError()
  return data
}

function transformLanguageFetchedToLoaded({
  phrases: phrasesArray = [],
  ...meta
}: LanguageFetched): LanguageLoaded {
  const pids: pids = phrasesArray?.map(p => p.id)
  const phrases: PhrasesMap = mapArray(phrasesArray, 'id')
  return {
    meta,
    pids,
    phrases,
  }
}

export function useLanguageQuery(
  lang: string,
  select = null
): UseQueryResult<LanguageLoaded> {
  return useQuery<LanguageLoaded>({
    queryKey: ['language', lang, 'preload'],
    queryFn: async ({
      queryKey,
    }: {
      queryKey: QueryKey
    }): Promise<LanguageFetched | null | any> => {
      const lang = queryKey[1] as string
      const data: LanguageFetched = await fetchLanguage(lang)
      const result: LanguageLoaded = transformLanguageFetchedToLoaded(data)
      return result
    },
    enabled: typeof lang === 'string' && lang.length === 3,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
