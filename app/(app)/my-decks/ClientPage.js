'use client'

import Link from 'next/link'
import { useAllDecks } from 'app/data/hooks'
import Loading from 'app/loading'
import languages from 'lib/languages'

function OneDeck({ node }) {
  return (
    <Link
      href={`/my-decks/${node.lang}`}
      className="card w-100 shadow-lg p-6 my-4 hover:bg-purple-200"
    >
      <h2 className="h2">{languages[node.lang]}</h2>
      <p>
        You&apos;re learning {languages[node.lang]}! There are{' '}
        {node.deckMembershipCollection.edges.length} cards in your deck.
      </p>
    </Link>
  )
}

export default function ClientPage() {
  const { status, data, error } = useAllDecks()
  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />

  return (
    <>
      {data.length ? (
        <>
          <p>
            You have {data.length} active decks. Which one would you like to
            work on today?
          </p>
          {data?.map(edge => (
            <OneDeck key={edge.node.lang} node={edge.node} />
          ))}
        </>
      ) : (
        <p className="my-6">
          It looks like you're not learning any languages right now.{' '}
          <Link className="hover:underline" href="/my-decks/new">
            Let's get started!
          </Link>
        </p>
      )}
    </>
  )
}
