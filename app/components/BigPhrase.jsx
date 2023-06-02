// @ts-ignore
'use client'

import Loading from 'app/loading'
import ErrorList from 'app/components/ErrorList'
import { usePhrase } from 'app/data/hooks'
import { useMutation } from '@tanstack/react-query'
import { postNewCard } from 'app/data/posters'
import { useQueryClient } from '@tanstack/react-query'

export const TinyPhrase = ({ lang, text } /*: TinyPhraseProps*/) => (
  <>
    {lang ? <span className="text-gray-500">[{lang}]&nbsp;</span> : null}
    &ldquo;{text}&rdquo;
  </>
)

const EditCardButtonsSection = ({ userCardId, onSuccess }) => {
  const cardMutation = useMutation({
    // mutationFn: status => editExistingCard(status, card.id)
    mutationFn: status => {
      console.log(`edit a card mutation here: ${status}, ${userCardId}`)
    },
    onSuccess,
  })
  return (
    <p className="my-4">
      there&apos;s already a card here and now you can modify it with buttons
      &lt; button &gt;
    </p>
  )
}

const AddCardButtonsSection = ({
  userDeckId,
  phraseId,
  onSuccess,
  onClose,
}) => {
  const cardMutation = useMutation({
    mutationFn: (status /*: string*/) =>
      postNewCard({
        status,
        phraseId,
        userDeckId,
      }),
    onSuccess,
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
          {cardMutation.data.insertIntoUserCardCollection.records[0].status}
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

export default function BigPhrase({ phraseId, onClose, onNavigate, noBox }) {
  const {
    data: phrase,
    status: phraseStatus,
    error: phraseError,
  } = usePhrase(phraseId) // || initialData.id
  const queryClient = useQueryClient()

  if (!phraseId) return <p>no phrase info provided</p>
  if (phraseStatus === 'loading') return <Loading />

  const translations = phrase?.phrase_translation
  const userCard = phrase?.user_card[0]

  const seeAlsos = phrase?.see_also_phrases

  const clearCache = () => {
    console.log(`onSuccess data,`, phrase)
    queryClient.invalidateQueries({ queryKey: ['phrase', phraseId] })
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
          {userCard ? (
            <EditCardButtonsSection
              userCardId={userCard?.id}
              onSuccess={clearCache}
              onClose={onClose}
            />
          ) : (
            <AddCardButtonsSection
              userDeckId={userCard?.deck_id}
              phraseId={phraseId}
              onSuccess={clearCache}
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
