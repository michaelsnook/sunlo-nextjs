'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import ErrorList from 'components/ErrorList'
import SelectMultipleLanguagesInput from 'components/select-multiple-languages'
import languages from 'lib/languages'
import Loading from 'app/loading'
import { useProfile } from 'app/data/hooks'
import { toast } from 'react-hot-toast'
import AvatarEditor from './avatar-edit'
import type { ChangeEvent, FormEvent } from 'react'
import { Scalars } from 'types/utils'

export default function UpdateProfileForm() {
  const { data } = useProfile()
  return !data ? <Loading className="mt-0" /> : <Form initialData={data} />
}

function Form({
  initialData: {
    username,
    language_primary,
    languages_spoken,
    avatar_url,
    uid,
  },
}: {
  initialData: {
    username: string
    language_primary: string
    languages_spoken: Array<string>
    avatar_url: string
    uid: Scalars['UUID']
  }
}) {
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    username,
    language_primary,
    languages_spoken,
    avatar_url,
  })

  const setNewAvatarUrl = (val: string) =>
    setFormData({ ...formData, avatar_url: val })
  const setSelectedLanguages = (val: Array<string>) =>
    setFormData({ ...formData, languages_spoken: val })
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const updateProfile = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('user_profile')
        .update(formData)
        .match({ uid })
        .select()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success(`Successfully updated your profile`)
      queryClient.invalidateQueries({ queryKey: ['user_profile'] })
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateProfile.mutate()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <fieldset
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        disabled={updateProfile.isSubmitting}
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
            tabIndex={1}
            defaultValue={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="language_primary" className="font-bold px-3">
            Primary language
          </label>
          <select
            name="language_primary"
            onChange={handleInputChange}
            defaultValue={formData.language_primary}
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
            selectedLanguages={formData.languages_spoken}
            setSelectedLanguages={setSelectedLanguages}
            except={formData.language_primary}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold px-3">Profile picture</label>

          <AvatarEditor url={formData.avatar_url} onUpload={setNewAvatarUrl} />
        </div>
        <div className="flex flex-col-reverse">
          <button
            className="btn btn-primary"
            disabled={updateProfile.isSubmitting}
          >
            Save changes
          </button>
        </div>
        <ErrorList
          summary="Problem updating profile"
          error={updateProfile?.error?.message}
        />
      </fieldset>
    </form>
  )
}
