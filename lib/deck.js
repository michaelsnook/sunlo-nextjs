import supabase from 'lib/supabase-client'

export async function deckFetcher(lang) {
  console.log('running deckFetcher')
  return await supabase
    .from('user_deck')
    .select(
      `
      id,
      lang,
      cards_in_deck_count_object:user_deck_card_membership(count),
      deck_memberships:user_deck_card_membership(
        status,
        card:card_phrase(
          id,
          text,
          lang,
          translations_count:card_translation(count),
          see_also:card_see_also!card_see_also_to_phrase_id_fkey(from_phrase_id, to_phrase_id)
        )
      )
    `
    )
    .eq('lang', lang)
    .single()
}

export async function getFullPhraseData({ id }) {
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
