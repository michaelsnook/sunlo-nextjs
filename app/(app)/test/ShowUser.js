'use client'

import { useAuthState } from 'lib/auth-provider'

export default function ShowUser() {
  const { user, profile } = useAuthState()
  return (
    <div className="border border-gray-300 my-6 p-4">
      showing the user here: {JSON.stringify({ user, profile })}
    </div>
  )
}
