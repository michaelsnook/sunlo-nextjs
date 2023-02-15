'use client'

import Link from 'next/link'
import languages from 'lib/languages'
import { useMyDecks } from 'lib/use-data'
import { useGlobalState } from 'lib/global-store'

export default async function MyDecksPage() {
  const { session } = useGlobalState()
  const deckCollection = useMyDecks(session ?? null)
  return (
    <div className="page-card">
      <h1 className="h1">Decks</h1>
      <ul className="columns-3xs space-y-4">
        {deckCollection === null ? (
          <>loading...</>
        ) : (
          Object.keys(deckCollection.edges).map(({ node: { lang } }) => (
            <li key={lang}>
              <Link href={`/decks/${lang}`} className="btn btn-quiet">
                <p>
                  {languages[lang]} ({lang})
                </p>
                <p>xx cards, yy users learning</p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
