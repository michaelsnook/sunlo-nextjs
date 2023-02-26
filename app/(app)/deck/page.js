'use client'

import { useQuery } from 'urql'
import Link from 'next/link'
import languages from 'lib/languages'
import ErrorList from 'components/ErrorList'
import Loading from 'app/loading'

const getMyDecksQuery = `
query GetMyDecksQuery {
  userDeckCollection {
    edges {
      node {
        id
        lang
        deckMembershipCollection {
          edges {
            node {
              cardPhrase {
                lang
                text
                cardTranslationCollection {
                  edges {
                    node {
                      lang
                      literal
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

function PageInner({ data, fetching, error }) {
  console.log(`pageInner`, data)
  if (fetching) {
    return <Loading />
  }
  if (error) {
    return <ErrorList error={error} />
  }

  console.log(`1 node:`, data.userDeckCollection.edges[0].node)
  console.log(`edges: `, data.userDeckCollection.edges)
  console.log(`data: `, data)
  const decks = data.userDeckCollection.edges
  console.log(`decks`, decks)

  return !decks.length ? (
    <>it looks like you&apos;re not learning any languages right now</>
  ) : (
    decks.map(({ node: { lang } }) => {
      return (
        <li key={lang}>
          <Link href={`/deck/${lang}`} className="btn btn-quiet">
            <p>
              {languages[lang]} ({lang})
            </p>
          </Link>
        </li>
      )
    })
  )
}

export default function MyDecksPage() {
  const [result] = useQuery({ query: getMyDecksQuery })
  const { data, fetching, error } = result
  console.log(`result:`, result)
  return (
    <div className="page-card">
      <h1 className="h1">Decks</h1>
      <ul className="columns-3xs space-y-4">
        <PageInner data={data} fetching={fetching} error={error} />
      </ul>
    </div>
  )
}
