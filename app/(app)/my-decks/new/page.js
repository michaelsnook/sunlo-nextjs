'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import languages from 'lib/languages'
import { useAllDecks } from 'app/data/hooks'
import ErrorList from 'components/ErrorList'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postNewDeck } from 'app/data/posters'
// import { createNewDeck } from 'app/data/mutations'

const options = Object.keys(languages).map(lang => {
  return { value: lang, label: languages[lang] }
})

function TinyError({ text }) {
  return <p className="my-4 text-red-700">{text}</p>
}

export default function Page() {
  const [value, setValue] = useState()
  const isDisabled = !(value?.length === 3)
  const [formError, setFormError] = useState()
  const router = useRouter()
  const queryClient = useQueryClient()

  const createNewDeck = useMutation({
    mutationFn: postNewDeck,
    onSuccess: data => {
      // console.log(`onSuccess data,`, data)
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      router.push(`/my-decks/${data.lang}`)
    },
  })

  const handleSubmit = event => {
    event.preventDefault()
    if (!value) {
      setFormError(`Please select a language to start learning...`)
      console.log(`detected aform error`)
      return
    }
    // console.log(`submit the form`, event, value)
    createNewDeck.mutate(value)
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
          {createNewDeck?.error ? (
            <ErrorList errors={[createNewDeck.error]} asCard />
          ) : status === 'error' ? (
            <ErrorList error={error} />
          ) : (
            <>
              <Select
                options={options}
                isOptionDisabled={option =>
                  data?.some(deck => {
                    return status === 'loading'
                      ? // while loading the list of decks, all options enabled
                        false
                      : // otherwise, disable languages we're already learning
                        deck.node.lang === option.value
                  })
                }
                placeholder="Select a language..."
                backspaceRemovesValue
                aria-label="Select a language to start a new deck"
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
