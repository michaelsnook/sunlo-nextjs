'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from 'components/auth-context'
import supabase from 'lib/supabase-client'
import Navbar from 'app/(app)/navbar'
import ErrorList from 'components/error-list'
import Link from 'next/link'
import { useProfile } from 'app/data/hooks'
import { prependAndDedupe } from 'lib/helpers'
import { useQueryClient } from '@tanstack/react-query'
import languages from 'lib/languages'
import SuccessCheckmark from 'components/svg-components'

export const dynamic = 'force-dynamic'

export default function Client() {
  const { userId } = useAuth()
  const { data: profile } = useProfile()
  const queryClient = useQueryClient()

  const [tempLanguagePrimary, setTempLanguagePrimary] = useState()
  const [tempDeckToAdd, setTempDeckToAdd] = useState()
  const [tempUsername, setTempUsername] = useState()
  const tempLanguagePrimaryToUse =
    tempLanguagePrimary ?? profile?.language_primary
  const tempUsernameToUse = tempUsername ?? profile?.username
  const newLanguagesSpoken = prependAndDedupe(
    tempLanguagePrimary,
    profile?.languages_spoken
  )

  const reset = () => {
    setTempLanguagePrimary(profile?.language_primary)
    setTempDeckToAdd()
    setTempUsername(profile?.username)
  }

  const mainForm = useMutation({
    mutationFn: async event => {
      event.preventDefault()
      if (typeof userId !== 'string') throw 'No logged in user'
      if (
        !tempUsername &&
        !tempLanguagePrimary &&
        typeof tempDeckToAdd !== 'string'
      )
        throw 'Nothing to update'

      const profileUpsert =
        !tempUsername && !tempLanguagePrimary
          ? null
          : await supabase
              .from('user_profile')
              .upsert({
                username: tempUsernameToUse,
                language_primary: tempLanguagePrimaryToUse,
                languages_spoken: newLanguagesSpoken,
              })
              .match({ uid: userId })
              .select()

      if (profileUpsert?.error) {
        console.log('Profile upsert error', profileUpsert.error)
        throw profileUpsert.error
      }

      const deckInsert =
        typeof tempDeckToAdd !== 'string'
          ? null
          : await supabase
              .from('user_deck')
              .upsert({ lang: tempDeckToAdd, uid: userId })
              .match({ lang: tempDeckToAdd, uid: userId })
              .select()

      if (deckInsert?.error) {
        console.log(`Deck insert error`, deckInsert?.error)
        throw deckInsert?.error
      }

      return {
        deck: deckInsert?.data[0],
        profile: profileUpsert?.data[0],
      }
    },
    onSuccess: data => {
      console.log(`Success! deck, profile`, data)
      queryClient.invalidateQueries({ queryKey: ['user_profile'] })
    },
  })

  return profile === null ? null : mainForm.isSuccess ? (
    <main className="p2 w-app flex min-h-[85vh] flex-col justify-center gap-12 text-white md:p-6 lg:p-10">
      <div className="flex flex-row place-items-center justify-center gap-4">
        <SuccessCheckmark />
        <h1 className="h1">You&apos;re all set!</h1>
      </div>
      <div className="flex flex-col space-y-4">
        {tempDeckToAdd ? (
          <Link
            href={`/my-decks/${tempDeckToAdd}`}
            className="btn btn-secondary mx-auto"
          >
            Get started learning {languages[tempDeckToAdd]}
            &nbsp;&rarr;
          </Link>
        ) : null}
        <Link href="/profile" className="btn btn-ghost mx-auto">
          Go to your profile&nbsp;&rarr;
        </Link>
      </div>
    </main>
  ) : (
    <>
      <main className="p2 text-white md:p-6 lg:p-10">
        <h1 className="d1 @md:text-center">Welcome to Sunlo</h1>
        <div className="w-app">
          <p className="my-4 mb-10 text-2xl @md:text-center">
            Let&apos;s get started
          </p>
          <SetUsernameStep value={tempUsernameToUse} set={setTempUsername} />
          <SetPrimaryLanguageStep
            value={tempLanguagePrimaryToUse}
            set={setTempLanguagePrimary}
          />
          <CreateFirstDeckStep value={tempDeckToAdd} set={setTempDeckToAdd} />

          {tempLanguagePrimaryToUse &&
          (tempDeckToAdd || profile.deck_stubs?.length > 0) &&
          tempUsernameToUse ? (
            <div className="my-6 flex flex-row-reverse items-center justify-around">
              <button
                onClick={mainForm.mutate}
                className="btn btn-accent md:btn-lg"
                disabled={mainForm.isSubmitting}
              >
                Confirm and get started!
              </button>
              <button onClick={reset} className="btn btn-primary">
                Reset page
              </button>
            </div>
          ) : null}
        </div>
        <ErrorList
          summary="Problem inserting profile or making deck"
          error={mainForm.error}
        />
      </main>
    </>
  )
}

const SetPrimaryLanguageStep = ({ value, set }) => {
  const [closed, setClosed] = useState(true)
  return closed && value?.length > 0 ? (
    <Completed>
      <p className="h4">
        Your primary language is <Highlight>{languages[value]}</Highlight>
      </p>
      <X set={() => setClosed()} />
    </Completed>
  ) : (
    <form
      className="card-white mb-16"
      onSubmit={e => {
        e.preventDefault()
        setClosed(true)
        set(e.target.language_primary.value)
      }}
    >
      <h2 className="h2">Set primary language</h2>
      <div className="flex flex-col">
        <label className="py-2 font-bold">The language you know best</label>
        <select
          value={value || ''}
          name="language_primary"
          onChange={e => {
            set(e.target.value)
            setClosed(true)
          }}
          className="mb-6 rounded border bg-base-100 p-3 text-base-content"
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
            className="s-link"
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
  const decks = data?.deck_stubs || []
  const [closed, setClosed] = useState(true)
  return closed && decks?.length ? (
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
    <form className="card-white mb-16">
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
        <label className="py-2 font-bold">The language you want to learn</label>
        <select
          value={value || ''}
          name="language_primary"
          onChange={e => {
            e.preventDefault()
            set(e.target.value)
            setClosed(true)
          }}
          className="mb-6 rounded border bg-base-100 p-3 text-base-content"
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
            className="s-link"
          >
            Skip this step
          </a>
        ) : null}
      </div>
    </form>
  )
}

const SetUsernameStep = ({ value, set }) => {
  const [closed, setClosed] = useState(true)
  return closed && value ? (
    <Completed>
      <p className="h4 block">
        Your username is <Highlight>{value}</Highlight>
      </p>
      <X set={() => setClosed(false)} />
    </Completed>
  ) : (
    <form
      className="card-white mb-16"
      onSubmit={e => {
        e.preventDefault()
        if (e.target.username.value) setClosed(true)
      }}
    >
      <h2 className="h2">Pick a username</h2>
      <div className="flex flex-col">
        <label className="py-2 font-bold">
          Username for your public profile
        </label>
        <input
          type="text"
          className="s-input"
          name="username"
          placeholder="Lernie McSanders"
          value={value || ''}
          onChange={e => {
            set(e.target.value)
          }}
        />
      </div>
      <button className="btn btn-ghost my-4" type="submit">
        Do the thing
      </button>
    </form>
  )
}

const X = ({ set, plus }) => (
  <button
    onClick={() => set()}
    className={`btn btn-ghost block flex-none rounded-full ${
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
  <div className="glass mb-8 flex flex-row justify-between gap-x-4 rounded-xl px-6 py-4 text-white">
    <div>{children[0]}</div>
    <div className="place-self-center">{children[1]}</div>
  </div>
)

const Highlight = ({ children }) => (
  <span className="inline bg-accent bg-opacity-60 px-1 font-bold">
    {children}
  </span>
)
