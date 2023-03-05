'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Sidebar from 'components/old/Sidebar'

const queryClient = new QueryClient()

export default function Layout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="md:flex flex-row gap-6 bg-primary text-white">
        <Sidebar shy={true} />
        <div className="flex-grow py-6 px-min min-h-60vh">
          <div className="container">{children}</div>
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
