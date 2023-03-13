/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation Mutation($objects: [UserDeckInsertInput!]!) {\n    insertIntoUserDeckCollection(objects: $objects) {\n      records {\n        id\n        lang\n      }\n    }\n  }\n':
    types.MutationDocument,
  '\n  mutation InsertIntoDeckMembershipCollection(\n    $objects: [DeckMembershipInsertInput!]!\n  ) {\n    insertIntoDeckMembershipCollection(objects: $objects) {\n      records {\n        id\n        status\n        cardPhraseId\n        deckId\n      }\n    }\n  }\n':
    types.InsertIntoDeckMembershipCollectionDocument,
  '\n  query AllDecksQuery {\n    userDeckCollection {\n      edges {\n        node {\n          id\n          lang\n          deckMembershipCollection {\n            edges {\n              node {\n                id\n                status\n                cardPhraseId\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.AllDecksQueryDocument,
  '\n  query AllPhraseDetailsQuery {\n    cardPhraseCollection {\n      edges {\n        node {\n          id\n          text\n          lang\n          cardTranslationCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n              }\n            }\n          }\n          cardSeeAlsoCollection {\n            edges {\n              node {\n                fromPhrase {\n                  id\n                  text\n                  lang\n                }\n                toPhrase {\n                  id\n                  text\n                  lang\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.AllPhraseDetailsQueryDocument,
  '\n  query AllPhraseIdsQuery {\n    cardPhraseCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n':
    types.AllPhraseIdsQueryDocument,
  '\n  query DeckQuery($filter: UserDeckFilter) {\n    userDeckCollection(filter: $filter) {\n      edges {\n        node {\n          id\n          uid\n          lang\n          deckMembershipCollection {\n            edges {\n              node {\n                id\n                status\n                cardPhrase {\n                  id\n                  text\n                  lang\n                  cardTranslationCollection {\n                    edges {\n                      node {\n                        id\n                        text\n                        lang\n                        literal\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.DeckQueryDocument,
  '\n  query LanguageDetailsQuery($filter: LanguageFilter) {\n    languageCollection(filter: $filter) {\n      edges {\n        node {\n          code\n          name\n          cardPhraseCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n                cardTranslationCollection {\n                  edges {\n                    node {\n                      id\n                      lang\n                      text\n                    }\n                  }\n                }\n                cardSeeAlsoCollection {\n                  edges {\n                    node {\n                      fromPhrase {\n                        id\n                        text\n                        lang\n                      }\n                      toPhrase {\n                        id\n                        text\n                        lang\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.LanguageDetailsQueryDocument,
  '\n  query CardPhraseCollection($filter: CardPhraseFilter) {\n    cardPhraseCollection(filter: $filter) {\n      edges {\n        node {\n          id\n          text\n          lang\n          cardTranslationCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n              }\n            }\n          }\n          deckMembershipCollection {\n            edges {\n              node {\n                deckId\n                status\n              }\n            }\n          }\n          cardSeeAlsoCollection {\n            edges {\n              node {\n                fromPhrase {\n                  id\n                  text\n                  lang\n                }\n                toPhrase {\n                  id\n                  text\n                  lang\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.CardPhraseCollectionDocument,
  '\n  query ProfileQuery {\n    profileCollection {\n      edges {\n        node {\n          username\n          languagePrimary\n          languagesSpoken\n          avatarUrl\n        }\n      }\n    }\n  }\n':
    types.ProfileQueryDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Mutation($objects: [UserDeckInsertInput!]!) {\n    insertIntoUserDeckCollection(objects: $objects) {\n      records {\n        id\n        lang\n      }\n    }\n  }\n'
): typeof documents['\n  mutation Mutation($objects: [UserDeckInsertInput!]!) {\n    insertIntoUserDeckCollection(objects: $objects) {\n      records {\n        id\n        lang\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation InsertIntoDeckMembershipCollection(\n    $objects: [DeckMembershipInsertInput!]!\n  ) {\n    insertIntoDeckMembershipCollection(objects: $objects) {\n      records {\n        id\n        status\n        cardPhraseId\n        deckId\n      }\n    }\n  }\n'
): typeof documents['\n  mutation InsertIntoDeckMembershipCollection(\n    $objects: [DeckMembershipInsertInput!]!\n  ) {\n    insertIntoDeckMembershipCollection(objects: $objects) {\n      records {\n        id\n        status\n        cardPhraseId\n        deckId\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AllDecksQuery {\n    userDeckCollection {\n      edges {\n        node {\n          id\n          lang\n          deckMembershipCollection {\n            edges {\n              node {\n                id\n                status\n                cardPhraseId\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query AllDecksQuery {\n    userDeckCollection {\n      edges {\n        node {\n          id\n          lang\n          deckMembershipCollection {\n            edges {\n              node {\n                id\n                status\n                cardPhraseId\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AllPhraseDetailsQuery {\n    cardPhraseCollection {\n      edges {\n        node {\n          id\n          text\n          lang\n          cardTranslationCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n              }\n            }\n          }\n          cardSeeAlsoCollection {\n            edges {\n              node {\n                fromPhrase {\n                  id\n                  text\n                  lang\n                }\n                toPhrase {\n                  id\n                  text\n                  lang\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query AllPhraseDetailsQuery {\n    cardPhraseCollection {\n      edges {\n        node {\n          id\n          text\n          lang\n          cardTranslationCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n              }\n            }\n          }\n          cardSeeAlsoCollection {\n            edges {\n              node {\n                fromPhrase {\n                  id\n                  text\n                  lang\n                }\n                toPhrase {\n                  id\n                  text\n                  lang\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AllPhraseIdsQuery {\n    cardPhraseCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query AllPhraseIdsQuery {\n    cardPhraseCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query DeckQuery($filter: UserDeckFilter) {\n    userDeckCollection(filter: $filter) {\n      edges {\n        node {\n          id\n          uid\n          lang\n          deckMembershipCollection {\n            edges {\n              node {\n                id\n                status\n                cardPhrase {\n                  id\n                  text\n                  lang\n                  cardTranslationCollection {\n                    edges {\n                      node {\n                        id\n                        text\n                        lang\n                        literal\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query DeckQuery($filter: UserDeckFilter) {\n    userDeckCollection(filter: $filter) {\n      edges {\n        node {\n          id\n          uid\n          lang\n          deckMembershipCollection {\n            edges {\n              node {\n                id\n                status\n                cardPhrase {\n                  id\n                  text\n                  lang\n                  cardTranslationCollection {\n                    edges {\n                      node {\n                        id\n                        text\n                        lang\n                        literal\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query LanguageDetailsQuery($filter: LanguageFilter) {\n    languageCollection(filter: $filter) {\n      edges {\n        node {\n          code\n          name\n          cardPhraseCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n                cardTranslationCollection {\n                  edges {\n                    node {\n                      id\n                      lang\n                      text\n                    }\n                  }\n                }\n                cardSeeAlsoCollection {\n                  edges {\n                    node {\n                      fromPhrase {\n                        id\n                        text\n                        lang\n                      }\n                      toPhrase {\n                        id\n                        text\n                        lang\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query LanguageDetailsQuery($filter: LanguageFilter) {\n    languageCollection(filter: $filter) {\n      edges {\n        node {\n          code\n          name\n          cardPhraseCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n                cardTranslationCollection {\n                  edges {\n                    node {\n                      id\n                      lang\n                      text\n                    }\n                  }\n                }\n                cardSeeAlsoCollection {\n                  edges {\n                    node {\n                      fromPhrase {\n                        id\n                        text\n                        lang\n                      }\n                      toPhrase {\n                        id\n                        text\n                        lang\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CardPhraseCollection($filter: CardPhraseFilter) {\n    cardPhraseCollection(filter: $filter) {\n      edges {\n        node {\n          id\n          text\n          lang\n          cardTranslationCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n              }\n            }\n          }\n          deckMembershipCollection {\n            edges {\n              node {\n                deckId\n                status\n              }\n            }\n          }\n          cardSeeAlsoCollection {\n            edges {\n              node {\n                fromPhrase {\n                  id\n                  text\n                  lang\n                }\n                toPhrase {\n                  id\n                  text\n                  lang\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query CardPhraseCollection($filter: CardPhraseFilter) {\n    cardPhraseCollection(filter: $filter) {\n      edges {\n        node {\n          id\n          text\n          lang\n          cardTranslationCollection {\n            edges {\n              node {\n                id\n                text\n                lang\n              }\n            }\n          }\n          deckMembershipCollection {\n            edges {\n              node {\n                deckId\n                status\n              }\n            }\n          }\n          cardSeeAlsoCollection {\n            edges {\n              node {\n                fromPhrase {\n                  id\n                  text\n                  lang\n                }\n                toPhrase {\n                  id\n                  text\n                  lang\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ProfileQuery {\n    profileCollection {\n      edges {\n        node {\n          username\n          languagePrimary\n          languagesSpoken\n          avatarUrl\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query ProfileQuery {\n    profileCollection {\n      edges {\n        node {\n          username\n          languagePrimary\n          languagesSpoken\n          avatarUrl\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
