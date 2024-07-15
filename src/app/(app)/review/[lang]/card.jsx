'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import ErrorList from 'components/ErrorList'
import Loading from 'app/loading'
import { toast } from 'react-hot-toast'

const postReview = async ({ card_id, score, prevId }) => {
  if (!card_id || !score) throw Error('Invalid review; cannot log')
  const id = prevId ? { id: prevId } : {}
  const submitData = {
    score,
    card_id,
    ...id,
  }

  // console.log(`About to post the review,`, submitData, prevId)

  const { data, error } = await supabase
    .from('user_card_review')
    .upsert(submitData)
    .select()

  if (error) throw Error(error)
  // console.log(`We posted the review,`, data, error)
  return data[0]
}

export default function CardInner({ card, nextCard, addReview, hidden }) {
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
      setTimeout(nextCard, 1500)
    },
  })

  const btnClasses = `grow basis-44`

  return hidden ? null : (
    <div className="card-white">
      <div className="flex flex-col justify-center text-center gap-8">
        <h2 className="h2 text-center">{card?.phrase?.text}</h2>
        {status === 'loading' ? (
          <div className="absolute bg-base-100/70 top-0 left-0 right-0 bottom-0 content-center">
            <Loading />
          </div>
        ) : null}
        {status === 'error' ? (
          <div className="absolute bg-base-100/50 top-0 left-0 right-0 bottom-0">
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
            <div className="flex gap-2 flex-row flex-wrap justify-center">
              <button
                className={`${btnClasses} btn btn-success ${
                  data ? 'btn-outline' : ''
                }`}
                onClick={() => mutate({ score: 2 })}
                disabled={data?.score === 2}
              >
                Nailed it!
              </button>
              <button
                className={`${btnClasses} btn btn-info ${
                  data ? 'btn-outline' : ''
                }`}
                onClick={() => mutate({ score: 1 })}
                disabled={data?.score === 1}
              >
                Got it
              </button>
              <button
                className={`${btnClasses} btn btn-warning ${
                  data ? 'btn-outline' : ''
                }`}
                onClick={() => mutate({ score: -1 })}
                disabled={data?.score === -1}
              >
                It was hard
              </button>
              <button
                className={`${btnClasses} btn btn-error ${
                  data ? 'btn-outline' : ''
                }`}
                onClick={() => mutate({ score: -2 })}
                disabled={data?.score === -2}
              >
                Didn&apos;t get it
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
