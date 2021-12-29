// import Link from 'next/link'
import Image from 'next/image'
import AppLayout from '../../../components/AppLayout'
import { useGlobalState } from '../../../lib/global-store'

export async function sendPasswordResetEmail() {
  // const { data, error } = supabase.auth.sendPassword whatever whatever
  return true
}

const ProfileCard = ({ profile, user }) => (
  <div className="card shadow-xl p-6 my-4 bordered grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="font-bold px-3">name</label>
      <input
        type="text"
        className="border rounded p-3"
        value={profile?.username}
        disabled
      />
    </div>
    <div className="flex flex-col">
      <label className="font-bold px-3">email</label>
      <input
        type="text"
        className="border rounded p-3"
        value={user?.email}
        disabled
      />
    </div>
    <div className="flex flex-col">
      <label className="font-bold px-3">languages you speak</label>
      <input
        type="text"
        className="border rounded p-3"
        value={profile?.languages_spoken}
        disabled
      />
    </div>
    <div className="flex flex-col">
      <label className="font-bold px-3">your primary language</label>
      <input
        type="text"
        className="border rounded p-3"
        value={profile?.language_primary}
        disabled
      />
    </div>
    <div className="flex flex-col">
      <label className="font-bold px-3">reset your password</label>
      <button
        className="btn btn-quiet"
        onClick={sendPasswordResetEmail}
        role="button"
      >
        Send password reset email
      </button>
    </div>
    <div className="flex flex-col">
      <label className="font-bold px-3">your user ID</label>
      <input
        type="text"
        className="border rounded p-3"
        value={user?.id}
        disabled
      />
    </div>
  </div>
)

export default function Profile() {
  const { user, profile, profileError: error } = useGlobalState()
  console.log('Render profile', user, profile)

  return (
    <AppLayout>
      {error !== {} ? <p>{JSON.stringify(error)}</p> : null}
      <div className="avatar relative">
        <label
          className="mb-8 w-36 h-36 mask mask-hexagon shadow-lg bg-gray-200"
          htmlFor="single"
        >
          <Image
            src={`/images/avatars/${profile?.avatar_url}`}
            width="144"
            height="144"
            alt={profile?.data?.username}
          />
        </label>
      </div>
      <div>
        <h2 className="text-4xl mb-1">Hi, {profile?.data?.username} 👋</h2>
        <span className="inline-block px-3 py-2 bg-gray-400 text-white rounded-full">
          You&apos;re working on {profile?.decks?.length || 'zero'} languages
          right now.
        </span>
      </div>
      <ProfileCard profile={profile} user={user} />
    </AppLayout>
  )
}
