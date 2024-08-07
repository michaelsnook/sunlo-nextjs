'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useProfile } from 'app/data/hooks'
import ShowError from 'components/show-error'
import languages, { allLanguageOptions } from 'lib/languages'
import { postNewDeck } from './add-new-deck'

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

  const { data, error, isLoading } = useProfile()
  const decks = data?.deck_stubs

  return (
    <div>
      <ShowError>{createNewDeck.error?.message}</ShowError>
      <ShowError>{error?.message}</ShowError>
      <form name="new-deck" onSubmit={createNewDeck.mutate}>
        <h2 className="h3">What language would you like to learn?</h2>
        <Select
          options={allLanguageOptions}
          isOptionDisabled={(option: { value: string; label: string }) =>
            decks?.some(deck => {
              return isLoading
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
          onChange={option => setLang(option.value)}
        />
        <button type="submit" className="btn btn-primary my-6 rounded">
          Start learning
        </button>
      </form>
      <ShowError>{createNewDeck.error?.message}</ShowError>
    </div>
  )
}
