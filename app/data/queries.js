import { gql } from 'graphql-request'

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

export const allPhraseIdsQuery = gql`
  query AllPhraseIdsQuery {
    cardPhraseCollection {
      edges {
        node {
          id
        }
      }
    }
  }
`

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
                  lang
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
      }
    }
  }
`

export const phraseDetailsQuery = gql`
  query CardPhraseCollection($filter: CardPhraseFilter) {
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
          deckMembershipCollection {
            edges {
              node {
                deckId
                status
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
export const profileQuery = gql`
  query ProfileQuery {
    profileCollection {
      edges {
        node {
          username
          languagePrimary
          languagesSpoken
          avatarUrl
        }
      }
    }
  }
`
