import { urqlClient } from 'lib/supabase-client'

const query0 = `
query GetallLanguagesQuery {
  languageCollection {
    edges {
      node { 
        code
        name
      }
    }
  }
}
`
async function getLanguages() {
  const { data, error } = await urqlClient.query(query0).toPromise()
  if (error) throw Error(error)
  let languages = {}
  data.languageCollection.edges.map(({ node }) => {
    languages[node.code] = node.name
  })
  return languages
}

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

const query2 = `
query GetOneCardQuery($filter: CardPhraseFilter) {
  cardPhraseCollection(filter: $filter) {
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
async function getPhrase(id) {
  const vars = {
    filter: {
      id: {
        eq: id,
      },
    },
  }
  let { data, error } = await urqlClient.query(query2, vars).toPromise()
  if (error) throw Error(error)
  return data.cardPhraseCollection.edges[0].node
}

export default async function Page({ params }) {
  let languages = await getLanguages()
  let phrase = await getPhrase(params.id)

  const translations = phrase.cardTranslationCollection?.edges
  const seeAlso = phrase.cardSeeAlsoCollection?.edges.map(({ node }) => {
    return node.fromPhrase.id === phrase.id ? node.toPhrase : node.fromPhrase
  })

  return (
    <div className="flex flex-col gap-12">
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
                  [{node.lang}] {node.text}
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
                  [{p.lang}] {p.text}
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
