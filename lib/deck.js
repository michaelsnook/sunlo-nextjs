import supabase from 'lib/supabase-client'

export async function getLanguagePhrases(lang) {
  const { data: language } = await supabase
    .from('language')
    .select('*')
    .eq('code', lang)
    .single()

  const { data: phrases } = await supabase
    .from('card_phrase')
    .select('*, translations:card_translation(*)')
    .eq('lang', lang)

  if (!language || !phrases) throw `Problem loading language [${params.lang}]`
  return { props: { language, phrases } }
}

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

// @@TODO: account for relateds, and offer filtering for relateds with
// translations within languages_spoken
// @@TODO: offer filtering see_also's within languages_spoken
export function deckDataShaper(data) {
  // turn the count into an integer and delete the old one
  data.cards_in_deck_count = data.cards_in_deck_count_object[0].count
  delete data.cards_in_deck_count_object
  // flag for deck_is_empty
  data.deck_is_empty = data.cards_in_deck_count === 0
  // destructure arrays from join tables in cards array
  data.cards = data.deck_memberships.map(i => {
    i.card.related = i.card.see_also?.map(j => {
      // select the proper phrase_id for the related phrases list
      return {
        phrase_id:
          i.card.id === j.to_phrase_id ? j.from_phrase_id : j.to_phrase_id,
      }
    })
    delete i.card.see_also
    return { status: i.status, ...i.card }
  })
  delete data.deck_memberships
  console.log('finishing datashaper', data)
  return data
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
