import { request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import {
  allDecksQuery,
  allPhraseDetailsQuery,
  allPhraseIdsQuery,
  deckQuery,
  languageDetailsQuery,
  phraseDetailsQuery,
  profileQuery,
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
  return response?.userDeckCollection?.edges[0]?.node || null
}

export const getAllPhraseDetails = async () => {
  return await request({
    document: allPhraseDetailsQuery,
    ...requestOptions(),
  })
}

export const getAllPhraseIds = async () => {
  const data = await request({
    document: allPhraseIdsQuery,
    ...requestOptions(),
  })
  return data.phraseCollection.edges
}

export const getAllDecks = async () => {
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession()
  if (error) {
    console.log(`Error in getAllDecks, useQuery, getSession`, error)
    return null
  }
  if (!access_token) {
    console.log(`Tried to access getAllDecks but session not valid`)
    return null
  }

  const response = await request({
    document: allDecksQuery,
    ...requestOptions(access_token),
  })
  const sortedResponse = response.userDeckCollection.edges.sort((a, b) => {
    return (
      b.node.userCardCollection.edges.length -
      a.node.userCardCollection.edges.length
    )
  })
  return sortedResponse
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
  /*
  console.log(
    `LOGGING getLanguageDetails(${lang})`,
    response.languageCollection.edges[0]?.node
  )
  */
  return response.languageCollection.edges[0]?.node
}

export const getOnePhraseDetails = async (id: Scalars['UUID']) => {
  const variables = {
    filter: <PhraseFilter>{
      id: {
        eq: id,
      },
    },
  }
  const response = await request({
    document: phraseDetailsQuery,
    variables,
    ...requestOptions(),
  })
  return response?.phraseCollection?.edges[0]?.node // || {}
}

export const getAllPhrasesInLanguage = async (lang: String) => {
  const variables = {
    filter: <LanguageFilter>{
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
  return response?.phraseCollection?.edges
}

export const getProfile = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) return {}
  const response = await request({
    document: profileQuery,
    ...requestOptions(session.access_token),
  })
  return response?.userProfileCollection?.edges[0]?.node // || {}
}
