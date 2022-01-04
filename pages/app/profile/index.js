import { useState } from 'react'
import Link from 'next/link'
import supabase from 'lib/supabase-client'
import AppProfileLayout from 'components/AppProfileLayout'
import { useGlobalState } from 'lib/global-store'
import ErrorList from 'components/ErrorList'

const ProfileCard = () => {
  const { profile, setProfile } = useGlobalState()
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const onSubmit = event => {
    event.preventDefault()
    setErrors()
    setIsSubmitting(false)
    console.log(event.target)
    const username = event.target.username.value
    const language_primary = event.target.language_primary.value
    const languages_spoken = event.target.languages_spoken.value
    supabase
      .from('profile')
      .update({ username, language_primary, languages_spoken })
      .match({ id: profile.id })
      .then(({ data, error }) => {
        setIsSubmitting(false)
        if (error) {
          setErrors(error)
          console.log('error', error)
        } else {
          // merge the objects so we keep avatar_public_url
          setProfile({ ...profile, ...data[0] })
          console.log('data', data)
        }
      })
  }

  return !profile || !profile?.username || !profile?.languages_spoken ? null : (
    <form onSubmit={onSubmit}>
      <fieldset
        className="card shadow-xl p-6 my-8 border grid grid-cols-1 sm:grid-cols-2 gap-4"
        disabled={!profile || isSubmitting}
      >
        <div className="flex flex-col">
          <label className="font-bold px-3">Your nickname</label>
          <input
            type="text"
            className="border rounded p-3"
            name="username"
            tabIndex="1"
            defaultValue={profile?.username || ''}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold px-3">Languages you know</label>
          <input
            type="text"
            className="border rounded p-3"
            name="languages_spoken"
            defaultValue={profile ? `{${profile?.languages_spoken}}` : ''}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold px-3">Primary language</label>
          <input
            type="text"
            className="border rounded p-3"
            name="language_primary"
            defaultValue={profile?.language_primary || ''}
          />
        </div>
        <div className="flex flex-col-reverse">
          <button
            className="btn btn-primary"
            disabled={!profile || isSubmitting}
          >
            Save changes
          </button>
        </div>
        <ErrorList summary="Problem updating profile" error={errors?.message} />
      </fieldset>
    </form>
  )
}

const UserAuthCard = () => {
  const { user } = useGlobalState()
  return (
    <div className="card shadow-xl p-6 my-8 border flex flex-col space-y-4">
      <div className="flex flex-col w-full">
        <label className="font-bold px-3">Your email</label>
        <div className="flex flex-row">
          <input
            type="text"
            className="border rounded p-3 flex-grow"
            value={user?.email}
            disabled
          />
          <Link href="/app/profile/change-email">
            <a className="btn btn-quiet">Change</a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="font-bold px-3">Your password</label>
        <div className="flex flex-row">
          <input
            type="text"
            className="border rounded p-3 flex-grow"
            value="***************"
            disabled
          />
          <Link href="/app/profile/change-password">
            <a className="btn btn-quiet">Change</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Profile() {
  return (
    <AppProfileLayout>
      <ProfileCard />
      <UserAuthCard />
    </AppProfileLayout>
  )
}
