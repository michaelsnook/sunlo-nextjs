import { useState } from 'react'
import BannerLayout from 'components/BannerLayout'
import { useAuth } from 'lib/auth-context'
import supabase from 'lib/supabase-client'
import ErrorList from 'app/components/ErrorList'
import Link from 'next/link'
import { useProfile } from 'app/data/hooks'
import { prependAndDedupe } from 'lib/data-helpers'
import { useQueryClient } from '@tanstack/react-query'
import languages from 'lib/languages'

export default function Page() {
  const { user } = useAuth()
  const { data: profile } = useProfile()
  const queryClient = useQueryClient()

  const [tempLanguagePrimary, setTempLanguagePrimary] = useState()
  const tempLanguagePrimaryToUse =
    tempLanguagePrimary ?? profile?.language_primary
  const [tempDeckToAdd, setTempDeckToAdd] = useState()
  const [tempUsername, setTempUsername] = useState()
  const tempUsernameToUse = tempUsername ?? profile?.username
  const [errors, setErrors] = useState()
  const [isSubmitting, setIsSubmitting] = useState()
  const [successfulSetup, setSuccessfulSetup] = useState()

  const handleMainForm = () => {
    setErrors()
    setIsSubmitting(true)

    // an array with the new item at front, removing dupes of that same item
    const newLanguagesSpoken = prependAndDedupe(
      tempLanguagePrimary,
      profile.languages_spoken
    )
    supabase
      .from('user_profile')
      .upsert({
        username: tempUsernameToUse,
        language_primary: tempLanguagePrimaryToUse,
        languages_spoken: newLanguagesSpoken,
      })
      .match({ uid: user.id })
      .then(({ error }) => {
        if (error) {
          setErrors(error)
          console.log('error upserting', error)
          setIsSubmitting(false)
        } else {
          console.log('upsert profile data')

          if (typeof tempDeckToAdd === 'string' && tempDeckToAdd.length > 0) {
            supabase
              .from('user_deck')
              .upsert({ lang: tempDeckToAdd, uid: user.id })
              .match({ lang: tempDeckToAdd, uid: user.id })
              .then(({ data, error }) => {
                console.log('create new deck', data, error)
                if (error) {
                  setErrors(error)
                } else {
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
      .finally(() => {
        queryClient.invalidateQueries('user_profile')
      })
  }

  return profile === null ? null : (
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
              <Link
                href={`/my-decks/${tempDeckToAdd}`}
                className="mx-auto btn btn-secondary"
              >
                Get started learning {languages[tempDeckToAdd]}
                &nbsp;&rarr;
              </Link>
            ) : null}
            <Link href="/app/profile" className="mx-auto btn btn-quiet-dark">
              Go to your profile&nbsp;&rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-white p2 md:p-6 lg:p-10">
          {profile ? (
            <div className="absolute top-4 md:top-10">
              <Link href="/app/profile" className="link md:link-hover">
                &larr; Back to profile
              </Link>
            </div>
          ) : null}
          <h1 className="d1">Welcome to Sunlo</h1>
          <div className="max-w-prose">
            <p className="text-2xl my-4 mb-10">Let&apos;s get started</p>
            <SetPrimaryLanguageStep
              value={tempLanguagePrimaryToUse}
              set={setTempLanguagePrimary}
            />
            <CreateFirstDeckStep value={tempDeckToAdd} set={setTempDeckToAdd} />
            <SetUsernameStep value={tempUsernameToUse} set={setTempUsername} />

            {tempLanguagePrimaryToUse &&
            (tempDeckToAdd || profile.user_decks?.length > 0) &&
            tempUsernameToUse ? (
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
                    setTempLanguagePrimary(profile?.language_primary)
                    setTempDeckToAdd()
                    setTempUsername(profile?.username)
                  }}
                  className="btn btn-primary"
                >
                  Reset page
                </button>
              </div>
            ) : null}
          </div>
          <ErrorList summary="Couldn't save profile" error={errors?.message} />
        </div>
      )}
    </BannerLayout>
  )
}

const SetPrimaryLanguageStep = ({ value, set }) => {
  const [closed, setClosed] = useState(!!value)
  return closed && value?.length > 0 ? (
    <Completed>
      <p className="h4">
        Your primary language is <Highlight>{languages[value]}</Highlight>
      </p>
      <X set={() => setClosed()} />
    </Completed>
  ) : (
    <form
      className="big-card mb-16"
      onSubmit={e => {
        e.preventDefault()
        setClosed(true)
        set(e.target.language_primary.value)
      }}
    >
      <h2 className="h2">Set primary language</h2>
      <div className="flex flex-col">
        <label className="font-bold py-2">The language you know best</label>
        <select
          value={value || ''}
          name="language_primary"
          onChange={e => {
            e.preventDefault()
            set(e.target.value)
            setClosed(true)
          }}
          className="border rounded p-3 mb-6"
        >
          <option value="">-- select one --</option>
          <option value="eng">English</option>
          {Object.keys(languages).map(k => {
            return k === 'eng' ? null : (
              <option key={`language-dropdown-option-${k}`} value={k}>
                {languages[k]}
              </option>
            )
          })}
        </select>
        {value ? (
          <a
            className="link"
            onClick={e => {
              e.preventDefault()
              setClosed(true)
            }}
          >
            Continue with {languages[value]}
          </a>
        ) : null}
      </div>
    </form>
  )
}

const CreateFirstDeckStep = ({ value, set }) => {
  const { data } = useProfile()
  const decks = data?.user_decks || []
  const [closed, setClosed] = useState(decks?.length > 0)
  return closed ? (
    <Completed>
      <h2 className="h4 flex-none">
        {!value && decks?.length > 0 ? (
          <>
            You&apos;re working on{' '}
            <Highlight>
              {decks?.map(v => languages[v.lang]).join(', ')}
            </Highlight>
          </>
        ) : !value && !decks?.length > 0 ? (
          <>Wait you have to learn something or what&apos;s the point</>
        ) : (
          <>
            Starting a deck of flash cards for{' '}
            <Highlight>{languages[value]}</Highlight> phrases
          </>
        )}
      </h2>

      <X
        plus={!value && decks?.length > 0}
        set={() => {
          set()
          setClosed()
        }}
      />
    </Completed>
  ) : (
    <form className="big-card mb-16">
      <h2 className="h2">
        Create {decks?.length === 0 ? 'your first deck' : 'another deck'}
      </h2>
      {decks?.length > 0 ? (
        <p className="py-2">
          FYI you&apos;re already learning{' '}
          {decks?.map(v => languages[v.lang]).join(', ')}
        </p>
      ) : null}
      <div className="flex flex-col">
        <label className="font-bold py-2">The language you want to learn</label>
        <select
          value={value || ''}
          name="language_primary"
          onChange={e => {
            e.preventDefault()
            set(e.target.value)
            setClosed(true)
          }}
          className="border rounded p-3 mb-6"
        >
          <option value="">-- select one --</option>
          {Object.keys(languages).map(k => (
            <option key={`language-dropdown-option-${k}`} value={k}>
              {languages[k]}
            </option>
          ))}
        </select>
        {decks?.length > 0 && !value ? (
          <a
            onClick={e => {
              e.preventDefault()
              setClosed(true)
            }}
            className="link"
          >
            Skip this step
          </a>
        ) : null}
      </div>
    </form>
  )
}

const SetUsernameStep = ({ value, set }) => {
  const [closed, setClosed] = useState(value?.length > 0)
  return closed && value ? (
    <Completed>
      <p className="h4 block">
        Your username is <Highlight>{value}</Highlight>
      </p>
      <X set={() => setClosed()} />
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
          value={value || ''}
          onChange={e => {
            setClosed()
            set(e.target.value)
          }}
        />
      </div>
      <button onClick={setClosed} className="btn btn-quiet my-4" type="submit">
        Do the thing
      </button>
    </form>
  )
}

const X = ({ set, plus }) => (
  <button
    onClick={() => set()}
    className={`btn btn-quiet-dark rounded-full block flex-none ${
      plus ? 'rotate-45' : ''
    }`}
  >
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
  <div className="py-4 px-6 rounded-xl glass text-white mb-8 flex flex-row gap-x-4 justify-between">
    <div>{children[0]}</div>
    <div className="place-self-center">{children[1]}</div>
  </div>
)

const Highlight = ({ children }) => (
  <span className="px-1 font-bold bg-accent bg-opacity-60 inline">
    {children}
  </span>
)
