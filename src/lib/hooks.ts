import { useParams } from 'next/navigation'
import { useDeckQuery } from 'app/(app)/[lang]/api/preload-deck'
import { useLanguageQuery } from 'app/(app)/[lang]/api/preload-language'

export const useLang = () => useParams<{ lang: string }>()?.lang

// use like: const languageMeta = useLanguageData()?.meta
export function useLanguageData(lang = '') {
  return useLanguageQuery({ lang })?.data
}

export function useDeckData(lang = '') {
  return useDeckQuery({ lang })?.data
}
