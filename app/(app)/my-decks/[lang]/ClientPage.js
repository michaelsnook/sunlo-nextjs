'use client'

import { useState } from 'react'
import Loading from 'app/loading'
import ErrorList from 'app/components/ErrorList'
import { useDeck, useLanguageDetails } from 'app/data/hooks'
import Garlic from 'app/components/Garlic'
import BigPhrase from 'app/components/BigPhrase'
import MyModal from 'app/components/Modal'
import Card from 'app/components/Card'
import Browse from './Browse'

const Empty = () => (
  <p className="text-gray-600 my-4">🧄 No cards here 🥦 (yet)</p>
)
const BrandNew = ({ lang }) => {
  return (
    <div>
      <div className="flex flex-row">
        <Garlic className="mx-4" />
        <h2 className="h2">It looks like this is a brand new deck!</h2>
      </div>

      <p className="my-4">
        You can get started by browsing the phrases we already have in the
        library...
      </p>

      <Browse lang={lang} />
    </div>
  )
}
export default function ClientPage({ lang }) {
  const [tab, setTab] = useState('active')
  const [phraseModalId, setPhraseModalId] = useState()
  const { status, data: deck, error } = useDeck(lang)
  const {
    status: languageStatus,
    data: languageData,
    error: languageError,
  } = useLanguageDetails(lang)

  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />

  if (!deck?.cards) return <BrandNew lang={lang} />

  // console.log(`deck data client page`, deck)
  // at this point data is loaded, the deck is present, there are
  // one or more cards in it.

  return (
    <div>
      <MyModal
        onRequestClose={() => setPhraseModalId('')}
        isOpen={!!phraseModalId}
      >
        <BigPhrase
          phrase_id={phraseModalId}
          deck_id={deck.id}
          onClose={() => setPhraseModalId('')}
          onNavigate={setPhraseModalId}
          noBox={true}
        />
      </MyModal>

      <div className="tabs">
        <a
          className={`tab tab-bordered ${tab === 'active' ? 'tab-active' : ''}`}
          onClick={() => setTab('active')}
        >
          Active cards
        </a>
        <a
          className={`tab tab-bordered ${
            tab === 'learned' ? 'tab-active' : ''
          }`}
          onClick={() => setTab('learned')}
        >
          Learned phrases
        </a>
        <a
          className={`tab tab-bordered ${
            tab === 'skipped' ? 'tab-active' : ''
          }`}
          onClick={() => setTab('skipped')}
        >
          Skipped
        </a>
        <a
          className={`tab tab-bordered ${tab === 'browse' ? 'tab-active' : ''}`}
          onClick={() => setTab('browse')}
        >
          <>Browse&nbsp;</>
          <span className="hidden md:block">for new&nbsp;</span>phrases...
        </a>
      </div>
      <div>
        {tab === 'browse' ? (
          <Browse lang={lang} disable={deck.all_phrase_ids} />
        ) : !deck?.cards[tab]?.length ? (
          <Empty />
        ) : (
          deck.cards[tab].map(c => (
            <div
              onClick={() => {
                setPhraseModalId(c.phrase_id)
                // console.log(c)
              }}
              key={c.id}
              className="my-2"
            >
              <Card {...c} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
