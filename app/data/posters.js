import { gql, request } from 'graphql-request'
import supabase from 'lib/supabase-client'
import { requestOptions } from './constants'

const newDeckMutation = gql`
  mutation Mutation($objects: [UserDeckInsertInput!]!) {
    insertIntoUserDeckCollection(objects: $objects) {
      records {
        id
        lang
      }
    }
  }
`

export const postNewDeck = async lang => {
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
