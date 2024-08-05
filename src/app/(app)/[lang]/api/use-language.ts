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

export const useLanguageMeta = (lang?: string) =>
  useLanguageQuery((data: LanguageLoaded) => data.meta, {
    lang,
  }) as UseQueryResult<LanguageMeta>

export const useLanguagePids = (lang?: string) =>
  useLanguageQuery((data: LanguageLoaded) => data.pids, {
    lang,
  }) as UseQueryResult<pids>

export const useLanguagePhrases = (lang?: string) =>
  useLanguageQuery((data: LanguageLoaded) => data.phrases, {
    lang,
  }) as UseQueryResult<PhrasesMap>

export const usePhrase = (pid: uuid, lang?: string) =>
  useLanguageQuery((data: LanguageLoaded) => data.phrases[pid], {
    lang,
  }) as UseQueryResult<PhraseFull>
