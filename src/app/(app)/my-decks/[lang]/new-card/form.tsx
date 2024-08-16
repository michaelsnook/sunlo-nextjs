'use client'

import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'
import languages, {
  allLanguageOptions,
  makeLanguageOptions,
} from 'lib/languages'
import ShowError from 'components/show-error'
import Loading from 'components/loading'
import { postNewPhraseCardTranslations } from './add-card'
import { useProfile } from 'app/data/hooks'
import { useRouter } from 'next/navigation'
import {
  PhraseCardInsert,
  TranslationInsert,
  SelectOption,
  uuid,
} from 'types/main'
import { useDeckQuery } from 'lib/preload-deck'
import toast from 'react-hot-toast'

export const SelectLanguageYouKnow = ({ onChange, disabledLang }) => {
  const { data, isPending } = useProfile()
  if (isPending) return <Loading />
  const languages_spoken = data?.languages_spoken || []
  const selectOptions =
    !languages_spoken.length ? allLanguageOptions : (
      [
        {
          label: 'Your langauges',
          options: makeLanguageOptions(languages_spoken),
        },
        {
          label: 'Other languages',
          options: allLanguageOptions.filter(
            option => languages_spoken.indexOf(option.value) === -1
          ),
        },
      ]
    )
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
        option: (_styles, { isDisabled }) => {
          return isDisabled ? { opacity: 0.5 } : null
        },
      }}
      isOptionDisabled={(option: SelectOption) => option.value === disabledLang}
      placeholder="Select a language..."
      onChange={onChange}
      aria-label="Select a language for your translation"
    />
  )
}

export default function AddCardPhraseForm({ defaultLang, cancel = null }) {
  const user_deck_id = useDeckQuery(defaultLang)?.data?.meta.id
  const isPending = useDeckQuery(defaultLang)?.isPending
  const queryClient = useQueryClient()
  const languagePrimary: string = useProfile()?.data?.language_primary || ''

  // need a stable reference so the phrase_id doesn't change between renders
  const pid = useRef('')
  if (pid.current === '') pid.current = crypto.randomUUID().toString()

  const [phraseText, setPhraseText] = useState('')
  const blankTranslation: TranslationInsert = {
    lang: languagePrimary,
    text: '',
    phrase_id: pid.current,
  }
  const [translations, setTranslations] = useState<
    Array<{
      lang: string
      text: string
      phrase_id: uuid
    }>
  >([blankTranslation])
  // we aren't doing relations yet @@TODO
  // const [relations, setRelations] = useState([''])

  const router = useRouter()
  const onCancel = cancel ? cancel : () => router.back()

  const phraseCardInsert: PhraseCardInsert = {
    phrase: {
      id: pid.current,
      text: phraseText,
      lang: defaultLang,
    },
    user_deck_id,
    translations,
  }

  // console.log(`here is the phraseCartInsert`, phraseCardInsert)

  // we aren't giving you languge dropdown yet.
  // const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setLang(event.target.value)
  // }
  const lang = defaultLang //[lang, setLang] = useState(defaultLang)

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`handling text change`, phraseText)
    setPhraseText(event.target.value)
  }
  // for now index is always 0. for now.
  const handleTranslationLanguageChange = (
    index: number,
    option: SelectOption
  ) => {
    if (!(index > -1) || index >= translations.length) return
    const updatedTranslations = [...translations]
    updatedTranslations[index].lang = option.value
    setTranslations(updatedTranslations)
  }
  const handleTranslationTextChange = (
    index: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!(index > -1) || index >= translations.length) return
    const updatedTranslations = [...translations]
    updatedTranslations[index].text = event.target.value
    setTranslations(updatedTranslations)
  }

  const addCardPhrase = useMutation({
    mutationFn: postNewPhraseCardTranslations,
    onSuccess: () => {
      // console.log(`postNewPhraseCardTranslations success`, data)
      toast.success(
        'Added a new phrase to the public library, and a new card to your deck.'
      )
      queryClient.invalidateQueries()
    },
    onError: error => {
      throw error
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(`Insert a new phrase and add card to deck`, phraseCardInsert)
    addCardPhrase.mutate(phraseCardInsert)
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="h3">
        Enter the {languages[lang]} phrase and a translation
      </h2>

      <div className="">
        <div className="form-control">
          <label>{languages[lang]} phrase to learn</label>
          <textarea
            autoFocus
            onChange={handleTextChange}
            className="s-input"
            name="text"
          />
        </div>
        <p className="mt-4">Phrase language: {languages[lang]}</p>
      </div>
      <div className="my-6">
        <div className="form-control">
          <label>Translation into a language you know</label>
          <textarea
            onChange={event => handleTranslationTextChange(0, event)}
            className="s-input"
            name="translation_text"
          />
        </div>
        <div className="form-control mt-4">
          <label>Translation language</label>
          <SelectLanguageYouKnow
            disabledLang={lang}
            onChange={(option: SelectOption) => {
              handleTranslationLanguageChange(0, option)
            }}
          />
        </div>
      </div>
      <div className="flex justify-between">
        {addCardPhrase.isPending ?
          <Loading />
        : addCardPhrase.error ?
          <ShowError show={!!addCardPhrase.error}>
            {addCardPhrase.error?.message}
          </ShowError>
        : addCardPhrase.isSuccess ?
          <div className="mb-4 rounded-lg border border-success bg-success/50 px-6 py-4 text-black">
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
        : <>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              Submit
            </button>
            <a
              className="btn btn-ghost place-self-center"
              onClick={() => onCancel()}
            >
              Cancel
            </a>
          </>
        }
      </div>
    </form>
  )
}
