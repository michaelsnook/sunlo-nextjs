'use client'

import { useState } from 'react'
import Loading from 'components/loading'
import ShowError from 'components/show-error'
import { useDeck } from 'app/data/hooks'
import { Garlic } from 'components/garlic'
import Card from 'components/card'
import Browse from './browse'
import Link from 'next/link'
import { cn } from 'lib/utils'
import { useDeckData, useLanguageData } from 'lib/hooks'
import { uuid } from 'types/main'

const Empty = () => (
  <p className="my-4 text-base-content/70">🧄 No cards here 🥦 (yet)</p>
)
const BrandNew = () => {
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

      <Browse />
    </div>
  )
}
export default function ClientPage({ lang }) {
  const [tab, setTab] = useState('active')
  const { data: deckData, error } = useDeck(lang)
  const pids = useDeckData()?.pids || null
  const phrases = useLanguageData()?.phrases
  const cards = useDeckData()?.cards

  if (pids === null) return <Loading />
  if (error) return <ShowError>{error.message}</ShowError>

  if (!pids.length) return <BrandNew />

  // console.log(`deck data client page`, deckData)
  // at this point data is loaded, the deck is present, there are
  // one or more cards in it.

  return (
    <div>
      <div className="tabs tabs-bordered">
        <a
          className={cn('tab', tab === 'active' ? 'tab-active' : '')}
          onClick={() => setTab('active')}
        >
          Active cards
        </a>
        <a
          className={cn('tab', tab === 'learned' ? 'tab-active' : '')}
          onClick={() => setTab('learned')}
        >
          Learned phrases
        </a>
        <a
          className={cn('tab', tab === 'skipped' ? 'tab-active' : '')}
          onClick={() => setTab('skipped')}
        >
          Skipped
        </a>
        <a
          className={cn('tab', tab === 'browse' ? 'tab-active' : '')}
          onClick={() => setTab('browse')}
        >
          Browse phrases...
        </a>
      </div>
      <div>
        {tab === 'browse' ? (
          <Browse disable={pids} />
        ) : !deckData?.pids && !deckData?.pids[tab]?.length ? (
          <Empty />
        ) : (
          deckData.pids[tab].map((pid: uuid) => (
            <Link
              href={`/my-decks/${lang}/phrase/${pid}`}
              key={pid}
              className="my-2"
            >
              <Card status={cards[pid].status} phrase={phrases[pid]} />
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
