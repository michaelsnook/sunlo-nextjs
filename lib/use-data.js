import { useUrqlQuery } from 'lib/auth-client'

const getMyDecksQuery = `
query GetMyDecksQuery {
  userDeckCollection {
    edges {
      node {
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

export function useMyDecks(session) {
  const { data, error, isLoading } = useUrqlQuery(session, getMyDecksQuery)
  if (!session) return null
  if (error) throw Error(error)
  return data
}
