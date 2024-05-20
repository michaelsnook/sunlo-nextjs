'use client'

import ErrorList from 'app/components/ErrorList'
import { notFound } from 'next/navigation'
import { useDeck } from 'app/data/hooks'
import Loading from 'app/loading'
import languages from 'lib/languages'
import Link from 'next/link'

export default function Page({ params: { lang } }) {
  const { data, error, status } = useDeck(lang)
  console.log('the data came back', data)
  // the long name
  const language = languages[lang]

  if (typeof language !== 'string') notFound()
  console.log('this is the language variable', language)
  if (status === 'loading') return <Loading />
  if (error) return <ErrorList error={error} />
  return (
    <>
      <h1 className="text-2xl mt-6 mb-4">{language}</h1>
      {data === null ? (
        <p>
          Are you sure you&apos;re learning this language? To create a deck and{' '}
          <Link className="underline" href="/my-decks/new">
            start learning {language}, click here
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link
            href={`/review/${lang}`}
            className="alert glass py-10 text-center"
          >
            Start a review session
          </Link>
          <Link
            href={`/my-decks/${lang}`}
            className="alert glass py-10 text-center"
          >
            Browse/manage on your deck
          </Link>
        </div>
      )}
    </>
  )
}
