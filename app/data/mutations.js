import { graphql } from 'app/data/gql/gql'

export const newDeckMutation = graphql(/* GraphQL */ `
  mutation Mutation($objects: [UserDeckInsertInput!]!) {
    insertIntoUserDeckCollection(objects: $objects) {
      records {
        id
        lang
      }
    }
  }
`)

export const newCardMutation = graphql(/* GraphQL */ `
  mutation InsertIntoUserCardCollection($objects: [UserCardInsertInput!]!) {
    insertIntoUserCardCollection(objects: $objects) {
      records {
        id
        status
        phraseId
        userDeckId
      }
    }
  }
`)
