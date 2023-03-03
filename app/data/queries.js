import { gql } from 'graphql-request'

export const userDeckDetailsQuery = gql`
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

export const getAllPhrasesQuery = gql`
  query {
    cardPhraseCollection {
      edges {
        node {
          id
          text
          lang
        }
      }
    }
  }
`

export const getFullLanguageDetailsQuery = gql`
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

export const getOnePhraseDetailsQuery = gql`
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

export const getManyCardsDetailsQuery = gql`
  query GetManyCardsDetailsQuery {
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

export const getAllMyDecksQuery = gql`
  query {
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

export const getAllPhraseIDsQuery = gql`
  query GetAllPhraseIDsQuery {
    cardPhraseCollection {
      edges {
        node {
          id
        }
      }
    }
  }
`
