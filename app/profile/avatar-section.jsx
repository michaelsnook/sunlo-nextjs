'use client'

import Image from 'next/image'
import { useProfile } from 'app/data/hooks'

export default function AvatarSection() {
  const { data: profile } = useProfile()
  return (
    <header className="text-center my-4 max-w-sm mx-auto">
      <div className="avatar relative">
        {profile?.avatar_url && (
          <label
            className="mb-2 w-36 h-36 mask mask-circle shadow-lg bg-base-300"
            htmlFor="single"
          >
            <Image
              src={profile?.avatar_url}
              width="144"
              height="144"
              alt={`${profile?.username}'s profile image`}
            />
          </label>
        )}
      </div>
      <div>
        <h2 className="text-4xl">Hello {profile?.username} 👋</h2>
      </div>
    </header>
  )
}
