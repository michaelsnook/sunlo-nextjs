'use client'

import Link from 'next/link'
import { useState } from 'react'
import Select from 'react-select'
import Loading from 'components/loading'
import ShowError from 'components/show-error'
import { useLanguageDetails } from 'app/data/hooks'
import BigPhrase from 'components/big-phrase'
import { useLang } from 'lib/hooks'

export default function Browse({ disable }) {
  const [activePhraseId, setActivePhraseId] = useState()
  const lang = useLang()
  const { data, error, isLoading } = useLanguageDetails(lang)
  if (isLoading) return <Loading />
  if (error) return <ShowError>{error.message}</ShowError>

  if (!data.phrases?.length) {
    return (
      <p className="rounded-lg bg-primary/10 p-6">
        There are no phrases for this language 💩{' '}
        <Link
          href={`/my-decks/${lang}/new-card`}
          className="s-link flex-none place-self-center text-primary"
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
          <a className="s-link text-primary" onClick={() => handleChange('')}>
            &times; Clear selection
          </a>
          <BigPhrase
            phrase_id={activePhraseId}
            user_deck_id={data?.deck.id}
            linkFactory={(lang, pid) => `/my-decks/${lang}/phrase/${pid}`}
            onClose={() => handleChange('')}
            onNavigate={handleChange}
          />
        </>
      )}
    </div>
  )
}
