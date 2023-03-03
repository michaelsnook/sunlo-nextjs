'use client'

import { useQuery } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'

const endpoint = 'https://graphqlzero.almansi.me/api'

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
