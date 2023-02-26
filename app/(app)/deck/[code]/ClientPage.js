'use client'

import Link from 'next/link'
import PhraseCardSmall from 'components/PhraseCardSmall'
import languages from 'lib/languages'
import { useQuery } from 'urql'
import ErrorList from 'components/ErrorList'
import Loading from 'app/loading'

const getFullDeckDetailsQuery = `
query UserDeckDetailsQuery($filter: UserDeckFilter) {
  userDeckCollection(filter: $filter) {
    edges {
      node {
        id
        uid
        lang
        deckMembershipCollection {
          edges {
            node {
              status
              cardPhraseId
              cardPhrase {
                id
                lang
                text
                cardTranslationCollection {
                  edges {
                    node {
                      id
                      lang
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default function ClientPage({ code }) {
  const vars = {
    filter: {
      lang: {
        eq: code,
      },
    },
  }

  const [result] = useQuery({
    query: getFullDeckDetailsQuery,
    variables: vars,
  })

  const { data, error, fetching } = result
  const deck = data?.userDeckCollection?.edges[0]?.node || null
  const cards = deck?.deckMembershipCollection?.edges || null

  if (error) {
    console.log(`error:`, error)
    return <ErrorList error={error} />
  }
  if (fetching) {
    return <Loading />
  }
  return !cards.length ? (
    <p>
      You aren&apos;t learning any phrases yet in {languages[deck.lang]} yet.
      You can get started now!
    </p>
  ) : (
    <>
      <p className="my-4">
        You have {cards.length} phrases in your {languages[code]} deck.
      </p>
      <p className="my-4">
        You've finished learning{' '}
        {cards.filter(c => c.node.status === 'learned').length} of them, and
        you're working on{' '}
        {cards.filter(c => c.node.status === 'learning').length}.
      </p>
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {cards.map(({ node }) => {
          const url = `/phrase/${node?.cardPhrase?.id}`
          const {
            text,
            lang,
            cardTranslationCollection: { edges },
          } = node.cardPhrase
          return (
            <li key={url}>
              <Link href={url}>
                <PhraseCardSmall
                  status={node.status}
                  text={text}
                  lang={lang}
                  translations={edges}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
