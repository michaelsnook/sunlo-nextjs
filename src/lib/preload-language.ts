import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type {
  LanguageFetched,
  LanguageLoaded,
  LanguageMeta,
  PhrasesMap,
  PhraseFull,
  pids,
  uuid,
} from 'types/main'
import { mapArray, selects } from 'lib/utils'
import supabase from 'lib/supabase-client'
import { useLang } from 'lib/hooks'

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
  {
    select = undefined,
    lang: altLang,
  }: {
    select?: any
    lang?: string | null
  } = { select: undefined, lang: null }
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
    gcTime: 1_200_000,
    staleTime: 120_000,
    refetchOnWindowFocus: false,
  })
}

export const useLanguageMeta = (lang?: string) =>
  useLanguageQuery({
    lang,
    select: (data: LanguageLoaded) => data.meta,
  }) as UseQueryResult<LanguageMeta>

export const useLanguagePids = (lang?: string) =>
  useLanguageQuery({
    lang,
    select: (data: LanguageLoaded) => data.pids,
  }) as UseQueryResult<pids>

export const useLanguagePhrases = (lang?: string) =>
  useLanguageQuery({
    lang,
    select: (data: LanguageLoaded) => data.phrases,
  }) as UseQueryResult<PhrasesMap>

export const usePhrase = (pid: uuid, lang?: string) =>
  useLanguageQuery({
    lang,
    select: (data: LanguageLoaded) => data.phrases[pid],
  }) as UseQueryResult<PhraseFull>
