import {
  uuid,
  pids,
  LanguageLoaded,
  LanguageMeta,
  PhraseFull,
  PhrasesMap,
} from 'types/main'
import { useLanguageQuery } from './preload-language'
import { UseQueryResult } from '@tanstack/react-query'

export const useLanguageMeta = (lang: string) =>
  useLanguageQuery(
    lang,
    (data: LanguageLoaded) => data.meta
  ) as UseQueryResult<LanguageMeta>

export const useLanguagePids = (lang: string) =>
  useLanguageQuery(
    lang,
    (data: LanguageLoaded) => data.pids
  ) as UseQueryResult<pids>

export const useLanguagePhrases = (lang: string) =>
  useLanguageQuery(
    lang,
    (data: LanguageLoaded) => data.phrases
  ) as UseQueryResult<PhrasesMap>

export const usePhrase = (lang: string, pid: uuid) =>
  useLanguageQuery(
    lang,
    (data: LanguageLoaded) => data.phrases[pid]
  ) as UseQueryResult<PhraseFull>
