'use client'

import Link from 'next/link'
import languages from 'lib/languages'
import ErrorList from 'components/ErrorList'
import Loading from 'app/loading'

import { useDecks } from '../use-data'
import { useGlobalState } from 'lib/global-store'

function PageInner({ data, status, error }) {
  console.log(`pageInner`, data)
  return status === 'loading' ? (
    <Loading />
  ) : status === 'error' ? (
    <ErrorList error={error} />
  ) : !decks.length ? (
    <>it looks like you&apos;re not learning any languages right now</>
  ) : (
    decks.map(({ node: { lang } }) => {
      return (
        <li key={lang}>
          <Link href={`/deck/${lang}`} className="btn btn-quiet">
            <p>
              {languages[lang]} ({lang})
            </p>
          </Link>
        </li>
      )
    })
  )
}

export default function MyDecksPage() {
  console.log(`MyDecksPage start...`)
  const { session } = useGlobalState()
  const result = useDecks(session)
  console.log(`MyDecksPage result:`, result)
  return (
    <>
      <h1 className="h1">Decks</h1>
      <ul className="columns-3xs space-y-4">
        <PageInner {...result} />
      </ul>
    </>
  )
}
