import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AppLayout from 'components/AppLayout'
import { useProfile } from 'app/data/hooks'
import QueryProvider from 'app/query-provider'

const AvatarSection = () => {
  const { data: profile } = useProfile()
  const pathname = usePathname()
  return (
    <>
      <div className="avatar relative">
        <label
          className="mb-8 w-36 h-36 mask mask-circle shadow-lg bg-gray-200"
          htmlFor="single"
        >
          {profile?.avatar_public_url ? (
            <Image
              src={profile?.avatar_public_url}
              width="144"
              height="144"
              alt={`${profile?.username}'s profile image`}
            />
          ) : null}
        </label>
      </div>
      <div>
        <h2 className="text-4xl">Hi, {profile?.username} 👋</h2>
        <p className="my-4">
          {pathname === '/app/profile' ? (
            <Link href="/app/profile/start" className="link md:link-hover">
              Go to profile setup
            </Link>
          ) : (
            <Link href="/app/profile" className="link md:link-hover">
              &larr; Back to profile
            </Link>
          )}
        </p>
      </div>
    </>
  )
}

export default function AppProfileLayout({ children }) {
  return (
    <QueryProvider>
      <AppLayout>
        <>
          <AvatarSection />
          {children}
        </>
      </AppLayout>
    </QueryProvider>
  )
}
