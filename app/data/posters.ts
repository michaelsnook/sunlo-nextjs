import { request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import { requestOptions } from './constants'
import { newDeckMutation, newCardMutation } from 'app/data/mutations.js'
// import type { CardPhraseFilter, UserDeckInsertInput } from './gql/graphql'

export const postNewDeck = async (lang: string) => {
  // console.log(`postNewDeck ${lang}`)
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession()
  if (error) return { error }
  const result = await request({
    ...requestOptions(access_token),
    variables: { objects: [{ lang }] },
    document: newDeckMutation,
  })
  // console.log(`RESULT: `, result)
  return result
}

export const postNewCard = async ({ status, phraseId, deckId }) => {
  console.log(`postNewCard`, status, phraseId, deckId)
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession()
  if (error) return { error }
  const result = await request({
    ...requestOptions(access_token),
    variables: { objects: [{ status, cardPhraseId: phraseId, deckId }] },
    document: newCardMutation,
  })
  // console.log(`RESULT: `, result)
  return result
}
