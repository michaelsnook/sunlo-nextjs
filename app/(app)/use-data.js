'use client'

import request from 'graphql-request'
import { useGlobalState } from 'lib/global-store'
import { useQuery } from 'react-query'
import { getMyDecksQuery } from './queries'
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`

const headers = access_token => {
  return access_token
    ? {
        Accept: 'application/json',
        apikey: publicKey,
        Authorization: `Bearer ${access_token}`,
      }
    : {
        Accept: 'application/json',
        apikey: publicKey,
      }
}

export function useDecks() {
  console.log(`useDecks`)
  const { session } = useGlobalState()
  // try to skip ??
  const requestHeaders = headers(session?.access_token)

  return useQuery('decks', async () => {
    const {
      decks: { data },
    } = await request({
      endpoint,
      query: getMyDecksQuery,
      requestHeaders,
    })
    return data
  })
}

export function useDeck(code) {
  console.log(`useDeck`)
  const { session } = useGlobalState()
  // try to skip the query when session is not present
  const eq = session ? code : -1
  const requestHeaders = headers(session?.access_token)

  return useQuery(['deck', eq], async () => {
    const {
      deck: { data },
    } = await request({
      endpoint,
      query: getFullDeckDetailsQuery,
      variables: {
        filter: {
          lang: {
            code,
          },
        },
      },
      requestHeaders,
    })
    return data
  })
}
