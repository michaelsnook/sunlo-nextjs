import { gql } from 'graphql-request'

export const deckQuery = gql`
  query DeckQuery($filter: UserDeckFilter) {
    userDeckCollection(filter: $filter) {
      edges {
        node {
          id
          uid
          lang
          deckMembershipCollection {
            edges {
              node {
                id
                status
                cardPhrase {
                  id
                  text
                  cardTranslationCollection {
                    edges {
                      node {
                        id
                        text
                        lang
                        literal
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

export const languageDetailsQuery = gql`
  query LanguageDetailsQuery($filter: LanguageFilter) {
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
`

export const phraseDetailsQuery = gql`
  query PhraseDetailsQuery($filter: CardPhraseFilter) {
    cardPhraseCollection(filter: $filter) {
      edges {
        node {
          id
          text
          lang
          cardTranslationCollection {
            edges {
              node {
                id
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

// gets a big long list of cards' details; irrespective of
// what decks or languages those cards belong to.
// hopefully the react-query cache will
export const allPhraseDetailsQuery = gql`
  query AllPhraseDetailsQuery {
    cardPhraseCollection {
      edges {
        node {
          id
          text
          lang
          cardTranslationCollection {
            edges {
              node {
                id
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

// gets all decks for auth'd user, and
// all the card IDs and statuses in those decks
// which serve as metadata for the deck
export const allDecksQuery = gql`
  query AllDecksQuery {
    userDeckCollection {
      edges {
        node {
          id
          lang
          deckMembershipCollection {
            edges {
              node {
                id
                status
                cardPhraseId
              }
            }
          }
        }
      }
    }
  }
`

export const allPhraseIDsQuery = gql`
  query AllPhraseIDsQuery {
    cardPhraseCollection {
      edges {
        node {
          id
        }
      }
    }
  }
`
