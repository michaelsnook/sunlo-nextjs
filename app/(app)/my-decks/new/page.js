'use client'

import { useState } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import languages from 'lib/languages'
import { useAllDecks } from 'app/data/hooks'
import ErrorList from 'components/ErrorList'

const options = Object.keys(languages).map(code => {
  return { value: code, label: languages[code] }
})

function TinyError({ text }) {
  return <p className="my-4 text-red-700">{text}</p>
}

export default function Page() {
  const [value, setValue] = useState()
  const isDisabled = !(value?.length === 3)
  const [formError, setFormError] = useState()

  const handleSubmit = event => {
    event.preventDefault()
    if (!value) {
      setFormError(`Please select a language to start learning...`)
      console.log(`detected aform error`)
      return
    }
    console.log(`submit the form`, event, value)
  }
  const handleChange = e => {
    setFormError('')
    setValue(e.value)
  }

  const { data, error, status } = useAllDecks()

  return (
    <>
      <Link href="/my-decks" className="hover:underline">
        &larr; Back to decks
      </Link>
      <h1 className="h1">Start a new deck</h1>
      <div className="page-card">
        <form name="new-deck" onSubmit={handleSubmit}>
          {status === 'error' ? (
            <ErrorList error={error} />
          ) : (
            <>
              <Select
                options={options}
                isOptionDisabled={option =>
                  data.some(deck => {
                    return status === 'loading'
                      ? // while loading the list of decks, all options enabled
                        false
                      : // otherwise, disable languages we're already learning
                        deck.node.lang === option.value
                  })
                }
                autoFocus
                placeholder="Select a language..."
                backspaceRemovesValue
                area-label="Select a language to start a new deck"
                onChange={handleChange}
              />
              {formError ? <TinyError text={formError} /> : null}
              <button
                type="submit"
                className="my-6 btn rounded btn-primary"
                disabled={isDisabled}
                aria-disabled={isDisabled}
              >
                Start learning {languages[value]}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  )
}
