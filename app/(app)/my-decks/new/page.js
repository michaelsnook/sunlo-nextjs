'use client'

import { useState } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import languages from 'lib/languages'
import { useAllDecks } from 'app/data/hooks'
import ErrorList from 'components/ErrorList'
import Loading from 'app/loading'

const options = Object.keys(languages).map(code => {
  return { value: code, label: languages[code] }
})

export default function Page() {
  const [value, setValue] = useState()
  const handleSubmit = event => {
    event.preventDefault()
    console.log(`submit the form`, event, value)
  }
  const { data, error, status } = useAllDecks()
  const liveOptions =
    status === 'loading'
      ? options
      : options.map(option => {
          return {
            ...option,
          }
        })
  return (
    <>
      <Link href="/my-decks" className="hover:underline">
        &larr; Back to decks
      </Link>
      <h1 className="h1">Start a new deck</h1>
      <div className="page-card">
        <form name="new-deck" onSubmit={handleSubmit}>
          {status === 'loading' ? (
            <Loading />
          ) : status === 'error' ? (
            <ErrorList error={error} />
          ) : (
            <>
              <Select
                options={liveOptions}
                isOptionDisabled={option =>
                  data.some(deck => {
                    return deck.node.lang === option.value
                  })
                }
                autoFocus
                closeMenuOnSelect
                escapeClearsValue
                onChange={e => setValue(e.value)}
              />
              <button type="submit" className="my-6 btn rounded btn-primary">
                Start learning {languages[value]}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  )
}
