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
  if (!session) return null

  const { data, error, isLoading } = useUrqlQuery(session, getMyDecksQuery)

  if (error) throw Error(error)
  return data
}
