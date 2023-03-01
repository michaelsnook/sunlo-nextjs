'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function Layout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto py-4">{children}</div>
    </QueryClientProvider>
  )
}
