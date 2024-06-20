'use client'

import { useMemo, useState } from 'react'
import languages from 'lib/languages'
import { useDeck } from 'app/data/hooks'
import Loading from 'app/loading'
import SuccessCheckmark from 'app/components/SvgComponents'
import CardInner from './card'

function shuffle(array) {
  if (!array?.length > 0) return []
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
    let temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}

const Empty = () => (
  <p>
    This is empty. You don&apos;t have any active cards. go choose some more
    pls.
  </p>
)

export default function ClientPage({ lang }) {
  const { data, status } = useDeck(lang)
  const reviewCards = useMemo(() => shuffle(data?.cards?.active), [data])
  const [cardIndex, setCardIndex] = useState(0)
  const [reviews, setReviews] = useState([])

  if (status === 'loading') return <Loading />
  if (!data?.cards?.active?.length > 0) return <Empty />

  const canBackup = cardIndex > 0
  const canAdvance = cardIndex < reviewCards.length - 1
  const gobackaCard = () => setCardIndex(i => i - 1)
  const advanceCard = () => setCardIndex(i => i + 1)
  // This is different from advanceCard because it only wants to move forward
  // by 1 after submitting a review, not to stack with button-clicks.
  const nextCard = () => setCardIndex(cardIndex + 1)

  const addReview = review => {
    const index = reviews.findIndex(r => r.id === review.id)
    let newReviews = reviews
    if (index === -1) newReviews.push(review)
    else newReviews[index] = review
    setReviews(newReviews)
  }

  return (
    <div className="h-full grid gap-8 max-w-xl mx-auto">
      <p className="inline-block">
        <span className="alert alert-info inline-block text-info-content text-center">
          Reviewing {languages[lang]} flash cards.{' '}
          {reviewCards.length - cardIndex} cards left today{' '}
          {cardIndex < reviewCards.length ? (
            <>
              ({cardIndex + 1} out of {reviewCards.length})
            </>
          ) : null}
        </span>
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="btn btn-primary"
          onClick={gobackaCard}
          disabled={!canBackup}
        >
          Prev card
        </button>
        <button
          className="btn btn-primary"
          onClick={advanceCard}
          disabled={!canAdvance}
        >
          Next card
        </button>
      </div>
      {cardIndex < reviewCards.length ? null : (
        <div className="flex flex-row mx-auto gap-6 place-items-center my-10">
          <SuccessCheckmark />
          <p>All done for the day, nice work!</p>
        </div>
      )}
      {reviewCards.map(c => (
        <CardInner
          key={c.id}
          card={c}
          nextCard={nextCard}
          addReview={addReview}
          hidden={c.id !== reviewCards[cardIndex]?.id}
        />
      ))}
    </div>
  )
}
