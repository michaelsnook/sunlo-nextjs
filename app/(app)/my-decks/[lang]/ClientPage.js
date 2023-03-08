'use client'

import Loading from 'app/loading'
import ErrorList from 'components/ErrorList'
import { useDeck } from 'app/data/hooks'
import { useState } from 'react'
import Card from 'app/components/Card'

const Empty = () => <p className="text-gray-600">No cards here</p>

export default function ClientPage({ lang }) {
  const [tab, setTab] = useState('active')
  const { status, data, error } = useDeck(lang)
  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />
  const edges = data?.deckMembershipCollection?.edges ?? []
  if (!edges?.length) return <>no cards in deck 💩</>
  const cards = {
    active: edges.filter(e => e.node.status === 'active'),
    learned: edges.filter(e => e.node.status === 'learned'),
    skipped: edges.filter(e => e.node.status === 'skipped'),
  }
  return (
    <div>
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
      </div>
      <div>
        {cards[tab].length ? (
          cards[tab].map(c => (
            <p key={c.node.id} className="my-2">
              <Card {...c.node} />
            </p>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}
