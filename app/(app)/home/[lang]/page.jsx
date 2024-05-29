'use client'

import ErrorList from 'app/components/ErrorList'
import { notFound } from 'next/navigation'
import { useDeck } from 'app/data/hooks'
import { useRecentReviews } from 'app/data/reviews'
import Loading from 'app/loading'
import languages from 'lib/languages'
import Link from 'next/link'

const RecentReviewsSummary = ({ lang }) => {
  const { data, error, status } = useRecentReviews(lang)
  if (status === 'loading') return <Loading />
  if (error) return <ErrorList error={error} />

  const countReviews = data?.length
  const countPositive = data?.filter(r => r.score > 0).length

  return (
    <div className="text-base-content bg-base-200 card-body">
      <div className="card-title">Review flash cards</div>
      {countReviews > 5 &&
        `You've been studying ${countReviews > 40 && 'a lot'}!`}{' '}
      I see {countReviews} cards reviewed in the last week
      {countPositive > 0 && ` and you remembered ${countPositive} of them`}.
      Keep at it!
    </div>
  )
}

const CardsSummary = ({ cards }) => {
  const cardsInDeck = cards.active.length + cards.learned.length
  const cardsActive = cards.active.length
  const cardsLearned = cards.learned.length
  const beHappy = cardsLearned > 5
  return (
    <div className="text-base-content bg-base-200 card-body">
      <div className="card-title">Manage your deck</div>
      You have:
      <ul className="ml-2 block">
        <li>🎴 {cardsInDeck} cards in your deck</li>
        <li>🤓 studying {cardsActive} currently</li>
        <li>
          🎊 and you&apos;ve learned {cardsLearned + ' '}
          of them{beHappy ? '!' : '.'}
        </li>
      </ul>
    </div>
  )
}

export default function Page({ params: { lang } }) {
  const { data, error, status } = useDeck(lang)
  if (status === 'loading') return <Loading />
  if (error) return <ErrorList error={error} />

  // the long name
  const language = languages[lang]
  if (typeof language !== 'string') notFound()

  return (
    <>
      <h1 className="text-4xl mt-6 mb-4">Learn {language}</h1>
      {data === null ? (
        <p>
          Are you sure you&apos;re learning this language? To create a deck and{' '}
          <Link className="underline" href="/my-decks/new">
            start learning {language}, click here
          </Link>
          .
        </p>
      ) : (
        <div>
          <div className="md:w-1/2 p-4 grid gap-4">
            <div className="card w-96 glass">
              <figure>
                <RecentReviewsSummary lang={lang} />
              </figure>
              <div className="card-body">
                <Link href={`/review/${lang}`} className="mx-auto btn">
                  Start a review session
                </Link>
              </div>
            </div>
          </div>
          <div className="w-100 md:w-1/2 p-4 grid gap-4">
            <div className="card w-96 glass">
              <figure>
                <CardsSummary cards={data?.cards} />
              </figure>
              <div className="card-body">
                <Link href={`/my-decks/${lang}`} className="mx-auto btn">
                  Browse/manage on your deck
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
