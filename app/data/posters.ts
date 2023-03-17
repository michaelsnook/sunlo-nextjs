import { request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import { requestOptions } from './constants'
import { newDeckMutation, newCardMutation } from 'app/data/mutations.js'

export const postNewDeck = async (lang: string) => {
  // console.log(`postNewDeck ${lang}`)
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession()
  if (error) throw error
  const result = await request({
    ...requestOptions(access_token),
    variables: { objects: [{ lang }] },
    document: newDeckMutation,
  })
  // console.log(`RESULT: `, result)
  return result.insertIntoUserDeckCollection.records[0]
}

export const postNewCard = async ({ status, phraseId, userDeckId }) => {
  console.log(`postNewCard`, status, phraseId, userDeckId)
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession()
  if (error) throw error
  const result = await request({
    ...requestOptions(access_token),
    variables: { objects: [{ status, phraseId: phraseId, userDeckId }] },
    document: newCardMutation,
  })
  // console.log(`RESULT: `, result)
  return result
}
