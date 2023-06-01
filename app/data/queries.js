import { graphql } from './gql/gql'

// this one is also redundant and can be removed in favor of phraseSetailsQuery
// or even languageDetailsQuery (but loop through the data a bit differently).
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
/*
          userCardCollection {
            edges {
              node {
                phraseId
                id
                status
              }
            }
          }
*/

// this query is redundant and should be removed in favor of the
// below languageDetailsQuery.
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

// this returns everything you need to know about a language which mostly
// means: all its phrases and their public info, as well as whether a
// potential logged-in user has a deck of that language and if so what cards
// are in it.
// It should be used to load up the "context" for language-based pages (which
// is all of them).
export const languageDetailsQuery = graphql(/* GraphQL */ `
  query LanguageDetailsQuery($filter: LanguageFilter) {
    languageCollection(filter: $filter) {
      edges {
        node {
          lang
          name
          userDeckCollection {
            edges {
              node {
                lang
                id
                userCardCollection {
                  edges {
                    node {
                      phraseId
                      id
                      status
                    }
                  }
                }
              }
            }
          }
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

// this returns details of specific phrases, esp translations and see-alsos
// and it includes userCards as well, if they're present.
// it should mostly be used to fetch the details of a single phrase or
// to preload a few at a time for the learning interface.
export const phraseDetailsQuery = graphql(/* GraphQL */ `
  query PhraseCollection($filter: PhraseFilter) {
    phraseCollection(filter: $filter) {
      edges {
        node {
          id
          text
          lang
          userCardCollection {
            edges {
              node {
                phraseId
                userDeckId
                id
                status
              }
            }
          }
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

export const onePhraseDetailsQuery = graphql(/* GraphQL */ `
  query OnePhraseCollection($filter: PhraseFilter) {
    phraseCollection(filter: $filter) {
      edges {
        node {
          id
          text
          lang
          language {
            userDeckCollection {
              edges {
                node {
                  id
                }
              }
            }
          }
          userCardCollection {
            edges {
              node {
                phraseId
                userDeckId
                id
                status
              }
            }
          }
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
