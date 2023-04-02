import { graphql } from './gql/gql'

// gets all decks for auth'd user, and
// all the card IDs and statuses in those decks
// which serve as metadata for the deck
export const allDecksQuery = graphql(/* GraphQL */ `
  query AllDecksQuery {
    userDeckCollection {
      edges {
        node {
          id
          lang
          userCardCollection {
            edges {
              node {
                id
                status
                phraseId
              }
            }
          }
        }
      }
    }
  }
`)

// gets a big long list of cards' details; irrespective of
// what decks or languages those cards belong to.
// hopefully the react-query cache will
export const allPhraseDetailsQuery = graphql(/* GraphQL */ `
  query AllPhraseDetailsQuery {
    phraseCollection {
      edges {
        node {
          id
          text
          lang
          phraseTranslationCollection {
            edges {
              node {
                id
                text
                lang
              }
            }
          }
          phraseSeeAlsoCollection {
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
`)

export const deckQuery = graphql(/* GraphQL */ `
  query UserDeckQuery($filter: UserDeckFilter) {
    userDeckCollection(filter: $filter) {
      edges {
        node {
          id
          uid
          lang
          userCardCollection {
            edges {
              node {
                id
                status
                phrase {
                  id
                  text
                  lang
                  phraseTranslationCollection {
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
`)

export const languageDetailsQuery = graphql(/* GraphQL */ `
  query LanguageDetailsQuery($filter: LanguageFilter) {
    languageCollection(filter: $filter) {
      edges {
        node {
          lang
          name
          phraseCollection {
            edges {
              node {
                id
                text
                lang
                phraseTranslationCollection {
                  edges {
                    node {
                      id
                      lang
                      text
                    }
                  }
                }
                phraseSeeAlsoCollection {
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
`)

export const phraseDetailsQuery = graphql(/* GraphQL */ `
  query PhraseCollection($filter: PhraseFilter) {
    phraseCollection(filter: $filter) {
      edges {
        node {
          id
          text
          lang
          phraseTranslationCollection {
            edges {
              node {
                id
                text
                lang
              }
            }
          }
          userCardCollection {
            edges {
              node {
                userDeckId
                status
              }
            }
          }
          phraseSeeAlsoCollection {
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
`)

export const profileQuery = graphql(/* GraphQL */ `
  query UserProfileQuery {
    userProfileCollection {
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
`)
