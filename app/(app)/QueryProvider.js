'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
/*
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY


export const queryClient = new QueryClient({
  defaultOptions: {
    headers: {
      Accept: 'application/json',
      apikey: publicKey,
    },
  },
})
*/

export const queryClient = new QueryClient()

export default function MySpecialQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
