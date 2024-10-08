'use client'

import Link from 'next/link'
import { useProfile } from 'app/data/hooks'
import Loading from 'components/loading'
import languages from 'lib/languages'
import ShowError from 'components/show-error'
import { DecksMap } from 'types/main'

function OneDeck({ deck }) {
  return (
    <Link
      href={`/my-decks/${deck.lang}`}
      className="w-100 card my-4 p-6 shadow-lg hover:bg-primary/20"
    >
      <h2 className="h2">{languages[deck.lang]}</h2>
      <p>
        You&apos;re learning {languages[deck.lang]}! There are{' '}
        {deck.cards_active} cards in your deck.
      </p>
    </Link>
  )
}

export default function ClientPage() {
  const { isPending, data, error } = useProfile()
  if (isPending) return <Loading />
  if (error) return <ShowError>{error.message}</ShowError>

  const decks: DecksMap = data.decks
  const langs = data.deckLanguages
  return (
    <>
      {langs.length ?
        <>
          <p>
            You have {langs?.length} active decks. Which one would you like to
            work on today?
          </p>
          {langs?.map(lang => <OneDeck key={lang} deck={decks[lang]} />)}
        </>
      : <p className="my-6">
          It looks like you&apos;re not learning any languages right now.{' '}
          <Link className="s-link" href="/my-decks/new">
            Let&apos;s get started!
          </Link>
        </p>
      }
    </>
  )
}
