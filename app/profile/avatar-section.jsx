'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useProfile } from 'app/data/hooks'
import { usePathname } from 'next/navigation'

export default function AvatarSection() {
  const { data: profile } = useProfile()
  const pathname = usePathname()
  return (
    <header className="text-center my-4 max-w-sm mx-auto">
      <div className="avatar relative">
        {profile?.avatar_url && (
          <label
            className="mb-2 w-36 h-36 mask mask-circle shadow-lg bg-gray-200"
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
        <p className="my-4">
          {pathname === '/profile' ? (
            <Link href="/getting-started" className="link md:link-hover">
              Go to profile setup
            </Link>
          ) : (
            <Link href="/profile" className="link md:link-hover">
              &larr; Back to profile
            </Link>
          )}
        </p>
      </div>
    </header>
  )
}
