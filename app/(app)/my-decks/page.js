'use client'
import Link from 'next/link'
import { useAllDecks } from 'app/data/hooks'
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

export default function Page() {
  const { status, data, error } = useAllDecks()
  console.log(`rendering decks`, data)
  if (status === 'loading') return <>loading...</>
  if (status === 'error') return <ErrorList error={error} />
  const edges = data.userDeckCollection.edges.sort((a, b) => {
    return (
      b.node.deckMembershipCollection.edges.length -
      a.node.deckMembershipCollection.edges.length
    )
  })

  return (
    <>
      <h1 className="h1">my decks</h1>
      <div className="page-card">
        {edges.map(edge => (
          <OneDeck node={edge.node} />
        ))}
      </div>
    </>
  )
}
