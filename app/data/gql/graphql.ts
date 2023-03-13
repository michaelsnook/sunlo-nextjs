/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

export type CardPhrase = Node & {
  __typename?: 'CardPhrase';
  addedBy?: Maybe<Scalars['UUID']>;
  cardSeeAlsoCollection?: Maybe<CardSeeAlsoConnection>;
  cardTranslationCollection?: Maybe<CardTranslationConnection>;
  deckMembershipCollection?: Maybe<DeckMembershipConnection>;
  id: Scalars['UUID'];
  lang?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  text: Scalars['String'];
};


export type CardPhraseCardSeeAlsoCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CardSeeAlsoFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CardSeeAlsoOrderBy>>;
};


export type CardPhraseCardTranslationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CardTranslationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CardTranslationOrderBy>>;
};


export type CardPhraseDeckMembershipCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<DeckMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeckMembershipOrderBy>>;
};

export type CardPhraseConnection = {
  __typename?: 'CardPhraseConnection';
  edges: Array<CardPhraseEdge>;
  pageInfo: PageInfo;
};

export type CardPhraseDeleteResponse = {
  __typename?: 'CardPhraseDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardPhrase>;
};

export type CardPhraseEdge = {
  __typename?: 'CardPhraseEdge';
  cursor: Scalars['String'];
  node: CardPhrase;
};

export type CardPhraseFilter = {
  addedBy?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  lang?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  text?: InputMaybe<StringFilter>;
};

export type CardPhraseInsertInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type CardPhraseInsertResponse = {
  __typename?: 'CardPhraseInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardPhrase>;
};

export type CardPhraseOrderBy = {
  addedBy?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  lang?: InputMaybe<OrderByDirection>;
  text?: InputMaybe<OrderByDirection>;
};

export type CardPhraseUpdateInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type CardPhraseUpdateResponse = {
  __typename?: 'CardPhraseUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardPhrase>;
};

export type CardSeeAlso = Node & {
  __typename?: 'CardSeeAlso';
  addedBy?: Maybe<Scalars['UUID']>;
  fromPhrase?: Maybe<CardPhrase>;
  fromPhraseId?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  toPhrase?: Maybe<CardPhrase>;
  toPhraseId?: Maybe<Scalars['UUID']>;
};

export type CardSeeAlsoConnection = {
  __typename?: 'CardSeeAlsoConnection';
  edges: Array<CardSeeAlsoEdge>;
  pageInfo: PageInfo;
};

export type CardSeeAlsoDeleteResponse = {
  __typename?: 'CardSeeAlsoDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardSeeAlso>;
};

export type CardSeeAlsoEdge = {
  __typename?: 'CardSeeAlsoEdge';
  cursor: Scalars['String'];
  node: CardSeeAlso;
};

export type CardSeeAlsoFilter = {
  addedBy?: InputMaybe<UuidFilter>;
  fromPhraseId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  toPhraseId?: InputMaybe<UuidFilter>;
};

export type CardSeeAlsoInsertInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  fromPhraseId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  toPhraseId?: InputMaybe<Scalars['UUID']>;
};

export type CardSeeAlsoInsertResponse = {
  __typename?: 'CardSeeAlsoInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardSeeAlso>;
};

export type CardSeeAlsoOrderBy = {
  addedBy?: InputMaybe<OrderByDirection>;
  fromPhraseId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  toPhraseId?: InputMaybe<OrderByDirection>;
};

export type CardSeeAlsoUpdateInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  fromPhraseId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  toPhraseId?: InputMaybe<Scalars['UUID']>;
};

export type CardSeeAlsoUpdateResponse = {
  __typename?: 'CardSeeAlsoUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardSeeAlso>;
};

export type CardTranslation = Node & {
  __typename?: 'CardTranslation';
  addedBy?: Maybe<Scalars['UUID']>;
  cardPhrase?: Maybe<CardPhrase>;
  cardPhraseId: Scalars['UUID'];
  id: Scalars['UUID'];
  lang?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  literal?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type CardTranslationConnection = {
  __typename?: 'CardTranslationConnection';
  edges: Array<CardTranslationEdge>;
  pageInfo: PageInfo;
};

export type CardTranslationDeleteResponse = {
  __typename?: 'CardTranslationDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardTranslation>;
};

export type CardTranslationEdge = {
  __typename?: 'CardTranslationEdge';
  cursor: Scalars['String'];
  node: CardTranslation;
};

export type CardTranslationFilter = {
  addedBy?: InputMaybe<UuidFilter>;
  cardPhraseId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  lang?: InputMaybe<StringFilter>;
  literal?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  text?: InputMaybe<StringFilter>;
};

export type CardTranslationInsertInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  cardPhraseId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  literal?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type CardTranslationInsertResponse = {
  __typename?: 'CardTranslationInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardTranslation>;
};

export type CardTranslationOrderBy = {
  addedBy?: InputMaybe<OrderByDirection>;
  cardPhraseId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  lang?: InputMaybe<OrderByDirection>;
  literal?: InputMaybe<OrderByDirection>;
  text?: InputMaybe<OrderByDirection>;
};

export type CardTranslationUpdateInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  cardPhraseId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  literal?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type CardTranslationUpdateResponse = {
  __typename?: 'CardTranslationUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<CardTranslation>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

export type DeckMembership = Node & {
  __typename?: 'DeckMembership';
  cardPhrase?: Maybe<CardPhrase>;
  cardPhraseId: Scalars['UUID'];
  deck?: Maybe<UserDeck>;
  deckId?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  profile?: Maybe<Profile>;
  status: Scalars['String'];
  uid: Scalars['UUID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type DeckMembershipConnection = {
  __typename?: 'DeckMembershipConnection';
  edges: Array<DeckMembershipEdge>;
  pageInfo: PageInfo;
};

export type DeckMembershipDeleteResponse = {
  __typename?: 'DeckMembershipDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<DeckMembership>;
};

export type DeckMembershipEdge = {
  __typename?: 'DeckMembershipEdge';
  cursor: Scalars['String'];
  node: DeckMembership;
};

export type DeckMembershipFilter = {
  cardPhraseId?: InputMaybe<UuidFilter>;
  deckId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  status?: InputMaybe<StringFilter>;
  uid?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type DeckMembershipInsertInput = {
  cardPhraseId?: InputMaybe<Scalars['UUID']>;
  deckId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type DeckMembershipInsertResponse = {
  __typename?: 'DeckMembershipInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<DeckMembership>;
};

export type DeckMembershipOrderBy = {
  cardPhraseId?: InputMaybe<OrderByDirection>;
  deckId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  uid?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type DeckMembershipUpdateInput = {
  cardPhraseId?: InputMaybe<Scalars['UUID']>;
  deckId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type DeckMembershipUpdateResponse = {
  __typename?: 'DeckMembershipUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<DeckMembership>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

export type Language = Node & {
  __typename?: 'Language';
  aliasOf?: Maybe<Scalars['String']>;
  cardPhraseCollection?: Maybe<CardPhraseConnection>;
  cardTranslationCollection?: Maybe<CardTranslationConnection>;
  code: Scalars['String'];
  name: Scalars['String'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  userDeckCollection?: Maybe<UserDeckConnection>;
};


export type LanguageCardPhraseCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CardPhraseFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CardPhraseOrderBy>>;
};


export type LanguageCardTranslationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CardTranslationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CardTranslationOrderBy>>;
};


export type LanguageUserDeckCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserDeckFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserDeckOrderBy>>;
};

export type LanguageConnection = {
  __typename?: 'LanguageConnection';
  edges: Array<LanguageEdge>;
  pageInfo: PageInfo;
};

export type LanguageDeleteResponse = {
  __typename?: 'LanguageDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Language>;
};

export type LanguageEdge = {
  __typename?: 'LanguageEdge';
  cursor: Scalars['String'];
  node: Language;
};

export type LanguageFilter = {
  aliasOf?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type LanguageInsertInput = {
  aliasOf?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type LanguageInsertResponse = {
  __typename?: 'LanguageInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Language>;
};

export type LanguageOrderBy = {
  aliasOf?: InputMaybe<OrderByDirection>;
  code?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type LanguageUpdateInput = {
  aliasOf?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type LanguageUpdateResponse = {
  __typename?: 'LanguageUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Language>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `CardPhrase` collection */
  deleteFromCardPhraseCollection: CardPhraseDeleteResponse;
  /** Deletes zero or more records from the `CardSeeAlso` collection */
  deleteFromCardSeeAlsoCollection: CardSeeAlsoDeleteResponse;
  /** Deletes zero or more records from the `CardTranslation` collection */
  deleteFromCardTranslationCollection: CardTranslationDeleteResponse;
  /** Deletes zero or more records from the `DeckMembership` collection */
  deleteFromDeckMembershipCollection: DeckMembershipDeleteResponse;
  /** Deletes zero or more records from the `Language` collection */
  deleteFromLanguageCollection: LanguageDeleteResponse;
  /** Deletes zero or more records from the `Profile` collection */
  deleteFromProfileCollection: ProfileDeleteResponse;
  /** Deletes zero or more records from the `UserDeck` collection */
  deleteFromUserDeckCollection: UserDeckDeleteResponse;
  /** Deletes zero or more records from the `buckets` collection */
  deleteFrombucketsCollection: BucketsDeleteResponse;
  /** Deletes zero or more records from the `migrations` collection */
  deleteFrommigrationsCollection: MigrationsDeleteResponse;
  /** Deletes zero or more records from the `objects` collection */
  deleteFromobjectsCollection: ObjectsDeleteResponse;
  /** Adds one or more `CardPhrase` records to the collection */
  insertIntoCardPhraseCollection?: Maybe<CardPhraseInsertResponse>;
  /** Adds one or more `CardSeeAlso` records to the collection */
  insertIntoCardSeeAlsoCollection?: Maybe<CardSeeAlsoInsertResponse>;
  /** Adds one or more `CardTranslation` records to the collection */
  insertIntoCardTranslationCollection?: Maybe<CardTranslationInsertResponse>;
  /** Adds one or more `DeckMembership` records to the collection */
  insertIntoDeckMembershipCollection?: Maybe<DeckMembershipInsertResponse>;
  /** Adds one or more `Language` records to the collection */
  insertIntoLanguageCollection?: Maybe<LanguageInsertResponse>;
  /** Adds one or more `Profile` records to the collection */
  insertIntoProfileCollection?: Maybe<ProfileInsertResponse>;
  /** Adds one or more `UserDeck` records to the collection */
  insertIntoUserDeckCollection?: Maybe<UserDeckInsertResponse>;
  /** Adds one or more `buckets` records to the collection */
  insertIntobucketsCollection?: Maybe<BucketsInsertResponse>;
  /** Adds one or more `migrations` records to the collection */
  insertIntomigrationsCollection?: Maybe<MigrationsInsertResponse>;
  /** Adds one or more `objects` records to the collection */
  insertIntoobjectsCollection?: Maybe<ObjectsInsertResponse>;
  /** Updates zero or more records in the `CardPhrase` collection */
  updateCardPhraseCollection: CardPhraseUpdateResponse;
  /** Updates zero or more records in the `CardSeeAlso` collection */
  updateCardSeeAlsoCollection: CardSeeAlsoUpdateResponse;
  /** Updates zero or more records in the `CardTranslation` collection */
  updateCardTranslationCollection: CardTranslationUpdateResponse;
  /** Updates zero or more records in the `DeckMembership` collection */
  updateDeckMembershipCollection: DeckMembershipUpdateResponse;
  /** Updates zero or more records in the `Language` collection */
  updateLanguageCollection: LanguageUpdateResponse;
  /** Updates zero or more records in the `Profile` collection */
  updateProfileCollection: ProfileUpdateResponse;
  /** Updates zero or more records in the `UserDeck` collection */
  updateUserDeckCollection: UserDeckUpdateResponse;
  /** Updates zero or more records in the `buckets` collection */
  updatebucketsCollection: BucketsUpdateResponse;
  /** Updates zero or more records in the `migrations` collection */
  updatemigrationsCollection: MigrationsUpdateResponse;
  /** Updates zero or more records in the `objects` collection */
  updateobjectsCollection: ObjectsUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCardPhraseCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CardPhraseFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCardSeeAlsoCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CardSeeAlsoFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCardTranslationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CardTranslationFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromDeckMembershipCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<DeckMembershipFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromLanguageCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LanguageFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromProfileCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfileFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromUserDeckCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserDeckFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrombucketsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<BucketsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrommigrationsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MigrationsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromobjectsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ObjectsFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCardPhraseCollectionArgs = {
  objects: Array<CardPhraseInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCardSeeAlsoCollectionArgs = {
  objects: Array<CardSeeAlsoInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCardTranslationCollectionArgs = {
  objects: Array<CardTranslationInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoDeckMembershipCollectionArgs = {
  objects: Array<DeckMembershipInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoLanguageCollectionArgs = {
  objects: Array<LanguageInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoProfileCollectionArgs = {
  objects: Array<ProfileInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoUserDeckCollectionArgs = {
  objects: Array<UserDeckInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntobucketsCollectionArgs = {
  objects: Array<BucketsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntomigrationsCollectionArgs = {
  objects: Array<MigrationsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoobjectsCollectionArgs = {
  objects: Array<ObjectsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateCardPhraseCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CardPhraseFilter>;
  set: CardPhraseUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCardSeeAlsoCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CardSeeAlsoFilter>;
  set: CardSeeAlsoUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCardTranslationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CardTranslationFilter>;
  set: CardTranslationUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateDeckMembershipCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<DeckMembershipFilter>;
  set: DeckMembershipUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateLanguageCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LanguageFilter>;
  set: LanguageUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateProfileCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfileFilter>;
  set: ProfileUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateUserDeckCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserDeckFilter>;
  set: UserDeckUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatebucketsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<BucketsFilter>;
  set: BucketsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatemigrationsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<MigrationsFilter>;
  set: MigrationsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateobjectsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ObjectsFilter>;
  set: ObjectsUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID'];
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Profile = Node & {
  __typename?: 'Profile';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  deckMembershipCollection?: Maybe<DeckMembershipConnection>;
  languagePrimary: Scalars['String'];
  languagesSpoken: Array<Maybe<Scalars['String']>>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  uid: Scalars['UUID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
  userDeckCollection?: Maybe<UserDeckConnection>;
  username?: Maybe<Scalars['String']>;
};


export type ProfileDeckMembershipCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<DeckMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeckMembershipOrderBy>>;
};


export type ProfileUserDeckCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserDeckFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserDeckOrderBy>>;
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  edges: Array<ProfileEdge>;
  pageInfo: PageInfo;
};

export type ProfileDeleteResponse = {
  __typename?: 'ProfileDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileEdge = {
  __typename?: 'ProfileEdge';
  cursor: Scalars['String'];
  node: Profile;
};

export type ProfileFilter = {
  avatarUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  languagePrimary?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  uid?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type ProfileInsertInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  languagePrimary?: InputMaybe<Scalars['String']>;
  languagesSpoken?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  username?: InputMaybe<Scalars['String']>;
};

export type ProfileInsertResponse = {
  __typename?: 'ProfileInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileOrderBy = {
  avatarUrl?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  languagePrimary?: InputMaybe<OrderByDirection>;
  uid?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
};

export type ProfileUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  languagePrimary?: InputMaybe<Scalars['String']>;
  languagesSpoken?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  username?: InputMaybe<Scalars['String']>;
};

export type ProfileUpdateResponse = {
  __typename?: 'ProfileUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `buckets` */
  bucketsCollection?: Maybe<BucketsConnection>;
  /** A pagable collection of type `CardPhrase` */
  cardPhraseCollection?: Maybe<CardPhraseConnection>;
  /** A pagable collection of type `CardSeeAlso` */
  cardSeeAlsoCollection?: Maybe<CardSeeAlsoConnection>;
  /** A pagable collection of type `CardTranslation` */
  cardTranslationCollection?: Maybe<CardTranslationConnection>;
  /** A pagable collection of type `DeckMembership` */
  deckMembershipCollection?: Maybe<DeckMembershipConnection>;
  /** A pagable collection of type `Language` */
  languageCollection?: Maybe<LanguageConnection>;
  /** A pagable collection of type `migrations` */
  migrationsCollection?: Maybe<MigrationsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `objects` */
  objectsCollection?: Maybe<ObjectsConnection>;
  /** A pagable collection of type `Profile` */
  profileCollection?: Maybe<ProfileConnection>;
  /** A pagable collection of type `UserDeck` */
  userDeckCollection?: Maybe<UserDeckConnection>;
};


/** The root type for querying data */
export type QueryBucketsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<BucketsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BucketsOrderBy>>;
};


/** The root type for querying data */
export type QueryCardPhraseCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CardPhraseFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CardPhraseOrderBy>>;
};


/** The root type for querying data */
export type QueryCardSeeAlsoCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CardSeeAlsoFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CardSeeAlsoOrderBy>>;
};


/** The root type for querying data */
export type QueryCardTranslationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CardTranslationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CardTranslationOrderBy>>;
};


/** The root type for querying data */
export type QueryDeckMembershipCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<DeckMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeckMembershipOrderBy>>;
};


/** The root type for querying data */
export type QueryLanguageCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<LanguageFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LanguageOrderBy>>;
};


/** The root type for querying data */
export type QueryMigrationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MigrationsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MigrationsOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root type for querying data */
export type QueryObjectsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ObjectsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ObjectsOrderBy>>;
};


/** The root type for querying data */
export type QueryProfileCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ProfileFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProfileOrderBy>>;
};


/** The root type for querying data */
export type QueryUserDeckCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserDeckFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserDeckOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  in?: InputMaybe<Array<Scalars['Time']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type UserDeck = Node & {
  __typename?: 'UserDeck';
  deckMembershipCollection?: Maybe<DeckMembershipConnection>;
  id: Scalars['UUID'];
  lang?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  profile?: Maybe<Profile>;
  uid: Scalars['UUID'];
};


export type UserDeckDeckMembershipCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<DeckMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeckMembershipOrderBy>>;
};

export type UserDeckConnection = {
  __typename?: 'UserDeckConnection';
  edges: Array<UserDeckEdge>;
  pageInfo: PageInfo;
};

export type UserDeckDeleteResponse = {
  __typename?: 'UserDeckDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserDeck>;
};

export type UserDeckEdge = {
  __typename?: 'UserDeckEdge';
  cursor: Scalars['String'];
  node: UserDeck;
};

export type UserDeckFilter = {
  id?: InputMaybe<UuidFilter>;
  lang?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  uid?: InputMaybe<UuidFilter>;
};

export type UserDeckInsertInput = {
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['UUID']>;
};

export type UserDeckInsertResponse = {
  __typename?: 'UserDeckInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserDeck>;
};

export type UserDeckOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  lang?: InputMaybe<OrderByDirection>;
  uid?: InputMaybe<OrderByDirection>;
};

export type UserDeckUpdateInput = {
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['UUID']>;
};

export type UserDeckUpdateResponse = {
  __typename?: 'UserDeckUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserDeck>;
};

export type Buckets = Node & {
  __typename?: 'buckets';
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['String'];
  name: Scalars['String'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  objectsCollection?: Maybe<ObjectsConnection>;
  owner?: Maybe<Scalars['UUID']>;
  public?: Maybe<Scalars['Boolean']>;
  updated_at?: Maybe<Scalars['Datetime']>;
};


export type BucketsObjectsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ObjectsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ObjectsOrderBy>>;
};

export type BucketsConnection = {
  __typename?: 'bucketsConnection';
  edges: Array<BucketsEdge>;
  pageInfo: PageInfo;
};

export type BucketsDeleteResponse = {
  __typename?: 'bucketsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Buckets>;
};

export type BucketsEdge = {
  __typename?: 'bucketsEdge';
  cursor: Scalars['String'];
  node: Buckets;
};

export type BucketsFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  owner?: InputMaybe<UuidFilter>;
  public?: InputMaybe<BooleanFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type BucketsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['UUID']>;
  public?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
};

export type BucketsInsertResponse = {
  __typename?: 'bucketsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Buckets>;
};

export type BucketsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  owner?: InputMaybe<OrderByDirection>;
  public?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type BucketsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['UUID']>;
  public?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
};

export type BucketsUpdateResponse = {
  __typename?: 'bucketsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Buckets>;
};

export type Migrations = Node & {
  __typename?: 'migrations';
  executed_at?: Maybe<Scalars['Datetime']>;
  hash: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
};

export type MigrationsConnection = {
  __typename?: 'migrationsConnection';
  edges: Array<MigrationsEdge>;
  pageInfo: PageInfo;
};

export type MigrationsDeleteResponse = {
  __typename?: 'migrationsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Migrations>;
};

export type MigrationsEdge = {
  __typename?: 'migrationsEdge';
  cursor: Scalars['String'];
  node: Migrations;
};

export type MigrationsFilter = {
  executed_at?: InputMaybe<DatetimeFilter>;
  hash?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type MigrationsInsertInput = {
  executed_at?: InputMaybe<Scalars['Datetime']>;
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MigrationsInsertResponse = {
  __typename?: 'migrationsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Migrations>;
};

export type MigrationsOrderBy = {
  executed_at?: InputMaybe<OrderByDirection>;
  hash?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type MigrationsUpdateInput = {
  executed_at?: InputMaybe<Scalars['Datetime']>;
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MigrationsUpdateResponse = {
  __typename?: 'migrationsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Migrations>;
};

export type Objects = Node & {
  __typename?: 'objects';
  bucket_id?: Maybe<Scalars['String']>;
  buckets?: Maybe<Buckets>;
  created_at?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  last_accessed_at?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  owner?: Maybe<Scalars['UUID']>;
  path_tokens?: Maybe<Array<Maybe<Scalars['String']>>>;
  updated_at?: Maybe<Scalars['Datetime']>;
};

export type ObjectsConnection = {
  __typename?: 'objectsConnection';
  edges: Array<ObjectsEdge>;
  pageInfo: PageInfo;
};

export type ObjectsDeleteResponse = {
  __typename?: 'objectsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Objects>;
};

export type ObjectsEdge = {
  __typename?: 'objectsEdge';
  cursor: Scalars['String'];
  node: Objects;
};

export type ObjectsFilter = {
  bucket_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  last_accessed_at?: InputMaybe<DatetimeFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  owner?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ObjectsInsertInput = {
  bucket_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  last_accessed_at?: InputMaybe<Scalars['Datetime']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['UUID']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
};

export type ObjectsInsertResponse = {
  __typename?: 'objectsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Objects>;
};

export type ObjectsOrderBy = {
  bucket_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  last_accessed_at?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  owner?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ObjectsUpdateInput = {
  bucket_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  last_accessed_at?: InputMaybe<Scalars['Datetime']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['UUID']>;
  updated_at?: InputMaybe<Scalars['Datetime']>;
};

export type ObjectsUpdateResponse = {
  __typename?: 'objectsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Objects>;
};

export type MutationMutationVariables = Exact<{
  objects: Array<UserDeckInsertInput> | UserDeckInsertInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', insertIntoUserDeckCollection?: { __typename?: 'UserDeckInsertResponse', records: Array<{ __typename?: 'UserDeck', id: any, lang?: string | null }> } | null };

export type InsertIntoDeckMembershipCollectionMutationVariables = Exact<{
  objects: Array<DeckMembershipInsertInput> | DeckMembershipInsertInput;
}>;


export type InsertIntoDeckMembershipCollectionMutation = { __typename?: 'Mutation', insertIntoDeckMembershipCollection?: { __typename?: 'DeckMembershipInsertResponse', records: Array<{ __typename?: 'DeckMembership', id: any, status: string, cardPhraseId: any, deckId?: any | null }> } | null };

export type AllDecksQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDecksQueryQuery = { __typename?: 'Query', userDeckCollection?: { __typename?: 'UserDeckConnection', edges: Array<{ __typename?: 'UserDeckEdge', node: { __typename?: 'UserDeck', id: any, lang?: string | null, deckMembershipCollection?: { __typename?: 'DeckMembershipConnection', edges: Array<{ __typename?: 'DeckMembershipEdge', node: { __typename?: 'DeckMembership', id: any, status: string, cardPhraseId: any } }> } | null } }> } | null };

export type AllPhraseDetailsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPhraseDetailsQueryQuery = { __typename?: 'Query', cardPhraseCollection?: { __typename?: 'CardPhraseConnection', edges: Array<{ __typename?: 'CardPhraseEdge', node: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null, cardTranslationCollection?: { __typename?: 'CardTranslationConnection', edges: Array<{ __typename?: 'CardTranslationEdge', node: { __typename?: 'CardTranslation', id: any, text?: string | null, lang?: string | null } }> } | null, cardSeeAlsoCollection?: { __typename?: 'CardSeeAlsoConnection', edges: Array<{ __typename?: 'CardSeeAlsoEdge', node: { __typename?: 'CardSeeAlso', fromPhrase?: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null } | null, toPhrase?: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null } | null } }> } | null } }> } | null };

export type AllPhraseIdsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPhraseIdsQueryQuery = { __typename?: 'Query', cardPhraseCollection?: { __typename?: 'CardPhraseConnection', edges: Array<{ __typename?: 'CardPhraseEdge', node: { __typename?: 'CardPhrase', id: any } }> } | null };

export type DeckQueryQueryVariables = Exact<{
  filter?: InputMaybe<UserDeckFilter>;
}>;


export type DeckQueryQuery = { __typename?: 'Query', userDeckCollection?: { __typename?: 'UserDeckConnection', edges: Array<{ __typename?: 'UserDeckEdge', node: { __typename?: 'UserDeck', id: any, uid: any, lang?: string | null, deckMembershipCollection?: { __typename?: 'DeckMembershipConnection', edges: Array<{ __typename?: 'DeckMembershipEdge', node: { __typename?: 'DeckMembership', id: any, status: string, cardPhrase?: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null, cardTranslationCollection?: { __typename?: 'CardTranslationConnection', edges: Array<{ __typename?: 'CardTranslationEdge', node: { __typename?: 'CardTranslation', id: any, text?: string | null, lang?: string | null, literal?: string | null } }> } | null } | null } }> } | null } }> } | null };

export type LanguageDetailsQueryQueryVariables = Exact<{
  filter?: InputMaybe<LanguageFilter>;
}>;


export type LanguageDetailsQueryQuery = { __typename?: 'Query', languageCollection?: { __typename?: 'LanguageConnection', edges: Array<{ __typename?: 'LanguageEdge', node: { __typename?: 'Language', code: string, name: string, cardPhraseCollection?: { __typename?: 'CardPhraseConnection', edges: Array<{ __typename?: 'CardPhraseEdge', node: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null, cardTranslationCollection?: { __typename?: 'CardTranslationConnection', edges: Array<{ __typename?: 'CardTranslationEdge', node: { __typename?: 'CardTranslation', id: any, lang?: string | null, text?: string | null } }> } | null, cardSeeAlsoCollection?: { __typename?: 'CardSeeAlsoConnection', edges: Array<{ __typename?: 'CardSeeAlsoEdge', node: { __typename?: 'CardSeeAlso', fromPhrase?: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null } | null, toPhrase?: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null } | null } }> } | null } }> } | null } }> } | null };

export type CardPhraseCollectionQueryVariables = Exact<{
  filter?: InputMaybe<CardPhraseFilter>;
}>;


export type CardPhraseCollectionQuery = { __typename?: 'Query', cardPhraseCollection?: { __typename?: 'CardPhraseConnection', edges: Array<{ __typename?: 'CardPhraseEdge', node: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null, cardTranslationCollection?: { __typename?: 'CardTranslationConnection', edges: Array<{ __typename?: 'CardTranslationEdge', node: { __typename?: 'CardTranslation', id: any, text?: string | null, lang?: string | null } }> } | null, deckMembershipCollection?: { __typename?: 'DeckMembershipConnection', edges: Array<{ __typename?: 'DeckMembershipEdge', node: { __typename?: 'DeckMembership', deckId?: any | null, status: string } }> } | null, cardSeeAlsoCollection?: { __typename?: 'CardSeeAlsoConnection', edges: Array<{ __typename?: 'CardSeeAlsoEdge', node: { __typename?: 'CardSeeAlso', fromPhrase?: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null } | null, toPhrase?: { __typename?: 'CardPhrase', id: any, text: string, lang?: string | null } | null } }> } | null } }> } | null };

export type ProfileQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQueryQuery = { __typename?: 'Query', profileCollection?: { __typename?: 'ProfileConnection', edges: Array<{ __typename?: 'ProfileEdge', node: { __typename?: 'Profile', username?: string | null, languagePrimary: string, languagesSpoken: Array<string | null>, avatarUrl?: string | null } }> } | null };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserDeckInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoUserDeckCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const InsertIntoDeckMembershipCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertIntoDeckMembershipCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeckMembershipInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoDeckMembershipCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cardPhraseId"}},{"kind":"Field","name":{"kind":"Name","value":"deckId"}}]}}]}}]}}]} as unknown as DocumentNode<InsertIntoDeckMembershipCollectionMutation, InsertIntoDeckMembershipCollectionMutationVariables>;
export const AllDecksQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllDecksQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDeckCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"deckMembershipCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cardPhraseId"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllDecksQueryQuery, AllDecksQueryQueryVariables>;
export const AllPhraseDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPhraseDetailsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardPhraseCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"cardTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cardSeeAlsoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPhraseDetailsQueryQuery, AllPhraseDetailsQueryQueryVariables>;
export const AllPhraseIdsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPhraseIdsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardPhraseCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPhraseIdsQueryQuery, AllPhraseIdsQueryQueryVariables>;
export const DeckQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DeckQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserDeckFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDeckCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"deckMembershipCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cardPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"cardTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"literal"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeckQueryQuery, DeckQueryQueryVariables>;
export const LanguageDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LanguageDetailsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LanguageFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cardPhraseCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"cardTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cardSeeAlsoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LanguageDetailsQueryQuery, LanguageDetailsQueryQueryVariables>;
export const CardPhraseCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CardPhraseCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CardPhraseFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cardPhraseCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"cardTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"deckMembershipCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deckId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cardSeeAlsoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CardPhraseCollectionQuery, CardPhraseCollectionQueryVariables>;
export const ProfileQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"languagePrimary"}},{"kind":"Field","name":{"kind":"Name","value":"languagesSpoken"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProfileQueryQuery, ProfileQueryQueryVariables>;