// @ts-ignore
'use client'

import Loading from 'app/loading'
import ErrorList from 'components/ErrorList'
import { useAllDecks, usePhrase } from 'app/data/hooks'
import { useMutation } from '@tanstack/react-query'
import { postNewCard } from 'app/data/posters'
import { useQueryClient } from '@tanstack/react-query'
import { Scalars } from 'app/data/gql/graphql'
import { UseQueryResult } from 'app/data/hooks'

/*
type TinyPhraseProps = {
  lang?: string
  text: string
}

type BigPhraseProps = {
  phraseId: Scalars['UUID']
  setActivePhrase: Function
}
*/
export const TinyPhrase = ({ lang, text } /*: TinyPhraseProps*/) => (
  <>
    {lang ? <span className="text-gray-500">[{lang}]</span> : null}
    &ldquo;{text}&rdquo;
  </>
)

export default function BigPhrase(
  { phraseId, setActivePhrase } /*: BigPhraseProps*/
) {
  const { data, status, error } = usePhrase(phraseId)
  const { data: decks, status: decksStatus, error: decksError } = useAllDecks()
  const queryClient = useQueryClient()

  // const currentStatus = data?.userCardCollection?.edges[0]?.node?.status || null
  const userDeckId =
    data && decks
      ? decks.find(edge => edge?.node?.lang === data?.lang)?.node?.id
      : null
  const addNewCardToDeck /*: UseQueryResult*/ = useMutation({
    mutationFn: (status /*: string*/) =>
      postNewCard({ status, phraseId, userDeckId }),
    onSuccess: data => {
      console.log(`onSuccess data,`, data)
      queryClient.invalidateQueries({ queryKey: ['user_deck', lang] })
      queryClient.invalidateQueries({ queryKey: ['user_decks'] })
      queryClient.invalidateQueries({ queryKey: ['phrase', phraseId] })
    },
  })

  if (!phraseId) return <>hi</>
  if (status === 'loading' || decksStatus === 'loading') return <Loading />
  if (status === 'error' || decksStatus === 'error')
    return <ErrorList errors={[error, decksError]} />

  // console.log(`the Phrase:`, data)
  const { text, lang } = data
  const translations = data.phraseTranslationCollection?.edges ?? null
  const seeAlsos =
    data.phraseSeeAlsoCollection?.edges.map(({ node }) => {
      return {
        node: node.toPhrase.id === phraseId ? node.toPhrase : node.fromPhrase,
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
                    <a
                      className="hover:underline pointer"
                      href="#"
                      onClick={() => setActivePhrase(edge.node.id)}
                    >
                      <TinyPhrase {...edge.node} />
                    </a>
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
        {addNewCardToDeck.isLoading ? (
          <Loading />
        ) : addNewCardToDeck.isError ? (
          <ErrorList error={addNewCardToDeck.error} />
        ) : addNewCardToDeck.isSuccess ? (
          <p className="text-lg">
            Success! added this phrase to your deck with status: &ldquo;
            {
              addNewCardToDeck.data.insertIntoUserCardCollection.records[0]
                .status
            }
            &rdquo;.&nbsp;
            <a
              href="#"
              className="text-primary hover:underline"
              onClick={() => setActivePhrase('')}
            >
              Keep browsing.
            </a>
          </p>
        ) : (
          <>
            <button
              className={`btn btn-success btn-lg ${
                addNewCardToDeck.isLoading ? 'loading' : ''
              }`}
              role="button"
              onClick={() => addNewCardToDeck.mutate('active')}
            >
              📖 Learn it!
            </button>
            <button
              className={`btn btn-error btn-lg ${
                addNewCardToDeck.isLoading ? 'loading' : ''
              }`}
              role="button"
              onClick={() => addNewCardToDeck.mutate('skipped')}
            >
              ❌ Skip it
            </button>
          </>
        )}
      </div>
    </div>
  )
}
