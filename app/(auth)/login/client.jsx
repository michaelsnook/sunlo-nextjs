'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuth } from 'lib/auth-context'

export default function ClientPage({ children }) {
  const { isAuth } = useAuth()

  useEffect(() => {
    if (isAuth) {
      redirect('/home') // go to home page
    }
  }, [isAuth])

  return isAuth ? null : children
}
