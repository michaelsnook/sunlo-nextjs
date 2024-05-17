'use client'

import { useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import languages from 'lib/languages'
import { useDeck } from 'app/data/hooks'
import Loading from 'app/loading'
import supabase from 'lib/supabase-client'
import ErrorList from 'app/components/ErrorList'
import { toast } from 'react-hot-toast'
import SuccessCheckmark from 'app/components/SvgComponents'

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

const postReview = async ({ card_id, score, prevId }) => {
  if (!card_id || !score) throw Error('Invalid review; cannot log')

  const { data, error } = prevId
    ? await supabase
        .from('user_card_review')
        .update({ score })
        .eq('id', prevId)
        .select()
    : await supabase
        .from('user_card_review')
        .insert({ card_id, score })
        .select()

  if (error) throw Error(error)
  // console.log(`We posted the review,`, data, error)
  return data[0]
}

const CardInner = ({ card, advance, addReview, hidden }) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const reveal = () => {
    setIsRevealed(true)
  }

  const { data, error, mutate, status } = useMutation({
    mutationFn: submission =>
      postReview({ ...submission, card_id: card.id, prevId: data?.id }),
    onSuccess: result => {
      // console.log(`onSuccess firing with`, result)
      addReview(result)
      if (result.score === -2)
        toast('got it', { icon: '👍️', position: 'bottom-center' })
      if (result.score === -1)
        toast('got it', { icon: '👍️', position: 'bottom-center' })
      if (result.score === 1)
        toast('got it', { icon: '👍️', position: 'bottom-center' })
      if (result.score === 2)
        toast.success('got it', { position: 'bottom-center' })
      setTimeout(advance, 2000)
    },
  })

  return hidden ? null : (
    <div className="flex flex-col justify-center text-center gap-8">
      <h2 className="h2 text-center">{card?.phrase?.text}</h2>
      {status === 'loading' ? (
        <div className="absolute bg-white/70 top-0 left-0 right-0 bottom-0 content-center">
          <Loading />
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="absolute bg-white/50 top-0 left-0 right-0 bottom-0">
          <ErrorList error={error} />
        </div>
      ) : null}
      {!isRevealed ? (
        <div className="flex gap-4 justify-center">
          <button className="btn btn-success" onClick={reveal}>
            Yes I know it
          </button>
          <button className="btn btn-warning" onClick={reveal}>
            I don&apos;t know it
          </button>
        </div>
      ) : (
        <>
          <div>
            {card.phrase.translations.map(t => (
              <p key={t.id}>&ldquo;{t.text}&rdquo;</p>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className={`btn btn-success ${data ? 'btn-outline' : ''}`}
              onClick={() => mutate({ score: 2 })}
              disabled={data?.score === 2}
            >
              Nailed it!
            </button>
            <button
              className={`btn btn-info ${data ? 'btn-outline' : ''}`}
              onClick={() => mutate({ score: 1 })}
              disabled={data?.score === 1}
            >
              Got it
            </button>
            <button
              className={`btn btn-warning ${data ? 'btn-outline' : ''}`}
              onClick={() => mutate({ score: -1 })}
              disabled={data?.score === -1}
            >
              It was hard
            </button>
            <button
              className={`btn btn-error ${data ? 'btn-outline' : ''}`}
              onClick={() => mutate({ score: -2 })}
              disabled={data?.score === -2}
            >
              Didn&apos;t get it
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function ClientPage({ lang }) {
  const { data, status } = useDeck(lang)
  const reviewCards = useMemo(() => shuffle(data?.cards?.active), [data])
  const [cardIndex, setCardIndex] = useState(0)
  const [reviews, setReviews] = useState([])

  if (status === 'loading') return <Loading />
  if (!data?.cards?.active?.length > 0) return <Empty />

  const canBackup = cardIndex > 0
  const canAdvance = cardIndex < reviewCards.length - 1
  const gobackaCard = () => setCardIndex(cardIndex - 1)
  const advanceCard = () => setCardIndex(cardIndex + 1)

  const addReview = review => {
    const index = reviews.findIndex(r => r.id === review.id)
    let newReviews = reviews
    if (index === -1) newReviews.push(review)
    else newReviews[index] = review
    setReviews(newReviews)
  }

  const card = reviewCards[cardIndex]

  return (
    <div className="h-full grid gap-8 max-w-xl mx-auto">
      <p className="inline-block">
        <span className="alert alert-info inline-block text-white text-center">
          Reviewing {languages[lang]} flash cards.{' '}
          {reviewCards.length - cardIndex} cards left today!{' '}
          {cardIndex < reviewCards.length ? (
            <>
              ({cardIndex + 1} out of {reviewCards.length})
            </>
          ) : null}
        </span>
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="btn btn-outline btn-primary bg-white"
          onClick={gobackaCard}
          disabled={!canBackup}
        >
          Prev card
        </button>
        <button
          className="btn btn-outline btn-primary bg-white"
          onClick={advanceCard}
          disabled={!canAdvance}
        >
          Next card
        </button>
      </div>
      <div className="big-card">
        {cardIndex === reviewCards.length ? (
          <div className="flex flex-row mx-auto gap-6 place-items-center">
            <SuccessCheckmark />
            <p>All done for the day, nice work!</p>
          </div>
        ) : (
          reviewCards.map(c => (
            <CardInner
              key={c.id}
              card={c}
              advance={advanceCard}
              addReview={addReview}
              hidden={c.id !== reviewCards[cardIndex].id}
            />
          ))
        )}
      </div>
      <pre>{JSON.stringify(reviews, null, 2)}</pre>
      <pre>{JSON.stringify(card, null, 2)}</pre>
    </div>
  )
}
