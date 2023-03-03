'use client'

import { useQuery } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'
import supabase from 'lib/supabase-client'
import {
  userDeckDetailsQuery,
  getAllMyDecksQuery,
  getManyCardsDetailsQuery,
} from 'app/data/queries'

const endpoint = 'https://graphqlzero.almansi.me/api'
const endpoint2 = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
const defaultHeaders = {
  Accept: 'application/json',
  apikey: supabaseApiKey,
}

const addTokenToHeaders = token => {
  console.log(`1 running addTokenToHeaders `, token)

  const result = token
    ? {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      }
    : defaultHeaders
  console.log(`2 running addTokenToHeaders `, result)
  return result
}

export function useDeck(deckLang) {
  const filter = {
    lang: {
      eq: deckLang,
    },
  }

  const variables = { filter }

  console.log(`run useDeck for "${deckLang}"`)
  return useQuery({
    queryKey: ['deck', deckLang],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      const response = await request({
        url: endpoint2,
        document: userDeckDetailsQuery,
        variables,
        requestHeaders: addTokenToHeaders(session.access_token),
      })
      console.log('response from await request', response)
      return response
    },
    enabled: !!deckLang,
    retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function usePost(postId) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { post } = await request({
        url: endpoint,
        document: gql`
          query {
            post(id: ${postId}) {
              id
              title
              body
            }
          }
        `,
      })

      return post
    },
    enabled: !!postId,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })
}

export function useDecks() {
  return useQuery({
    queryKey: ['decks'],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) return {}

      const data2 = await request({
        url: endpoint2,
        document: getAllMyDecksQuery,
        requestHeaders: addTokenToHeaders(session.access_token),
      })
      return data2
    },
    enabled: true,
    // retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })
}

export function usePhrases() {
  return useQuery({
    queryKey: ['phrases'],
    queryFn: async () => {
      const data = await request({
        url: endpoint2,
        document: getManyCardsDetailsQuery,
        requestHeaders: defaultHeaders,
      })
      return data
    },
    enabled: true,
    // retry: false,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request({
        url: endpoint,
        document: gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `,
      })
      return data
    },
    enabled: true,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })
}
