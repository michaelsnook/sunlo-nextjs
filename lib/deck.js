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
