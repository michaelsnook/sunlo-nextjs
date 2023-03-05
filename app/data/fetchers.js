import { request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import {
  allDecksQuery,
  allPhraseDetailsQuery,
  allPhraseIDsQuery,
  deckQuery,
  languageDetailsQuery,
  phraseDetailsQuery,
} from 'app/data/queries'
import { requestOptions } from './constants'

export const getDeck = async deckLang => {
  const variables = {
    filter: {
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
    return {}
  }
  if (!access_token) {
    console.log(`Tried to access getDeck but session not valid`)
    return {}
  }

  return await request({
    document: deckQuery,
    variables,
    ...requestOptions(access_token),
  })
}

export const getAllPhraseDetails = async () => {
  return await request({
    document: allPhraseDetailsQuery,
    ...requestOptions(),
  })
}

export const getAllPhraseIDs = async () => {
  return await request({
    document: allPhraseIDsQuery,
    ...requestOptions(),
  })
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
    return {}
  }
  if (!access_token) {
    console.log(`Tried to access getAllDecks but session not valid`)
    return {}
  }

  return await request({
    document: allDecksQuery,
    ...requestOptions(access_token),
  })
}

///////// public fetchers below /////////

export const getLanguageDetails = async code => {
  const variables = {
    filter: {
      code: {
        eq: code,
      },
    },
  }
  return await request({
    document: languageDetailsQuery,
    variables,
    ...requestOptions(),
  })
}

export const getOnePhraseDetails = async id => {
  const variables = {
    filter: {
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
  return response.cardPhraseCollection.edges[0].node
}
