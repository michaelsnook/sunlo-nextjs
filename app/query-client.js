import {
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from '@urql/core'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
const isServerSide = typeof window === 'undefined'

const ssr = ssrExchange({
  isClient: false,
  initialState: undefined,
})

const headers = {
  Accept: 'application/json',
  apikey: publicKey,
}

export const queryClient = createClient({
  url: `${supabaseUrl}/graphql/v1`,
  fetchOptions: function createFetchOptions() {
    return { headers }
  },
  exchanges: [dedupExchange, cacheExchange, fetchExchange, ssr],
  suspense: true,
})
export default queryClient
