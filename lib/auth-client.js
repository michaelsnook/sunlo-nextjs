'use client'

import { useState, useEffect } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

const urqlAuthClient = session => {
  if (!session) return null
  return createURQLClient({
    url: `${supabaseUrl}/graphql/v1`,
    fetchOptions: function createFetchOptions() {
      return {
        headers: {
          apikey: publicKey,
          authorization: `Bearer ${session.access_token}`,
        },
      }
    },
    suspense: false,
  })
}

export const useUrqlQuery = (session, query, values = null) => {
  const [data, setData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (session)
      urqlAuthClient(session)
        .query(query, values)
        .toPromise()
        .then(r => {
          if (r.data) {
            setData(r.data)
            setError()
          }
          if (r.error) {
            setError(r.error)
          }
        })
  }, [])
  if (!session) return { isLoading: true }
  return { data, error, isLoading: !(data || error) }
}
