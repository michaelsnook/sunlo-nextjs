import { urqlClient } from 'lib/supabase-client'
import { getLanguages, getOnePhraseDetails } from 'app/fetchers'
import { TinyPhrase } from 'components/PhraseCardSmall'

const query1 = `
query GetAllPhraseIDsQuery {
  cardPhraseCollection {
    edges {
      node {
        id
      }
    }
  }
}
`

export async function generateStaticParams() {
  const { data, error } = await urqlClient.query(query1).toPromise()
  if (error) throw Error(error)

  return data.cardPhraseCollection.edges.map(edge => ({
    id: edge.node.id,
  }))
}

export default async function Page({ params }) {
  let languages = await getLanguages()
  let phrase = await getOnePhraseDetails(params.id)

  const translations = phrase.cardTranslationCollection?.edges
  const seeAlso = phrase.cardSeeAlsoCollection?.edges.map(({ node }) => {
    return node.fromPhrase.id === phrase.id ? node.toPhrase : node.fromPhrase
  })

  return (
    <div className="page-card flex flex-col gap-12">
      <div>
        <p className="text-xl">
          [{phrase.lang}] Phrase in {languages[phrase.lang]}
        </p>
        <h1 className="h1 my-0">"{phrase.text}"</h1>
      </div>
      <div>
        <h2 className="h2">Translations</h2>
        <ul>
          {translations?.length ? (
            translations.map(({ node }) => {
              return (
                <li key={`translation/${node.id}`}>
                  <TinyPhrase {...node} />
                </li>
              )
            })
          ) : (
            <>OOPS! No translations for this phrase</>
          )}
        </ul>
      </div>
      <div>
        <h2 className="h2 my-6">Related phrases</h2>
        <ul>
          {seeAlso?.length ? (
            seeAlso.map(p => {
              return (
                <li key={`seeAlso/${p.id}`}>
                  <TinyPhrase {...p} />
                </li>
              )
            })
          ) : (
            <>No related phrases to see here</>
          )}
        </ul>
      </div>
    </div>
  )
}
