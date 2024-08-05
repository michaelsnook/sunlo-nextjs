import { useQuery } from '@tanstack/react-query'
import type {
  PhrasesMap,
  LanguageFetched,
  LanguageLoaded,
  pids,
} from 'types/main'
import { mapArray, selects } from 'lib/utils'
import supabase from 'lib/supabase-client'
import { useLang } from '../app-data-provider'

export async function fetchLanguage(lang: string): Promise<LanguageLoaded> {
  const { data } = await supabase
    .from('language_plus')
    .select(selects.language_full())
    .eq('lang', lang)
    .maybeSingle()
    .throwOnError()
  const { phrases: phrasesArray, ...meta }: LanguageFetched = data
  const pids: pids = phrasesArray?.map(p => p.id)
  const phrases: PhrasesMap = mapArray(phrasesArray, 'id')
  return {
    meta,
    pids,
    phrases,
  }
}

export function useLanguageQuery(
  select: undefined | any,
  { lang: altLang }: { lang?: string }
) {
  const paramLang = useLang()
  const lang = altLang || paramLang
  return useQuery({
    queryKey: ['language', lang, 'loaded'],
    queryFn: () => {
      return fetchLanguage(lang)
    },
    select,
    enabled: typeof lang === 'string' && lang.length === 3,
    gcTime: 120_000,
    staleTime: 120_000,
    refetchOnWindowFocus: false,
  })
}
