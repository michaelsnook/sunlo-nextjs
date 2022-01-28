import supabase from 'lib/supabase-client'
import useSWR from 'swr'

export async function fetchFullPhraseData({ id }) {
  let { data, error } = await supabase
    .from('card_phrase')
    .select(
      `
      id,
      text,
      lang,
      translations_count:card_translation(count),
      translations:card_translation(id, text, lang),
      see_also_to:card_see_also!card_see_also_to_phrase_id_fkey(from_phrase_id, to_phrase_id)
    `
    )
    .eq('id', id)
    .single()
  if (error) throw error
  if (!data) return {}
  console.log('Props0: ', data)
  data.see_also = (data?.see_also_to ?? []).map(s =>
    id === s.from_phrase_id ? s.to_phrase_id : s.from_phrase_id
  )
  delete data.see_also_to
  return data
}

export function usePhraseData(id) {
  const { data, error } = useSWR(
    { id, type: 'card_phrase' },
    fetchFullPhraseData
  )

  if (!data && !error) return { isLoading: true }
  if (error) return { error, isLoading: false }
  return { phrase: data, isLoading: false }
}
