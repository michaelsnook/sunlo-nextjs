import { createClient } from '@supabase/supabase-js'
import {
  createClient as createURQLClient,
  ssrExchange,
  // fetchExchange,
} from '@urql/core'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

const supabase = createClient(supabaseUrl, publicKey)

const isServerSide = typeof window === 'undefined'

const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
})

const anonHeaders = { apikey: publicKey }

export const urqlClient = createURQLClient({
  url: `${supabaseUrl}/graphql/v1`,
  fetchOptions: function createFetchOptions() {
    return { anonHeaders }
  },
  // exchanges: [ssr],
  // suspense: true,
})

export default supabase
