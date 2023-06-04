'use client'

import { request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import { requestOptions } from './constants'
import {
  newUserCardMutation,
  newPhraseMutation,
  newPhraseTranslationsMutation,
} from 'app/data/mutations'
import {
  PhraseTranslationInsertInput,
  Scalars,
} from './gql/graphql'
import { DeckStub, CardStub } from 'types/client-types'

export const postNewDeck = async (lang: string): Promise<DeckStub | null> => {
  // console.log(`postNewDeck ${lang}`)
  const { data, error } = await supabase
    .from('user_deck')
    .insert({ lang })
    .select()
  // console.log(`postNewDeck`, data, error)
  if (error) throw error
  return data[0] || null
}

type UserCardInsertInput = {
  phrase_id: Scalars['UUID']
  status?: Scalars['String']
  user_deck_id: Scalars['UUID']
}

export const postNewCard = async (
  object: UserCardInsertInput
): Promise<CardStub | null> => {
  // console.log(`postNewCard`, object)
  const { data, error } = await supabase
    .from('user_card')
    .insert(object)
    .select()
  // console.log(`postNewCard result: `, data, error)
  if (error) throw error
  return data[0] || null
}

type PhraseCardTranslationsInsertInput = {
  phrase: PhraseInsertInput
  phraseTranslations: Array<{
    text: string
    lang: string
    literal: string
  }>
  userDeckId: Scalars['UUID']
}

export const postNewPhraseCardTranslations = async ({
  phrase,
  phraseTranslations,
  userDeckId,
}: PhraseCardTranslationsInsertInput): Promise<any> => {
  console.log(
    `postNewPhraseCardTranslations`,
    phrase,
    phraseTranslations,
    userDeckId
  )
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession()
  if (error) throw error

  // everything is ready, let's go with the first
  const result1 = await request({
    ...requestOptions(access_token),
    variables: { objects: [phrase] },
    document: newPhraseMutation,
  })
  console.log(`this is the result of the newPhraseMutation`, result1)
  const phraseData = result1.insertIntoPhraseCollection.records[0]
  const { id: phraseId } = phraseData

  // we have a phrase! let's use its ID to construct
  // the translations and the card
  const phraseTranslationsInput = phraseTranslations.map(
    (t): PhraseTranslationInsertInput => {
      return {
        ...t,
        phraseId,
      }
    }
  )
  const phraseTranslationResponse = request({
    ...requestOptions(access_token),
    variables: {
      objects: phraseTranslationsInput,
    },
    document: newPhraseTranslationsMutation,
  })
  const userCardResponse = request({
    ...requestOptions(access_token),
    variables: { objects: [{ userDeckId, phraseId }] },
    document: newUserCardMutation,
  })

  // resolve both promises / post in parallel
  const [phraseTranslationData, userCardData] = await Promise.all([
    phraseTranslationResponse,
    userCardResponse,
  ])
  const userCardResult = userCardData.insertIntoUserCardCollection.records[0]
  const phraseTranslationsResult =
    phraseTranslationData.insertIntoPhraseTranslationCollection.records
  const result = {
    ...userCardResult,
    phrase: {
      ...phraseData,
      phraseTranslationCollection: {
        edges: phraseTranslationsResult.map(node => ({ node })),
      },
    },
  }
  console.log(result)
  return result
}
