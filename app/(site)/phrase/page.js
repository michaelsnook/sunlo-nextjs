import Link from 'next/link'
import { urqlClient } from 'lib/supabase-client'
import PhraseCardSmall from 'components/PhraseCardSmall'

const query = `
query GetManyCardsQuery {
  cardPhraseCollection {
    edges {
      node {
        id
        text
        lang
        cardTranslationCollection {
          edges {
            node {
              text
              lang
            }
          }
        }
        cardSeeAlsoCollection {
          edges {
            node {
              fromPhrase {
                id
                text
                lang
              }
              toPhrase {
                id
                text
                lang
              }
            }
          }
        }
      }
    }
  }
}
`

export default async function Pokemon() {
  let { data, error } = await urqlClient.query(query).toPromise()
  if (error) throw Error(error)
  const phrases = data.cardPhraseCollection.edges

  return (
    <>
      <div className="py-10">
        <h1 className="h1">Browse all phrases in all languages</h1>
        <p>This page is not really useful, but it's good to have an index.</p>
      </div>
      {!phrases.length ? (
        <p>
          We don&apos;t have any phrases for you to learn {language.name} yet.
          But you can be the first to add one!
        </p>
      ) : (
        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {phrases?.map(({ node }) => (
            <li key={`/phrase/${node.id}`}>
              <Link
                href={`/phrase/${node.id}`}
                className="card shadow p-4 hover:bg-primary hover:text-white mb-4"
              >
                <PhraseCardSmall {...node} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
