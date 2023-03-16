'use client'

import Loading from 'app/loading'
import ErrorList from 'components/ErrorList'
import { useDeck } from 'app/data/hooks'
import { useState } from 'react'
import Card from 'app/components/Card'
import Browse from './Browse'

const Empty = () => <p className="text-gray-600">No cards here</p>

export default function ClientPage({ lang }) {
  const [tab, setTab] = useState('active')
  const { status, data, error } = useDeck(lang)

  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />
  const edges = data?.userCardCollection?.edges ?? []

  if (!edges?.length)
    return (
      <div>
        no cards in deck 💩 go ahead and add some! <Browse lang={lang} />
      </div>
    )
  // a simple array ['a12...', '45f...', ... ]
  const disabledIds = edges?.map(edge => edge.node.phrase.id) || []
  // console.log(`disabled IDs`, disabledIds)
  // 3 arrays of edges
  const cards = {
    active: edges.filter(e => e.node.status === 'active') || [],
    learned: edges.filter(e => e.node.status === 'learned') || [],
    skipped: edges.filter(e => e.node.status === 'skipped') || [],
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
        <a
          className={`tab tab-bordered ${tab === 'browse' ? 'tab-active' : ''}`}
          onClick={() => setTab('browse')}
        >
          Browse for new phrases...
        </a>
      </div>
      <div>
        {tab === 'browse' ? (
          <Browse lang={lang} disable={disabledIds} />
        ) : cards[tab].length ? (
          cards[tab].map(c => (
            <div key={c.node.id} className="my-2">
              <Card {...c.node} />
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}
