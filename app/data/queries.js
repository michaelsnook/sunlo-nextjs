import { graphql } from './gql/gql'

// this one is also redundant and can be removed in favor of phraseDetailsQuery
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
