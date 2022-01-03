import Image from 'next/image'
import Link from 'next/link'
import AppLayout from 'components/AppLayout'
import { useGlobalState } from 'lib/global-store'

const AvatarSection = () => {
  const { profile } = useGlobalState()
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
          <Link href="/app/profile/start">
            <a className="link">Go to profile setup</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default function AppProfileLayout({ children }) {
  return (
    <AppLayout>
      <>
        <AvatarSection />
        {children}
      </>
    </AppLayout>
  )
}
