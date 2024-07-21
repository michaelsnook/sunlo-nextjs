'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useProfile } from 'app/data/hooks'
import ErrorList from 'components/ErrorList'
import languages, { allLanguageOptions } from 'lib/languages'
import { postNewDeck } from './add-new-deck'

function TinyError({ text }) {
  return (
    <p className="my-4 text-error-content bg-error/20 rounded-sm p-2">{text}</p>
  )
}

export default function Form() {
  const [lang, setLang] = useState()
  const router = useRouter()
  const queryClient = useQueryClient()

  const createNewDeck = useMutation({
    mutationFn: async event => {
      event.preventDefault()
      return await postNewDeck(lang)
    },
    onSuccess: data => {
      // console.log(`onSuccess data,`, data)
      queryClient.invalidateQueries({ queryKey: ['user_profile'] })
      toast.success(`Created a new deck to learn ${languages[data.lang]}`)
      router.push(`/my-decks/${data.lang}`)
    },
  })

  const { data, error, status } = useProfile()
  const decks = data?.deck_stubs

  return (
    <div>
      {createNewDeck?.error ? (
        <ErrorList summary={`${createNewDeck.error}`} />
      ) : (
        status === 'error' && <ErrorList summary={`${error.message}`} />
      )}
      <form name="new-deck" onSubmit={createNewDeck.mutate}>
        <h2 className="h3">What language would you like to learn?</h2>
        <Select
          options={allLanguageOptions}
          isOptionDisabled={option =>
            decks?.some(deck => {
              return status === 'loading'
                ? // while loading the list of decks, all options enabled
                  false
                : // otherwise, disable languages we're already learning
                  deck.lang === option.value
            })
          }
          classNames={{
            control: () => 's-input',
            menuList: () =>
              'bg-base-100 text-base-content py-2 border rounded border-base-content/50 -mt-px',
            option: () => 'hover:bg-primary hover:text-white px-2',
          }}
          unstyled
          styles={{
            option: (styles, { isDisabled }) => {
              return isDisabled ? { opacity: 0.5 } : null
            },
          }}
          placeholder="Select a language..."
          backspaceRemovesValue
          aria-label="Select a language to start a new deck"
          onChange={event => setLang(event.value)}
        />
        <button type="submit" className="my-6 btn rounded btn-primary">
          Start learning
        </button>
      </form>
      {createNewDeck.error && (
        <TinyError text={`${createNewDeck.error.message}`} />
      )}
    </div>
  )
}
