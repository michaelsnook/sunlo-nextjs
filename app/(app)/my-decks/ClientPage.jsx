'use client'

import Link from 'next/link'
import { useAllDecks } from 'app/data/hooks'
import Loading from 'app/loading'
import languages from 'lib/languages'
import ErrorList from 'app/components/ErrorList'

function OneDeck({ deck }) {
  return (
    <Link
      href={`/my-decks/${deck.lang}`}
      className="card border max-w-lg w-100 shadow-lg p-6 my-4 hover:bg-primary/20"
    >
      <h2 className="h2">{languages[deck.lang]}</h2>
      <p>
        You&apos;re learning {languages[deck.lang]}! There are {deck.size} cards
        in your deck.
      </p>
    </Link>
  )
}

export default function ClientPage() {
  const { status, data: decks, error } = useAllDecks()
  if (status === 'loading') return <Loading />

  if (status === 'error') return <ErrorList error={error} />

  return (
    <>
      {decks.length ? (
        <>
          <p>
            You have {decks.length} active decks. Which one would you like to
            work on today?
          </p>
          {decks?.map(deck => (
            <OneDeck key={deck.lang} deck={deck} />
          ))}
        </>
      ) : (
        <p className="my-6">
          It looks like you&apos;re not learning any languages right now.{' '}
          <Link className="link" href="/my-decks/new">
            Let&apos;s get started!
          </Link>
        </p>
      )}
    </>
  )
}
