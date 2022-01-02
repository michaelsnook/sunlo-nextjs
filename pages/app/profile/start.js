import { useState } from 'react'
import BannerLayout from '../../../components/BannerLayout'
import { useGlobalState } from '../../../lib/global-store'
import supabase from '../../../lib/supabase-client'
import ErrorList from '../../../components/ErrorList'
import Link from 'next/link'

export default function Start() {
  const { user, profile, setProfile, languages } = useGlobalState()
  const [tempLanguagePrimary, setTempLanguagePrimary] = useState()
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
          <div className="flex flex-col space-y-4">
            {tempDeckToAdd ? (
              <Link href={`/app/decks/${tempDeckToAdd}`}>
                <a className="mx-auto btn btn-secondary">
                  Get started learning {languages[tempDeckToAdd]}
                  &nbsp;&rarr;
                </a>
              </Link>
            ) : null}
            <Link href="/app/profile">
              <a className="mx-auto btn btn-quiet-dark">
                Go to your profile&nbsp;&rarr;
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-white p2 md:p-6 lg:p-10">
          <h1 className="d1">Welcome to Sunlo</h1>
          <div className="max-w-prose">
            <p className="text-2xl my-4 mb-10">Let&apos;s get you started!</p>
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
  const { languages } = useGlobalState()
  return value ? (
    <Completed>
      <h2 className="h4">Primary language is {languages[value]}</h2>
      <X set={set} />
    </Completed>
  ) : (
    <form
      className="big-card mb-16"
      onSubmit={e => {
        e.preventDefault()
        set(e.target.language_primary.value)
      }}
    >
      <h2 className="h2">Set primary language</h2>
      <div className="flex flex-col">
        <label className="font-bold py-2">The language you know best</label>
        <select
          name="language_primary"
          onChange={e => {
            e.preventDefault()
            set(e.target.value)
          }}
          className="border rounded p-3 mb-6"
        >
          <option value="">-- select one --</option>
          <option value="EN">English</option>
          {languages &&
            Object.keys(languages).map(k => {
              return k === 'EN' ? null : (
                <option key={`language-dropdown-option-${k}`} value={k}>
                  {languages[k]}
                </option>
              )
            })}
        </select>
      </div>
    </form>
  )
}

const CreateFirstDeckStep = ({ value, previousValues, set }) => {
  const { languages } = useGlobalState()
  return value ? (
    <Completed>
      <h2 className="h4">Working on a deck of {languages[value]} cards</h2>
      <X set={set} />
    </Completed>
  ) : (
    <form className="big-card mb-16">
      <h2 className="h2">
        Create{' '}
        {previousValues?.length === 0 ? 'your first deck' : 'another deck'}
      </h2>
      {previousValues?.length > 0 ? (
        <p className="py-2">
          FYI you&apos;re already learning{' '}
          {previousValues.map(v => languages[v.lang]).join(', ')}
        </p>
      ) : null}
      <div className="flex flex-col">
        <label className="font-bold py-2">The language you want to learn</label>
        <select
          name="language_primary"
          onChange={e => {
            e.preventDefault()
            set(e.target.value)
          }}
          className="border rounded p-3 mb-6"
        >
          <option value="">-- select one --</option>
          {languages &&
            Object.keys(languages).map(k => (
              <option key={`language-dropdown-option-${k}`} value={k}>
                {languages[k]}
              </option>
            ))}
        </select>
      </div>
    </form>
  )
}

const SetUsernameStep = ({ value, set }) => {
  return value ? (
    <Completed>
      <h2 className="h4">Your username is {value}</h2>
      <X set={set} />
    </Completed>
  ) : (
    <form
      className="big-card mb-16"
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

const X = ({ set }) => (
  <button onClick={() => set()} className="btn btn-quiet-dark rounded-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
)

const Completed = ({ children }) => (
  <div className="alert bg-white bg-opacity-10 text-white mb-8 flex flex-row justify-between">
    {children}
  </div>
)
