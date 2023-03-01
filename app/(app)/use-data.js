import { useQuery } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'

const endpoint = 'https://graphqlzero.almansi.me/api'

export function usePost(postId) {
  return useQuery(
    ['post', postId],
    async () => {
      const { post } = await request(
        endpoint,
        gql`
        query {
          post(id: ${postId}) {
            id
            title
            body
          }
        }
        `
      )

      return post
    },
    {
      enabled: !!postId,
    }
  )
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request(
        endpoint,
        gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `
      )
      return data
    },
  })
}
