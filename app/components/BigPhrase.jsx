'use client'

import Loading from 'app/loading'
import ErrorList from 'app/components/ErrorList'
import { usePhrase } from 'app/data/hooks'
import { useMutation } from '@tanstack/react-query'
import { postNewCard } from 'app/(app)/my-decks/[lang]/new-card/add-card'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import EditCardStatusButtons from './edit-status-buttons'
import TinyPhrase from './TinyPhrase'

const AddCardButtonsSection = ({
  phrase_id,
  deck_id: user_deck_id,
  clearCache,
  onClose,
}) => {
  // console.log(`AddCardButtonsSection args`, phrase_id, user_deck_id)
  const cardMutation = useMutation({
    mutationFn: (status /*: string*/) =>
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
      // console.log(`Return data from adding card:`, data)
      clearCache(data)
    },
  })
  return (
    <div className="my-6 flex gap-8 text-2xl">
      {cardMutation.isLoading ? (
        <Loading />
      ) : cardMutation.isError ? (
        <ErrorList error={cardMutation.error} />
      ) : cardMutation.isSuccess ? (
        <p className="text-lg">
          Success! added this phrase to your deck with status: &ldquo;
          {cardMutation.data[0]?.status}
          &rdquo;.&nbsp;
          <a href="#" className="text-primary link" onClick={onClose}>
            Keep browsing.
          </a>
        </p>
      ) : (
        <>
          <button
            className={`btn btn-success btn-lg ${
              cardMutation.isLoading ? 'loading' : ''
            }`}
            role="button"
            onClick={() => cardMutation.mutate('active')}
          >
            📖 Learn it!
          </button>
          <button
            className={`btn btn-error btn-lg ${
              cardMutation.isLoading ? 'loading' : ''
            }`}
            role="button"
            onClick={() => cardMutation.mutate('skipped')}
          >
            ❌ Skip it
          </button>
        </>
      )}
    </div>
  )
}

export default function BigPhrase({
  deck_id,
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

  const queryClient = useQueryClient()

  if (!phrase_id) return <p>no phrase info provided</p>
  if (phraseStatus === 'loading') return <Loading />

  const translations = phrase?.translations
  const card = phrase?.card
  // console.log(`bigPhrase look for userCard or phrase.card`, phrase)
  const seeAlsos = phrase?.see_also_phrases

  const clearCache = () => {
    // console.log(`Clearing cache for phrase:`, phrase)
    queryClient.invalidateQueries({ queryKey: ['phrase', phrase_id] })
    queryClient.invalidateQueries({ queryKey: ['user_deck', phrase.lang] })
    queryClient.invalidateQueries({ queryKey: ['user_decks'] })
  }

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
          <BigPhraseInner
            translations={translations}
            seeAlsos={seeAlsos}
            onNavigate={onNavigate}
          />
          {card ? (
            <EditCardStatusButtons cardId={card?.id} />
          ) : (
            <AddCardButtonsSection
              deck_id={deck_id}
              phrase_id={phrase_id}
              clearCache={clearCache}
              onClose={onClose}
            />
          )}
        </>
      ) : (
        <>some issue</>
      )}
    </div>
  )
}

function BigPhraseInner({ translations, seeAlsos, onNavigate }) {
  return (
    <>
      {translations?.length > 0 ? (
        <>
          <p className="mt-6">Translations:</p>
          <ul>
            {translations.map(trans => (
              <li lang={trans.lang} key={`translation-${trans.id}`}>
                <TinyPhrase {...trans} />
              </li>
            ))}
          </ul>
          {seeAlsos.length ? (
            <>
              <p className="mt-6">Related phrases:</p>
              <ul>
                {seeAlsos.map(phrase => (
                  <li key={phrase.id}>
                    <a className="link" onClick={() => onNavigate(phrase.id)}>
                      <TinyPhrase {...phrase} />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </>
      ) : (
        <p className="text-gray-600">
          There aren&apos;t any translations sorry
        </p>
      )}
    </>
  )
}
