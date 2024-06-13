'use client'

import { redirect } from 'next/navigation'
import { useAuth } from 'lib/auth-context'

export default function ClientPage({ children }) {
  const { isAuth } = useAuth()
  if (isAuth) {
    redirect('/home') // go to home page
  }
  return isAuth ? null : children
}
