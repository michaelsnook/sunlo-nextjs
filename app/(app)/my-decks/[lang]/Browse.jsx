'use client'

import Link from 'next/link'
import { useState } from 'react'
import Select from 'react-select'
import Loading from 'app/loading'
import ErrorList from 'app/components/ErrorList'
import { useLanguageDetails } from 'app/data/hooks'
import BigPhrase from 'app/components/BigPhrase'

export default function Browse({ lang, disable }) {
  const [activePhraseId, setActivePhraseId] = useState()

  const { data, error, status } = useLanguageDetails(lang)

  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />
  // console.log(`Browse useLanguageDetails, `, data, error)
  if (!data?.phrases?.length) {
    return (
      <p className="bg-primary/10 p-6 rounded-lg">
        There are no phrases for this language 💩{' '}
        <Link
          href={`/my-decks/${lang}/new-card`}
          className="flex-none s-link place-self-center text-primary"
        >
          you&apos;ll need to add some.
        </Link>
      </p>
    )
  }

  const options = data.phrases.map(phrase => {
    return {
      value: phrase.id,
      label: phrase.text,
    }
  })
  const handleChange = ({ value }) => setActivePhraseId(value)

  return (
    <div>
      <p className="my-4">Select a phrase to add to your deck</p>
      <Select
        options={options || []}
        isOptionDisabled={option => disable?.includes(option.value)}
        placeholder="Find a phrase"
        backspaceRemovesValue
        classNames={{
          control: () => 's-input',
          menuList: () =>
            'bg-base-100 text-base-content py-2 border rounded border-base-content/50 -mt-px',
          option: () =>
            'hover:bg-primary hover:text-white px-2 *:disabled:opacity-50',
        }}
        unstyled
        styles={{
          option: (styles, { isDisabled }) => {
            return isDisabled ? { opacity: 0.5 } : null
          },
        }}
        aria-label="Select a phrase to add to your deck"
        onChange={handleChange}
        className="my-4"
      />
      {!activePhraseId ? null : (
        <>
          <a className="text-primary s-link" onClick={() => handleChange('')}>
            &times; Clear selection
          </a>
          <BigPhrase
            phrase_id={activePhraseId}
            user_deck_id={data?.deck.id}
            // initialData={activePhraseData}
            onClose={() => handleChange('')}
            onNavigate={handleChange}
          />
        </>
      )}
    </div>
  )
}
