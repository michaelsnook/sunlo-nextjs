import { createClient } from '@supabase/supabase-js'
import {
  createClient as createURQLClient,
  ssrExchange,
  // fetchExchange,
} from '@urql/core'

const supabase = createClient(
  'https://hepudeougzlgnuqvybrj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcHVkZW91Z3psZ251cXZ5YnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyMjUxNDUsImV4cCI6MTk4NzgwMTE0NX0.S-d_AqcE9PVzGny-zedgrdjIBecrgQ5VrLyquSV1P4k'
)

export default supabase

const isServerSide = typeof window === 'undefined'

const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
})

const headers = {
  apikey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcHVkZW91Z3psZ251cXZ5YnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyMjUxNDUsImV4cCI6MTk4NzgwMTE0NX0.S-d_AqcE9PVzGny-zedgrdjIBecrgQ5VrLyquSV1P4k',
}

export const urqlClient = createURQLClient({
  url: 'https://hepudeougzlgnuqvybrj.supabase.co/graphql/v1',
  fetchOptions: function createFetchOptions() {
    return { headers }
  },
  // exchanges: [ssr],
  // suspense: true,
})
