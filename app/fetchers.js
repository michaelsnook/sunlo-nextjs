import { urqlClient } from 'lib/supabase-client'

const getAllLanguagesQuery = `
query GetAllLanguagesQuery {
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
export async function getLanguages() {
  const { data, error } = await urqlClient
    .query(getAllLanguagesQuery)
    .toPromise()
  if (error) throw Error(error)
  let languages = {}
  data.languageCollection.edges.map(({ node }) => {
    languages[node.code] = node.name
  })
  return languages
}

const getFullLanguageDetailsQuery = `
query GetFullLanguageDetailsQuery($filter: LanguageFilter) {
  languageCollection(filter: $filter) {
    edges {
      node {
        code
        name
        cardPhraseCollection {
          edges {
            node {
              id
              text
              lang
              cardTranslationCollection {
                edges {
                  node {
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
`

export async function getFullLanguageDetails(code) {
  const vars = {
    filter: {
      code: {
        eq: code,
      },
    },
  }
  const { data, error } = await urqlClient
    .query(getFullLanguageDetailsQuery, vars)
    .toPromise()
  if (error) throw new Error(error)

  return data
}

const getOnePhraseDetailsQuery = `
query GetOnePhraseDetailsQuery($filter: CardPhraseFilter) {
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
export async function getOnePhraseDetails(id) {
  const vars = {
    filter: {
      id: {
        eq: id,
      },
    },
  }
  let { data, error } = await urqlClient
    .query(getOnePhraseDetailsQuery, vars)
    .toPromise()
  if (error) throw Error(error)
  return data.cardPhraseCollection.edges[0].node
}
