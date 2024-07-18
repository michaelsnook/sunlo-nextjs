'use client'

import Link from 'next/link'
import { useAuth } from 'lib/auth-context'

export default function UserAuthCard() {
  const { userEmail } = useAuth()
  return (
    <div className="card card-body bg-base-100 text-base-content space-y-4">
      <h2 className="card-title">Login credentials</h2>
      <div className="flex flex-col w-full">
        <label className="font-bold px-3">Your email</label>
        <div className="flex flex-row">
          <input
            type="text"
            className="border rounded p-3 flex-grow bg-base-300 text-base-content/70"
            value={userEmail ?? 'loading...'}
            disabled
          />
          <Link href="/profile/change-email" className="btn btn-link">
            Change
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="font-bold px-3">Your password</label>
        <div className="flex flex-row">
          <input
            type="text"
            className="border rounded p-3 flex-grow bg-base-300 text-base-content/70"
            value="***************"
            disabled
          />
          <Link href="/profile/change-password" className="btn btn-link">
            Change
          </Link>
        </div>
      </div>
    </div>
  )
}
