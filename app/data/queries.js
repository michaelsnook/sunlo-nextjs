import { graphql } from './gql/gql'

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
