import useSWR from 'swr'
import { convertLanguageDataToLookupTable } from 'lib/data-helpers'
import supabase from 'lib/supabase-client'

export async function fetchLanguages() {
  return await supabase.from('language').select('*')
}

export async function fetchLanguageLookupTable() {
  const { data, error } = await fetchLanguages()
  if (error) return { error }
  return { data: convertLanguageDataToLookupTable(data) }
}

export async function fetchLanguagePhrases(lang) {
  return await supabase
    .from('card_phrase')
    .select('*, translations:card_translation(*)')
    .eq('lang', lang)
}

export function useLanguagePhrases(lang) {
  const { data, error } = useSWR(lang, fetchLanguagePhrases)

  if (!data && !error) return { isLoading: true }
  if (error) return { isLoading: false, error }
  return { isLoading: false, language_phrases: data }
}

export function useLanguageLookupTable() {
  const { data, error } = useSWR('languages', fetchLanguageLookupTable)

  if (!data && !error) return { isLoading: true }
  if (error) return { isLoading: false, error }
  return { isLoading: false, languageTable: data.data ?? data }
}
