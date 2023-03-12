'use client'

import Loading from 'app/loading'
import ErrorList from 'components/ErrorList'
import { useAllPhrasesInLanguage } from 'app/data/hooks'
import Select from 'react-select'
import { useState } from 'react'
import BigPhrase from 'app/components/BigPhrase'

export default function Browse({ lang, disable }) {
  const [activePhrase, setActivePhrase] = useState(-1)

  const { data, error, status } = useAllPhrasesInLanguage(lang)
  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />
  if (!data?.length) {
    return (
      <>there are no phrases for this language 💩 you'll need to add some.</>
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
        isOptionDisabled={option => disable.includes(option.value)}
        placeholder="Find a phrase"
        backspaceRemovesValue
        aria-label="Select a phrase to add to your deck"
        onChange={handleChange}
        className="my-4"
      />
      {activePhrase === -1 ? null : (
        <>
          <a
            href="#"
            className="text-primary hover:underline"
            onClick={() => setActivePhrase(-1)}
          >
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
