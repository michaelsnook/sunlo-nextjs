'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'
import languages, {
  allLanguageOptions,
  makeLanguageOptions,
} from 'lib/languages'
import { useDeck } from 'app/data/hooks'
import ErrorList from 'app/components/ErrorList'
import Loading from 'app/loading'
import { postNewPhraseCardTranslations } from 'app/data/posters'
import { useProfile } from 'app/data/hooks'
import { useRouter } from 'next/navigation'

const SelectLanguageYouKnow = ({ onChange, disabledLang }) => {
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
      isOptionDisabled={option => option.value === disabledLang}
      placeholder="Select a language..."
      onChange={onChange}
      aria-label="Select a language for your translation"
    />
  )
}

export default function AddCardPhraseForm({
  lang,
  offerRefresh = false,
  cancel,
}) {
  const { status, data: deck } = useDeck(lang)
  const [selectLang, setSelectLang] = useState()
  const queryClient = useQueryClient()
  const router = useRouter()
  const onCancel = cancel ? cancel : () => router.back()

  const addCardPhrase = useMutation({
    mutationFn: postNewPhraseCardTranslations,
    onSuccess: data => {
      // console.log(`postNewPhraseCardTranslations success`, data)
      queryClient.invalidateQueries({ queryKey: ['user_deck', lang] })
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
      phraseTranslations: [
        {
          text: event.target.translation_text.value,
          lang: selectLang,
        },
      ],
      userDeckId: deck.id,
    })
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="">
        <div className="form-control">
          <label>{languages[lang]} phrase to learn</label>
          <textarea
            autoFocus
            className="textarea border-gray-400"
            name="text"
          />
        </div>
        <p className="mt-4">Phrase language: {languages[lang]}</p>
      </div>
      <div className="my-6">
        <div className="form-control">
          <label>Translation into a language you know</label>
          <textarea
            className="textarea border-gray-400"
            name="translation_text"
          />
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
            <p className="text-lg">
              Success! added this new phrase to your deck!{' '}
              <a className="link text-primary" onClick={() => onCancel()}>
                Go back
              </a>{' '}
              {offerRefresh ? (
                <>
                  or add{' '}
                  <a
                    className="link text-primary"
                    onClick={() => location.reload()}
                  >
                    another new card
                  </a>
                  .
                </>
              ) : null}
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
              className="place-self-center btn btn-quiet"
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
