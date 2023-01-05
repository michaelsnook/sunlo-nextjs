import { useState } from 'react'
import Link from 'next/link'
import supabase from 'lib/supabase-client'
import AppProfileLayout from 'components/AppProfileLayout'
import { useGlobalState } from 'lib/global-store'
import ErrorList from 'components/ErrorList'
import {
  // prependAndDedupe,
  convertNodeListToCheckedValues,
} from 'lib/data-helpers'

const ProfileCard = () => {
  const { profile, mergeProfileData, languages, isLoading } = useGlobalState()
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const onSubmit = event => {
    event.preventDefault()
    setErrors()
    setIsSubmitting(true)
    console.log(event.target)
    const username = event.target.username.value
    const language_primary = event.target.language_primary.value
    const languages_spoken_array = convertNodeListToCheckedValues(
      event.target.languages_spoken
    )
    supabase
      .from('profile')
      .update({
        username,
        language_primary,
        languages_spoken: [language_primary, ...languages_spoken_array],
      })
      .match({ uid: profile.uid })
      .then(({ data, error }) => {
        setIsSubmitting(false)
        if (error) {
          setErrors(error)
          console.log('error', error)
        } else {
          // merge the objects, which will rebuild context
          console.log('merge profile data', profile, data[0])
          mergeProfileData(data[0])
        }
      })
  }

  return !profile || isLoading ? null : (
    <form className="big-card flex flex-col space-y-4" onSubmit={onSubmit}>
      <h2 className="h3">Profile</h2>
      <fieldset
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        disabled={!profile || isSubmitting}
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="font-bold px-3">
            Your nickname
          </label>
          <input
            id="username"
            type="text"
            className="border rounded p-3"
            name="username"
            tabIndex="1"
            defaultValue={profile?.username || ''}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="language_primary" className="font-bold px-3">
            Primary language
          </label>
          <select
            name="language_primary"
            defaultValue={profile.language_primary || ''}
            className="border rounded p-3"
          >
            <option value="">-- select one --</option>
            {Object.keys(languages).map(k => (
              <option key={`language-primary-${k}`} value={k}>
                {languages[k]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="languages_spoken" className="font-bold px-3">
            Languages you know
          </label>
          <div className="py-3 border rounded overflow-auto h-40">
            {Object.keys(languages).map(k => (
              <p key={`languages-spoken-${k}`} className="flex">
                <label className="group-checked:bg-primary group-checked:text-white w-full px-3 py-1">
                  <input
                    type="checkbox"
                    className={`rounded mr-2 focus:outline-gray-400 select-none checked-${
                      profile.languages_spoken.indexOf(k) !== -1 ||
                      k === profile.language_primary
                    }`}
                    value={k}
                    name="languages_spoken"
                    defaultChecked={
                      profile.languages_spoken.indexOf(k) !== -1 ||
                      k === profile.language_primary
                    }
                  />
                  {languages[k]}
                </label>
              </p>
            ))}
          </div>
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
    <div className="big-card flex flex-col space-y-4">
      <h2 className="h3">Login credentials</h2>
      <div className="flex flex-col w-full">
        <label className="font-bold px-3">Your email</label>
        <div className="flex flex-row">
          <input
            type="text"
            className="border rounded p-3 flex-grow"
            value={user.email}
            disabled
          />
          <Link href="/app/profile/change-email" className="btn btn-quiet">
            Change
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
          <Link href="/app/profile/change-password" className="btn btn-quiet">
            Change
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
