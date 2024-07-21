'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'
import languages, {
  allLanguageOptions,
  makeLanguageOptions,
} from 'lib/languages'
import { useDeck } from 'app/data/hooks'
import ErrorList from 'components/error-list'
import Loading from 'components/loading'
import { postNewPhraseCardTranslations } from './add-card'
import { useProfile } from 'app/data/hooks'
import { useRouter } from 'next/navigation'

export const SelectLanguageYouKnow = ({ onChange, disabledLang }) => {
  const { data, status } = useProfile()
  if (status === 'loading') return <Loading />

  const { languagesSpoken } = data
  const selectOptions = !languagesSpoken?.length
    ? allLanguageOptions
    : [
        {
          label: 'Your langauges',
          options: makeLanguageOptions(languagesSpoken),
        },
        {
          label: 'Other languages',
          options: allLanguageOptions.filter(
            option => languagesSpoken.indexOf(option.value) === -1
          ),
        },
      ]

  return (
    <Select
      name="translationLang"
      options={selectOptions}
      classNames={{
        control: () => 's-input',
        menuList: () =>
          'bg-base-100 text-base-content py-2 rounded ring-1 -mt-px',
        option: () => 'hover:bg-primary hover:text-white px-2',
      }}
      unstyled
      styles={{
        option: (styles, { isDisabled }) => {
          return isDisabled ? { opacity: 0.5 } : null
        },
      }}
      isOptionDisabled={option => option.value === disabledLang}
      placeholder="Select a language..."
      onChange={onChange}
      aria-label="Select a language for your translation"
    />
  )
}

export default function AddCardPhraseForm({ lang, cancel }) {
  const { status, data: deck } = useDeck(lang)
  const [selectLang, setSelectLang] = useState()
  const queryClient = useQueryClient()
  const router = useRouter()
  const onCancel = cancel ? cancel : () => router.back()

  const addCardPhrase = useMutation({
    mutationFn: postNewPhraseCardTranslations,
    onSuccess: () => {
      // console.log(`postNewPhraseCardTranslations success`, data)
      // toast.success(t => <Success />)
      queryClient.invalidateQueries({ queryKey: ['user_deck', lang] })
      queryClient.invalidateQueries({ queryKey: ['user_profile'] })
      // deck stubs don't need to be updated here
    },
    onError: error => {
      throw error
    },
  })

  const handleChangeSelect = ({ value }) => {
    setSelectLang(value)
    // console.log(`handleChange value`, value)
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

    addCardPhrase.mutate({
      phrase: {
        text: event.target.text.value,
        lang,
      },
      translations: [
        {
          text: event.target.translation_text.value,
          lang: selectLang,
        },
      ],
      user_deck_id: deck.id,
    })
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="h3">
        Enter the {languages[lang]} phrase and a translation
      </h2>

      <div className="">
        <div className="form-control">
          <label>{languages[lang]} phrase to learn</label>
          <textarea autoFocus className="s-input" name="text" />
        </div>
        <p className="mt-4">Phrase language: {languages[lang]}</p>
      </div>
      <div className="my-6">
        <div className="form-control">
          <label>Translation into a language you know</label>
          <textarea className="s-input" name="translation_text" />
        </div>
        <div className="form-control mt-4">
          <label>Translation language</label>
          <SelectLanguageYouKnow
            disabledLang={lang}
            onChange={handleChangeSelect}
          />
        </div>
      </div>
      <div className="flex justify-between">
        {addCardPhrase.isLoading ? (
          <Loading />
        ) : addCardPhrase.isError ? (
          <ErrorList error={addCardPhrase.error} />
        ) : addCardPhrase.isSuccess ? (
          <div className="bg-success/50 border-success text-black rounded-lg border py-4 px-6 mb-4">
            <p className="">
              Success! added this new phrase to your deck.{' '}
              <a className="s-link text-primary" onClick={onCancel}>
                Go back
              </a>{' '}
              or you can{' '}
              <a
                className="s-link text-primary"
                onClick={() =>
                  (window.location.href = `/my-decks/${lang}/new-card`)
                }
              >
                add another card
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!status === 'success'}
            >
              Submit
            </button>
            <a
              className="place-self-center btn btn-ghost"
              onClick={() => onCancel()}
            >
              Cancel
            </a>
          </>
        )}
      </div>
    </form>
  )
}
