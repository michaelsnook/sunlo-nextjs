'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'
import languages, { options } from 'lib/languages'
import { useDeck } from 'app/data/hooks'
import ErrorList from 'components/ErrorList'
import Loading from 'app/loading'
import { postNewPhraseCardTranslations } from 'app/data/posters'

export default function AddCardPhraseForm({ lang }) {
  const { status, data: deck, error } = useDeck(lang)
  const [selectLang, setSelectLang] = useState()
  const queryClient = useQueryClient()

  const addCardPhrase = useMutation({
    mutationFn: postNewPhraseCardTranslations,
    onSuccess: data => {
      console.log(`postNewPhraseCardTranslations success`, data)
      queryClient.invalidateQueries({ queryKey: ['user_deck', lang] })
    },
    onError: error => {
      throw error
    },
  })

  const handleChangeSelect = ({ value }) => {
    setSelectLang(value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // console.log(event.target)

    if (!deck?.id) {
      throw 'wait error'
    }
    if (!selectLang?.length === 3) throw 'bad translation_lang'
    if (!event.target.text.value) throw 'no phrase text'
    if (!event.target.translation_text.value) throw 'no translation text'

    const submitData = {
      phrase: {
        text: event.target.text.value,
        lang,
      },
      phraseTranslations: [
        {
          text: event.target.translation_text.value,
          lang: selectLang,
        },
      ],
      userDeckId: deck.id,
    }
    addCardPhrase.mutate(submitData)
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="">
        <div className="form-control">
          <label>Phrase text</label>
          <textarea className="textarea border-gray-400" name="text" />
        </div>
        <p className="mt-4">Phrase language: {languages[lang]}</p>
      </div>
      <div className="my-6">
        <div className="form-control">
          <label>Translation text</label>
          <textarea
            className="textarea border-gray-400"
            name="translation_text"
          />
        </div>
        <div className="form-control mt-4">
          <label>Translation language</label>
          <Select
            name="translation_language"
            options={options}
            isOptionDisabled={option => option.value === lang}
            placeholder="Select a language..."
            onChange={handleChangeSelect}
            aria-label="Select a language for your translation"
          />
        </div>
      </div>
      <div className="flex justify-between">
        {addCardPhrase.isLoading ? (
          <Loading />
        ) : addCardPhrase.isError ? (
          <ErrorList error={addCardPhrase.error} />
        ) : addCardPhrase.isSuccess ? (
          <p className="text-lg">
            Success! added this new phrase to your deck!{' '}
            <Link
              href={`/my-decks/${lang}`}
              className="text-primary hover:underline"
            >
              Go back
            </Link>{' '}
            or add{' '}
            <a
              href="#"
              className="text-primary hover:underline"
              onClick={() => location.reload()}
            >
              another new card
            </a>
            .
          </p>
        ) : (
          <>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!status === 'success'}
            >
              Submit
            </button>
            <Link
              className="place-self-center btn btn-quiet"
              href={`/my-decks/${lang}`}
            >
              Cancel
            </Link>
          </>
        )}
      </div>
    </form>
  )
}
