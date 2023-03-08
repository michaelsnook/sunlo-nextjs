'use client'

import Loading from 'app/loading'
import ErrorList from 'components/ErrorList'
import { usePhrase } from 'app/data/hooks'
import { useMutation } from '@tanstack/react-query'

export function TinyPhrase({ lang, text }) {
  return (
    <>
      {lang ? (
        <span className="text-gray-500">[{lang}]&nbsp;</span>
      ) : (
        <>&nbsp;</>
      )}
      &ldquo;{text}&rdquo;
    </>
  )
}

export default function BigPhrase({ phraseID }) {
  const { data, status, error } = usePhrase(phraseID)
  const addNewCardToDeck = useMutation({
    mutationFn: status => postNewCard(status, phraseID),
    onSuccess: data => {
      console.log(`onSuccess data,`, data)
      queryClient.invalidateQueries({ queryKey: ['deck', lang] })
    },
  })
  if (phraseID === -1) return <>hi</>
  if (status === 'loading') return <Loading />
  if (status === 'error') return <ErrorList error={error} />
  const { text, lang } = data
  const translations = data.cardTranslationCollection?.edges ?? null
  const seeAlsos =
    data.cardSeeAlsoCollection?.edges.map(({ node }) => {
      return {
        node: node.toPhraseId === phraseID ? node.toPhrase : node.fromPhrase,
      }
    }) ?? null

  return (
    <div className={`card p-6 shadow-lg mb-4 w-full inline-block`}>
      <h2 lang={lang} className="h3 font-bold">
        <TinyPhrase text={text} />
      </h2>
      {translations?.length > 0 ? (
        <>
          <p className="mt-6">Translations:</p>
          <ul>
            {translations.map(({ node }) => (
              <li lang={node.lang} key={`translation-${node.id}`}>
                <TinyPhrase {...node} />
              </li>
            ))}
          </ul>
          {seeAlsos.length ? (
            <>
              <p className="mt-6">Related phrases:</p>
              <ul>
                {seeAlsos.map(edge => (
                  <li key={edge.node.id}>
                    <TinyPhrase {...edge.node} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <p className="text-gray-600">There aren't any translations sorry</p>
      )}
      <div className="my-6 flex gap-8 text-2xl">
        <button
          className={`btn btn-success btn-lg ${
            addNewCardToDeck.isLoading ? 'loading' : ''
          }`}
          role="button"
          onClick={() =>
            addNewCardToDeck.mutate({
              status: 'active',
              cardPhraseId: phraseID,
            })
          }
        >
          📖 Learn it!
        </button>
        <button
          className={`btn btn-error btn-lg ${
            addNewCardToDeck.isLoading ? 'loading' : ''
          }`}
          role="button"
          onClick={() =>
            addNewCardToDeck.mutate({
              status: 'skipped',
              cardPhraseId: phraseID,
            })
          }
        >
          ❌ Skip it
        </button>
      </div>
    </div>
  )
}
