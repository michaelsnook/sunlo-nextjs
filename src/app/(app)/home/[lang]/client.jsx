'use client'

import ErrorList from 'components/error-list'
import { notFound } from 'next/navigation'
import { useProfile } from 'app/data/hooks'
import { useRecentReviews } from 'app/data/reviews'
import Loading from 'components/loading'
import Error from 'components/error'
import languages from 'lib/languages'
import Link from 'next/link'

const RecentReviewsSummary = ({ lang }) => {
  const { data, error, isLoading } = useRecentReviews(lang)
  if (isLoading) return <Loading />
  if (error) return <Error>{error.message}</Error>

  const countReviews = data?.length
  const countPositive = data?.filter(r => r.score > 0).length

  return (
    <div className="card-body bg-base-200 text-base-content">
      <div className="card-title">Review flash cards</div>
      {countReviews > 5 &&
        `You've been studying ${countReviews > 40 ? 'a lot!' : ' – '}`}{' '}
      I see {countReviews} cards reviewed in the last week
      {countPositive > 0 && ` and you remembered ${countPositive} of them`}.
      Keep at it!
    </div>
  )
}

const CardsSummary = ({ deck }) => {
  const { cards_active, cards_learned } = deck
  const cardsInDeck = cards_active + cards_learned
  const beHappy = cards_learned > 5
  return (
    <div className="card-body bg-base-200 text-base-content">
      <div className="card-title">Manage your deck</div>
      You have:
      <ul className="ml-2 block">
        <li>🎴 {cardsInDeck} cards in your deck</li>
        <li>🤓 studying {cards_active} currently</li>
        <li>
          🎊 and you&apos;ve learned {cards_learned + ' '}
          of them{beHappy ? '!' : '.'}
        </li>
      </ul>
    </div>
  )
}

export default function Client({ lang }) {
  const { data, error, isSuccess, isLoading } = useProfile()
  const language = languages[lang]
  if (typeof language !== 'string') notFound()

  if (isLoading) return <Loading />
  if (error) return <Error>{error.message}</Error>

  const deckLoadedArray = isSuccess && data.deck_stubs?.length >= 0

  const deck = deckLoadedArray
    ? data.deck_stubs.find(d => d.lang === lang)
    : null
  if (isLoading) return <Loading />
  if (error) return <ErrorList error={error} />

  return (
    <>
      {deck === null ? (
        <p>
          Are you sure you&apos;re learning this language? To create a deck and{' '}
          <Link className="s-link" href="/my-decks/new">
            start learning {language}, click here
          </Link>
          .
        </p>
      ) : (
        <div className="grid max-w-[44rem] gap-6">
          <div className="card glass">
            <figure>
              <RecentReviewsSummary lang={lang} />
            </figure>
            <div className="card-body">
              <Link href={`/review/${lang}`} className="btn btn-lg">
                Start a review session
              </Link>
            </div>
          </div>

          <div className="card glass">
            <figure>
              <CardsSummary deck={deck} />
            </figure>
            <div className="card-body">
              <Link href={`/my-decks/${lang}`} className="btn btn-lg">
                Browse/manage your deck
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
