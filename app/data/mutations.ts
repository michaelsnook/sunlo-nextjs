import { graphql } from 'app/data/gql/gql'

export const newUserDeckMutation = graphql(/* GraphQL */ `
  mutation Mutation($objects: [UserDeckInsertInput!]!) {
    insertIntoUserDeckCollection(objects: $objects) {
      records {
        lang
        id
      }
    }
  }
`)

export const newUserCardMutation = graphql(/* GraphQL */ `
  mutation InsertIntoUserCardCollection($objects: [UserCardInsertInput!]!) {
    insertIntoUserCardCollection(objects: $objects) {
      records {
        userDeckId
        phraseId
        id
        status
      }
    }
  }
`)

export const newPhraseMutation = graphql(/* GraphQL */ `
  mutation IntertIntoPhraseCollection($objects: [PhraseInsertInput!]!) {
    insertIntoPhraseCollection(objects: $objects) {
      records {
        lang
        id
        text
      }
    }
  }
`)

export const newPhraseTranslationsMutation = graphql(/* GraphQL */ `
  mutation InsertIntoPhraseTranslationCollection(
    $objects: [PhraseTranslationInsertInput!]!
  ) {
    insertIntoPhraseTranslationCollection(objects: $objects) {
      records {
        phraseId
        id
        text
        lang
        literal
      }
    }
  }
`)
