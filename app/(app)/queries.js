import { gql } from 'graphql-request'

export const getMyDecksQuery = gql`
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

export const getFullDeckDetailsQuery = gql`
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
