'use client'

import Link from 'next/link'
import { useState } from 'react'
import Select from 'react-select'
import Loading from 'app/loading'
import ErrorList from 'app/components/ErrorList'
import { useAllPhrasesInLanguage } from 'app/data/hooks'
import BigPhrase from 'app/components/BigPhrase'

export default function Browse({ lang, disable }) {
  const [activePhrase, setActivePhrase] = useState()

  const { data, error, status } = useAllPhrasesInLanguage(lang)
  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />
  if (!data?.length) {
    return (
      <p className="bg-primary/10 p-6 rounded-lg">
        There are no phrases for this language 💩{' '}
        <Link
          href={`/my-decks/${lang}/new-card`}
          className="flex-none link place-self-center text-primary"
        >
          you'll need to add some.
        </Link>
      </p>
    )
  }

  const options = data.map(edge => {
    return {
      value: edge.node.id,
      label: edge.node.text,
    }
  })
  const handleChange = ({ value }) => setActivePhrase(value)

  return (
    <div>
      <p className="my-4">Select a phrase to add to your deck</p>
      <Select
        options={options || []}
        isOptionDisabled={option => disable?.includes(option.value)}
        placeholder="Find a phrase"
        backspaceRemovesValue
        aria-label="Select a phrase to add to your deck"
        onChange={handleChange}
        className="my-4"
      />
      {!activePhrase ? null : (
        <>
          <a className="text-primary link" onClick={() => setActivePhrase('')}>
            &times; Clear selection
          </a>
          <BigPhrase
            phraseId={activePhrase}
            setActivePhrase={setActivePhrase}
          />
        </>
      )}
    </div>
  )
}
