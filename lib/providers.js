'use client'

// import AuthProvider from './AuthProvider'
import { AuthStateProvider } from 'lib/auth-provider'

export function Providers({ children }) {
  return <AuthStateProvider>{children}</AuthStateProvider>
}
