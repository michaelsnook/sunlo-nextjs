'use client'

import { cacheExchange, dedupExchange, fetchExchange } from '@urql/core'
import { createClient, Provider } from 'urql'
import { useGlobalState } from 'lib/global-store'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

export default function QueryProvider({ children }) {
  const { session } = useGlobalState()
  const urqlAuthClient = createClient({
    url: `${supabaseUrl}/graphql/v1`,
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
    fetchOptions: function createFetchOptions() {
      return {
        headers: {
          Accept: 'application/json',
          apikey: publicKey,
          authorization: `Bearer ${session?.access_token}`,
        },
      }
    },
    suspense: false,
  })

  return <Provider value={urqlAuthClient}>{children}</Provider>
}
