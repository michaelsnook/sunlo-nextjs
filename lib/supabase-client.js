import { createClient } from '@supabase/supabase-js'
import {
  createClient as createURQLClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from '@urql/core'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

const supabase = createClient(supabaseUrl, publicKey)
const isServerSide = typeof window === 'undefined'

const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
})

const headers = {
  Accept: 'application/json',
  apikey: publicKey,
}

export const urqlClient = createURQLClient({
  url: `${supabaseUrl}/graphql/v1`,
  fetchOptions: function createFetchOptions() {
    return { headers }
  },
  exchanges: [dedupExchange, cacheExchange, fetchExchange, ssr],
  suspense: true,
})
export default supabase
