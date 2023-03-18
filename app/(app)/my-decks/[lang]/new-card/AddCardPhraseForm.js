'use client'

import Link from 'next/link'
import languages, { options } from 'lib/languages'
import Select from 'react-select'
import { useDeck } from 'app/data/hooks'

export default function AddCardPhraseForm({ lang }) {
  const { status, data, error } = useDeck(lang)

  console.log(data)
  const handleSubmit = event => {
    console.log(event)
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
            aria-label="Select a language for your translation"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link
          className="place-self-center btn btn-quiet"
          href={`/my-decks/${lang}`}
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
