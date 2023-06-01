import { request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import {
  allDecksQuery,
  allPhraseDetailsQuery,
  deckQuery,
  languageDetailsQuery,
  phraseDetailsQuery,
  onePhraseDetailsQuery,
} from 'app/data/queries'
import type {
  UserDeckFilter,
  LanguageFilter,
  PhraseFilter,
  Scalars,
} from './gql/graphql'
import { requestOptions } from './constants'

export const getDeck = async (deckLang: string) => {
  const variables = {
    filter: <UserDeckFilter>{
      lang: {
        eq: deckLang,
      },
    },
  }
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession()
  if (error) {
    console.log(`Error in getDeck, useQuery, getSession`, error)
    return null
  }
  if (!access_token) {
    console.log(`Tried to access getDeck but session not valid`)
    return null
  }

  const response = await request({
    document: deckQuery,
    variables,
    ...requestOptions(access_token),
  })
  return response?.userDeckCollection.edges[0]?.node || null
}

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
  let { data, error } = await supabase.auth.getSession()
  if (error) {
    console.log(`Error in getPhraseDetails`, error)
    return null
  }
  const access_token = data?.session?.access_token || null
  const variables = {
    filter: <PhraseFilter>{
      id: {
        eq: id,
      },
    },
  }
  const response = await request({
    document: onePhraseDetailsQuery,
    variables,
    ...requestOptions(access_token),
  })

  return response?.phraseCollection.edges[0]?.node || null // || {}
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
