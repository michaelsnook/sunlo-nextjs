import { request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import {
  allPhraseDetailsQuery,
  languageDetailsQuery,
  phraseDetailsQuery,
} from 'app/data/queries'
import type { LanguageFilter, PhraseFilter, Scalars } from './gql/graphql'
import { requestOptions } from './constants'

export const getAllPhraseDetails = async () => {
  const response = await request({
    document: allPhraseDetailsQuery,
    ...requestOptions(),
  })
  return response?.phraseCollection ? response.phraseCollection.edges : []
}

export const getLanguageDetails = async (lang: string) => {
  const variables = {
    filter: <LanguageFilter>{
      lang: {
        eq: lang,
      },
    },
  }
  const response = await request({
    document: languageDetailsQuery,
    variables,
    ...requestOptions(),
  })
  return response.languageCollection.edges[0]?.node || null
}

export const getPhraseDetails = async (id: Scalars['UUID']) => {
  let { data, error } = await supabase
    .from('phrase')
    .select(
      `
        id, text, lang,
        phrase_translation(id, text, lang),
        phrase_from:phrase_see_also!phrase_see_also_to_phrase_id_fkey(
          id, from_phrase_id, phrase:phrase!phrase_see_also_from_phrase_id_fkey(id, text, lang)
        ),
        phrase_to:phrase_see_also!phrase_see_also_from_phrase_id_fkey(
          id, to_phrase_id, phrase:phrase!phrase_see_also_to_phrase_id_fkey(id, text, lang)
        ),
        user_card(id, user_deck_id, status)
      `
    )
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  // console.log(`getPhraseDetails data`, data.phrase_to, data.phrase_from)
  const see_also_phrases = (
    data?.phrase_from?.map(s => s?.phrase) || []
  ).concat(data?.phrase_to?.map(s => s?.phrase) || [])
  delete data.phrase_from
  delete data.phrase_to
  data['see_also_phrases'] = see_also_phrases
  return data
}

export const getAllPhrasesInLanguage = async (lang: String) => {
  const variables = {
    filter: <PhraseFilter>{
      lang: {
        eq: lang,
      },
    },
  }
  const response = await request({
    ...requestOptions(),
    document: phraseDetailsQuery,
    variables,
  })
  return response?.phraseCollection.edges
}

export const getProfile = async () => {
  const { data, error } = await supabase
    .from('user_profile')
    .select(`*, user_decks:user_deck(id, lang)`)
    .maybeSingle()
  if (error) console.log(`getProfile`, error)

  return data
}
