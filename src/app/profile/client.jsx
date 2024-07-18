'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { useAuth } from 'lib/auth-context'
import ErrorList from 'components/ErrorList'
import languages from 'lib/languages'
import Loading from 'app/loading'
import { useProfile } from 'app/data/hooks'
import { toast } from 'react-hot-toast'
import AvatarEditor from './avatar-edit'
import { SelectMultipleLanguagesInput } from 'components/select-multiple-languages-input'

export const ProfileCard = () => {
  const queryClient = useQueryClient()
  const [newAvatarUrl, setNewAvatarUrl] = useState()

  const {
    data: profile,
    error: profileError,
    status: profileStatus,
  } = useProfile()
  const [selectedLanguages, setSelectedLanguages] = useState()
  const languagesFinal = selectedLanguages || profile?.languages_spoken

  const updateProfile = useMutation({
    mutationFn: async event => {
      event.preventDefault()
      console.log(event.target)
      const username = event.target.username.value
      const language_primary = event.target.language_primary.value

      const { data, error } = await supabase
        .from('user_profile')
        .update({
          username,
          language_primary,
          languages_spoken: languagesFinal,
          avatar_url: newAvatarUrl || profile?.avatar_url,
        })
        .match({ uid: profile.uid })
        .select()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success(`Successfully updated your profile`)
      queryClient.invalidateQueries({ queryKey: ['user_profile'] })
    },
  })

  // console.log(profile)
  return (
    <form
      className="card card-body text-base-content bg-base-100 space-y-4"
      onSubmit={updateProfile.mutate}
    >
      <h2 className="card-title">Basic info</h2>
      {profileError ? (
        <ErrorList error={profileError} />
      ) : profileStatus === 'loading' || !profile ? (
        <Loading />
      ) : (
        <fieldset
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          disabled={!profile || updateProfile.isSubmitting}
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="font-bold px-3">
              Your nickname
            </label>
            <input
              id="username"
              type="text"
              className="s-input"
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
              className="s-input"
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
            <SelectMultipleLanguagesInput
              selectedLanguages={languagesFinal}
              setSelectedLanguages={setSelectedLanguages}
              except={profile?.language_primary}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold px-3">Profile picture</label>

            <AvatarEditor
              url={newAvatarUrl || profile?.avatar_url}
              onUpload={setNewAvatarUrl}
            />
          </div>
          <div className="flex flex-col-reverse">
            <button
              className="btn btn-primary"
              disabled={!profile || updateProfile.isSubmitting}
            >
              Save changes
            </button>
          </div>
          <ErrorList
            summary="Problem updating profile"
            error={updateProfile?.error?.message}
          />
        </fieldset>
      )}
    </form>
  )
}

export const UserAuthCard = () => {
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
