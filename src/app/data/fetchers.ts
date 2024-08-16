import supabase from 'lib/supabase-client'
import { selects } from 'lib/utils'
import type { Phrase, Language, uuid } from 'types/main'

export const getAllPhraseDetails = async (): Promise<Array<Phrase>> => {
  const { data, error } = await supabase.from('phrase').select(phraseFullSelect)
  if (error) throw error
  return data.map(phrase => phrasePostFetch(phrase)) || []
}

export const getLanguageDetails = async (
  lang: string
): Promise<Language | null> => {
  let { data, error } = await supabase
    .from('language')
    .select(
      `
        lang, name,
        phrase(${phraseFullSelect}),
        user_deck(id, lang, created_at, uid)
      `
    )
    .eq('lang', lang)
    .maybeSingle()
    .throwOnError()

  if (!data) return null
  const language: Language = {
    lang: data.lang,
    name: data.name,
    phrases:
      Array.isArray(data?.phrase) ?
        data.phrase?.map(p => phrasePostFetch(p))
      : [],
    deck: data?.user_deck[0],
  }

  // console.log(`getLanguageDetails result, `, language)
  return language
}

const phraseFullSelect = selects.phrase_fuller()

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
