'use client'

import { useState } from 'react'
import Loading from 'app/loading'
import ErrorList from 'app/components/ErrorList'
import { useDeck } from 'app/data/hooks'
import { Garlic } from 'app/components/Garlic'
import Card from 'app/components/Card'
import Browse from './Browse'
import Link from 'next/link'

const Empty = () => (
  <p className="text-base-content/70 my-4">🧄 No cards here 🥦 (yet)</p>
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
  const { status, data: deckData, error } = useDeck(lang)

  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />

  if (!deckData?.cards) return <BrandNew lang={lang} />

  // console.log(`deck data client page`, deckData)
  // at this point data is loaded, the deck is present, there are
  // one or more cards in it.

  return (
    <div>
      <div className="tabs tabs-bordered">
        <a
          className={`tab ${tab === 'active' ? 'tab-active' : ''}`}
          onClick={() => setTab('active')}
        >
          Active cards
        </a>
        <a
          className={`tab ${tab === 'learned' ? 'tab-active' : ''}`}
          onClick={() => setTab('learned')}
        >
          Learned phrases
        </a>
        <a
          className={`tab ${tab === 'skipped' ? 'tab-active' : ''}`}
          onClick={() => setTab('skipped')}
        >
          Skipped
        </a>
        <a
          className={`tab ${tab === 'browse' ? 'tab-active' : ''}`}
          onClick={() => setTab('browse')}
        >
          Browse phrases...
        </a>
      </div>
      <div>
        {tab === 'browse' ? (
          <Browse lang={lang} disable={deckData.all_phrase_ids} />
        ) : !deckData?.cards[tab]?.length ? (
          <Empty />
        ) : (
          deckData.cards[tab].map(c => (
            <Link
              href={`/my-decks/${lang}/phrase/${c.phrase_id}`}
              key={c.id}
              className="my-2"
            >
              <Card {...c} />
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
