import supabase from 'lib/supabase-client'
import type { Phrase, Language } from 'types/client-types'
import type { Scalars } from './gql/graphql'

export const getAllPhraseDetails = async () => {
  const { data, error } = await supabase.from('phrase').select(phraseFullSelect)
  if (error) throw error
  return data.map(phrase => phrasePostFetch(phrase))
}

export const getLanguageDetails = async (lang: string): Promise<Language> => {
  let { data, error } = await supabase
    .from('language')
    .select(
      `
        lang, name,
        phrases:phrase(${phraseFullSelect}),
        deck:user_deck(id, lang)
      `
    )
    .eq('lang', lang)
    .single()
  // console.log(`getLanguageDetails result, `, data, error)
  if (error) throw error

  data['phrases'] = data.phrases?.length
    ? data.phrases.map(p => phrasePostFetch(p))
    : null

  data['deck'] = data?.deck[0] || null
  // console.log(`getLanguageDetails data`, data)
  return data
}

const phraseFullSelect = `
    id, text, lang,
    translations:phrase_translation(id, text, lang),
    phrase_from:phrase_see_also!phrase_see_also_to_phrase_id_fkey(
      id, from_phrase_id, phrase:phrase!phrase_see_also_from_phrase_id_fkey(id, text, lang)
    ),
    phrase_to:phrase_see_also!phrase_see_also_from_phrase_id_fkey(
      id, to_phrase_id, phrase:phrase!phrase_see_also_to_phrase_id_fkey(id, text, lang)
    ),
    card:user_card(id, user_deck_id, status)
  `

const phrasePostFetch = (phrase): Phrase => {
  const see_also_phrases = (
    phrase?.phrase_from?.map(s => s?.phrase) || []
  ).concat(phrase?.phrase_to?.map(s => s?.phrase) || [])
  delete phrase.phrase_from
  delete phrase.phrase_to
  phrase['see_also_phrases'] = see_also_phrases
  if (phrase.card.length === 1) phrase.card = phrase.card[0]
  else if (phrase.card.length === 0) phrase.card = null
  return phrase
}

export const getPhraseDetails = async (id: Scalars['UUID']) => {
  let { data, error } = await supabase
    .from('phrase')
    .select(phraseFullSelect)
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  // console.log(`getPhraseDetails data`, data.phrase_to, data.phrase_from)
  return phrasePostFetch(data)
}



export const getProfile = async () => {
  const { data, error } = await supabase
    .from('user_profile')
    .select(`*, user_decks:user_deck(id, lang)`)
    .maybeSingle()
  if (error) console.log(`getProfile`, error)

  return data
}
