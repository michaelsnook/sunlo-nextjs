'use client'

import { cacheExchange, dedupExchange, fetchExchange } from '@urql/core'
import { createClient, Provider } from 'urql'

import { useGlobalState } from 'lib/global-store'
import Sidebar from 'components/Sidebar'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

export default function Layout({ children }) {
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

  return (
    <Provider value={urqlAuthClient}>
      <div className="md:flex flex-row gap-6 bg-primary text-white">
        <Sidebar shy={true} />
        <div className="flex-grow py-6 px-min min-h-60vh">{children}</div>
      </div>
    </Provider>
  )
}
