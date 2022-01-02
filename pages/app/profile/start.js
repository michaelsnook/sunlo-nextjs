import { useState } from 'react'
import BannerLayout from '../../../components/BannerLayout'
import { useGlobalState } from '../../../lib/global-store'
import supabase from '../../../lib/supabase-client'
import ErrorList from '../../../components/ErrorList'
import Link from 'next/link'

export default function Start() {
  const { user, profile, setProfile } = useGlobalState()
  const [tempLanguagePrimary, setTempLanguagePrimary] = useState('HI')
  const [tempDeckToAdd, setTempDeckToAdd] = useState()
  const [tempUsername, setTempUsername] = useState()
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [successfulSetup, setSuccessfulSetup] = useState()

  const handleMainForm = event => {
    setErrors()
    setIsSubmitting(true)

    event.preventDefault()
    supabase
      .from('profile')
      .upsert({
        id: user.id,
        username: tempUsername,
        language_primary: tempLanguagePrimary,
        languages_spoken: [tempLanguagePrimary],
      })
      .match({ id: user.id })
      .then(({ data, error }) => {
        if (error) {
          setErrors(error)
          console.log('error upserting', error)
          setIsSubmitting(false)
        } else {
          // merge the objects so we keep avatar_public_url
          setProfile(data[0])
          console.log('upsert profile data', data[0])

          if (typeof tempDeckToAdd === 'string' && tempDeckToAdd.length > 0) {
            supabase
              .from('user_deck')
              .upsert({ lang: tempDeckToAdd, profile_id: user.id })
              .match({ profile_id: user.id, lang: tempDeckToAdd })
              .then(({ data, error }) => {
                console.log('create decks', data, error)
                if (error) {
                  setErrors(error)
                } else {
                  const profile_decks = profile?.decks || []
                  setProfile({ ...profile, decks: [...profile_decks, ...data] })
                  setSuccessfulSetup(true)
                }
                setIsSubmitting(false)
              })
          } else {
            setIsSubmitting(false)
            setSuccessfulSetup(true)
          }
        }
      })
  }

  return !user ? null : (
    <BannerLayout>
      {successfulSetup ? (
        <div className="p2 md:p-6 lg:p-10 max-w-prose text-white min-h-85vh flex flex-col gap-12 justify-center">
          <div className="flex flex-row justify-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-accent bg-white rounded-full"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="h1">You&apos;re all set!</h1>
          </div>
          {tempDeckToAdd ? (
            <Link href={`/app/decks/${tempDeckToAdd}`}>
              <a className="mx-auto link">
                Go to your {tempDeckToAdd} deck to start learning &rarr;
              </a>
            </Link>
          ) : null}
          <Link href="/app/profile">
            <a className="mx-auto link">Go to your profile now &rarr;</a>
          </Link>
        </div>
      ) : (
        <div className="text-white p2 md:p-6 lg:p-10">
          <h1 className="d1">Welcome to Sunlo</h1>
          <div className="max-w-prose">
            <p className="text-2xl my-4 mb-10">
              Just fill this out page to get started...
            </p>
            <SetPrimaryLanguageStep
              value={tempLanguagePrimary}
              set={setTempLanguagePrimary}
            />
            <CreateFirstDeckStep
              value={tempDeckToAdd}
              previousValues={profile?.decks}
              set={setTempDeckToAdd}
            />
            <SetUsernameStep value={tempUsername} set={setTempUsername} />

            {tempLanguagePrimary &&
            (tempDeckToAdd || profile?.decks?.length > 0) &&
            tempUsername ? (
              <div className="my-6 flex flex-row-reverse justify-around items-center">
                <button
                  onClick={handleMainForm}
                  className="btn btn-accent md:btn-lg"
                  disabled={isSubmitting}
                >
                  Confirm and get started!
                </button>
                <button
                  onClick={() => {
                    setErrors()
                    setIsSubmitting()
                    setTempLanguagePrimary()
                    setTempDeckToAdd()
                    setTempUsername()
                  }}
                  className="btn btn-primary"
                >
                  Reset page
                </button>
              </div>
            ) : null}
          </div>
          <ErrorList
            summary="Couldn't save profile"
            error={errors?.message}
            asCard
          />
        </div>
      )}
    </BannerLayout>
  )
}

const SetPrimaryLanguageStep = ({ value, set }) => {
  return value ? (
    <div className="alert text-gray-800 mb-6 flex flex-row justify-between">
      <h2 className="h4">Primary language is {value}</h2>
      <button onClick={() => set()} className="btn btn-quiet">
        clear
      </button>
    </div>
  ) : (
    <form
      className="big-card"
      onSubmit={e => {
        e.preventDefault()
        set(e.target.language_primary.value)
      }}
    >
      <h2 className="h2">Set primary language</h2>
      <div className="flex flex-col">
        <label className="font-bold py-2"></label>
        <input
          className="border rounded p-3"
          name="language_primary"
          type="text"
          defaultValue={value || 'EN'}
        />
      </div>
      <button className="btn btn-quiet my-4" type="submit">
        Select language
      </button>
    </form>
  )
}

const CreateFirstDeckStep = ({ value, previousValues, set }) => {
  return value ? (
    <div className="alert text-gray-800 mb-6 flex flex-row justify-between">
      <h2 className="h4">Working on a deck of {value} cards</h2>
      <button onClick={() => set()} className="btn btn-quiet">
        clear
      </button>
    </div>
  ) : (
    <form
      className="big-card"
      onSubmit={e => {
        e.preventDefault()
        const lang = e.target.deck_language.value
        if (lang) set(lang)
      }}
    >
      <h2 className="h2">
        Create{' '}
        {previousValues?.length === 0 ? 'your first deck' : 'another deck'}
      </h2>
      {previousValues?.length > 0 ? (
        <p className="py-2">
          FYI you&apos;re already learning{' '}
          {previousValues.map(v => v.lang).join(', ')}
        </p>
      ) : null}
      <div className="flex flex-col">
        <label className="font-bold py-2">
          What language will you learn next?
        </label>
        <input
          className="border rounded p-3"
          type="text"
          name="deck_language"
          devaultValue={value}
        />
      </div>
      <button className="btn btn-quiet my-4" type="submit">
        Add this deck
      </button>
    </form>
  )
}

const SetUsernameStep = ({ value, set }) => {
  return value ? (
    <div className="alert text-gray-800 mb-6 flex flex-row justify-between">
      <h2 className="h4">Your username is {value}</h2>
      <button onClick={() => set()} className="btn btn-quiet">
        clear
      </button>
    </div>
  ) : (
    <form
      className="big-card"
      onSubmit={e => {
        e.preventDefault()
        set(e.target.username.value)
      }}
    >
      <h2 className="h2">Pick a username</h2>
      <div className="flex flex-col">
        <label className="font-bold py-2">
          Username for your public profile
        </label>
        <input
          type="text"
          className="border rounded p-3"
          name="username"
          placeholder="Lernie McSanders"
          devaultValue={value}
        />
      </div>
      <button className="btn btn-quiet my-4" type="submit">
        Do the thing
      </button>
    </form>
  )
}
