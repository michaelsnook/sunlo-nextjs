'use client'

import Loading from 'app/loading'
import ErrorList from 'components/ErrorList'
import { usePhrase } from 'app/data/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postNewCard } from 'app/(app)/my-decks/[lang]/new-card/add-card'
import { toast } from 'react-hot-toast'
import EditCardStatusButtons from './edit-status-buttons'
import SectionTranslations from './translations-section'
import TinyPhrase from './TinyPhrase'
import Link from 'next/link'

export const AddCardButtonsSection = ({ phrase_id, user_deck_id, onClose }) => {
  const queryClient = useQueryClient()
  const makeNewCard = useMutation({
    mutationFn: status =>
      postNewCard({
        status,
        phrase_id,
        user_deck_id,
      }),
    onSuccess: data => {
      setTimeout(async () => {
        onClose()
      }, 5000)
      toast.success(`Card successfully added with status: "${data.status}"`)
      queryClient.setQueryData(['card', data?.id], data)
      queryClient.invalidateQueries({
        queryKey: ['user_deck'],
        exact: false,
        refetchType: 'active',
      })
      const phrase = queryClient.getQueryData(['phrase', phrase_id])
      if (phrase) {
        queryClient.setQueryData(['phrase', phrase_id], {
          ...phrase,
          card: data,
        })
      }
      // console.log(`Return data from adding card:`, data)
    },
  })
  return (
    <div className="my-6 flex gap-8 text-2xl">
      {makeNewCard.isSubmitting ? (
        <Loading />
      ) : makeNewCard.isError ? (
        <ErrorList error={makeNewCard.error} />
      ) : makeNewCard.isSuccess ? (
        <p className="text-lg">
          This phrase is in your deck with status: &ldquo;
          {makeNewCard.data?.status}
          &rdquo;.&nbsp;
          <a className="text-primary s-link" onClick={onClose}>
            Keep browsing.
          </a>
        </p>
      ) : (
        <>
          <button
            className={`btn btn-success btn-lg ${
              makeNewCard.isLoading ? 'loading' : ''
            }`}
            role="button"
            onClick={() => makeNewCard.mutate('active')}
          >
            📖 Learn it!
          </button>
          <button
            className={`btn btn-error btn-lg ${
              makeNewCard.isLoading ? 'loading' : ''
            }`}
            role="button"
            onClick={() => makeNewCard.mutate('skipped')}
          >
            ❌ Skip it
          </button>
        </>
      )}
    </div>
  )
}

export default function BigPhrase({
  user_deck_id,
  phrase_id,
  onClose,
  onNavigate,
  noBox,
}) {
  const {
    data: phrase,
    status: phraseStatus,
    error: phraseError,
  } = usePhrase(phrase_id) // || initialData.id

  if (!phrase_id) return <p>no phrase info provided</p>
  if (phraseStatus === 'loading') return <Loading />

  const translations = phrase?.translations
  const card = phrase?.card
  // console.log(`bigPhrase look for userCard or phrase.card`, phrase)
  const seeAlsos = phrase?.see_also_phrases

  if (phraseStatus === 'error') return <ErrorList error={phraseError} />

  return (
    <div
      className={`${
        noBox ? '' : `card p-6 shadow-lg inline-block`
      } w-full mb-4`}
    >
      {phrase ? (
        <>
          <h2 lang={phrase.lang} className="h3 font-bold">
            <TinyPhrase text={phrase.text} />
          </h2>
          <SectionTranslations
            translations={translations}
            lang={phrase.lang}
            phraseId={phrase.id}
            phraseText={phrase.text}
          />
          <SectionSeeAlsos seeAlsos={seeAlsos} onNavigate={onNavigate} />
          {card ? (
            <EditCardStatusButtons cardId={card?.id} />
          ) : (
            <AddCardButtonsSection
              user_deck_id={user_deck_id}
              phrase_id={phrase_id}
              onClose={onClose}
            />
          )}
        </>
      ) : (
        <>could not load this phrase</>
      )}
    </div>
  )
}

export function SectionSeeAlsos({ seeAlsos, linkFactory }) {
  return (
    <>
      <p className="mt-6 font-bold text-base-content/70 text-sm">
        Related phrases
      </p>
      {seeAlsos.length ? (
        <ul className="text-xl/9">
          {seeAlsos.map(phrase => (
            <li key={phrase.id}>
              <Link
                className="group hover:bg-primary hover:text-white p-2 rounded"
                href={linkFactory(phrase.lang, phrase.id)}
              >
                <TinyPhrase {...phrase} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6">none. Add one?</p>
      )}
    </>
  )
}
