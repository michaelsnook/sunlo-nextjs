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
  lang: Scalars['String'];
  name: Scalars['String'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  phraseCollection?: Maybe<PhraseConnection>;
  phraseTranslationCollection?: Maybe<PhraseTranslationConnection>;
  userDeckCollection?: Maybe<UserDeckConnection>;
};


export type LanguagePhraseCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PhraseFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhraseOrderBy>>;
};


export type LanguagePhraseTranslationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PhraseTranslationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhraseTranslationOrderBy>>;
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
  lang?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type LanguageInsertInput = {
  aliasOf?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
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
  lang?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type LanguageUpdateInput = {
  aliasOf?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
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
  /** Deletes zero or more records from the `Language` collection */
  deleteFromLanguageCollection: LanguageDeleteResponse;
  /** Deletes zero or more records from the `Phrase` collection */
  deleteFromPhraseCollection: PhraseDeleteResponse;
  /** Deletes zero or more records from the `PhraseSeeAlso` collection */
  deleteFromPhraseSeeAlsoCollection: PhraseSeeAlsoDeleteResponse;
  /** Deletes zero or more records from the `PhraseTranslation` collection */
  deleteFromPhraseTranslationCollection: PhraseTranslationDeleteResponse;
  /** Deletes zero or more records from the `UserCard` collection */
  deleteFromUserCardCollection: UserCardDeleteResponse;
  /** Deletes zero or more records from the `UserDeck` collection */
  deleteFromUserDeckCollection: UserDeckDeleteResponse;
  /** Deletes zero or more records from the `UserProfile` collection */
  deleteFromUserProfileCollection: UserProfileDeleteResponse;
  /** Deletes zero or more records from the `buckets` collection */
  deleteFrombucketsCollection: BucketsDeleteResponse;
  /** Deletes zero or more records from the `migrations` collection */
  deleteFrommigrationsCollection: MigrationsDeleteResponse;
  /** Deletes zero or more records from the `objects` collection */
  deleteFromobjectsCollection: ObjectsDeleteResponse;
  /** Adds one or more `Language` records to the collection */
  insertIntoLanguageCollection?: Maybe<LanguageInsertResponse>;
  /** Adds one or more `Phrase` records to the collection */
  insertIntoPhraseCollection?: Maybe<PhraseInsertResponse>;
  /** Adds one or more `PhraseSeeAlso` records to the collection */
  insertIntoPhraseSeeAlsoCollection?: Maybe<PhraseSeeAlsoInsertResponse>;
  /** Adds one or more `PhraseTranslation` records to the collection */
  insertIntoPhraseTranslationCollection?: Maybe<PhraseTranslationInsertResponse>;
  /** Adds one or more `UserCard` records to the collection */
  insertIntoUserCardCollection?: Maybe<UserCardInsertResponse>;
  /** Adds one or more `UserDeck` records to the collection */
  insertIntoUserDeckCollection?: Maybe<UserDeckInsertResponse>;
  /** Adds one or more `UserProfile` records to the collection */
  insertIntoUserProfileCollection?: Maybe<UserProfileInsertResponse>;
  /** Adds one or more `buckets` records to the collection */
  insertIntobucketsCollection?: Maybe<BucketsInsertResponse>;
  /** Adds one or more `migrations` records to the collection */
  insertIntomigrationsCollection?: Maybe<MigrationsInsertResponse>;
  /** Adds one or more `objects` records to the collection */
  insertIntoobjectsCollection?: Maybe<ObjectsInsertResponse>;
  /** Updates zero or more records in the `Language` collection */
  updateLanguageCollection: LanguageUpdateResponse;
  /** Updates zero or more records in the `Phrase` collection */
  updatePhraseCollection: PhraseUpdateResponse;
  /** Updates zero or more records in the `PhraseSeeAlso` collection */
  updatePhraseSeeAlsoCollection: PhraseSeeAlsoUpdateResponse;
  /** Updates zero or more records in the `PhraseTranslation` collection */
  updatePhraseTranslationCollection: PhraseTranslationUpdateResponse;
  /** Updates zero or more records in the `UserCard` collection */
  updateUserCardCollection: UserCardUpdateResponse;
  /** Updates zero or more records in the `UserDeck` collection */
  updateUserDeckCollection: UserDeckUpdateResponse;
  /** Updates zero or more records in the `UserProfile` collection */
  updateUserProfileCollection: UserProfileUpdateResponse;
  /** Updates zero or more records in the `buckets` collection */
  updatebucketsCollection: BucketsUpdateResponse;
  /** Updates zero or more records in the `migrations` collection */
  updatemigrationsCollection: MigrationsUpdateResponse;
  /** Updates zero or more records in the `objects` collection */
  updateobjectsCollection: ObjectsUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromLanguageCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LanguageFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromPhraseCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PhraseFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromPhraseSeeAlsoCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PhraseSeeAlsoFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromPhraseTranslationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PhraseTranslationFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromUserCardCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserCardFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromUserDeckCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserDeckFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromUserProfileCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserProfileFilter>;
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
export type MutationInsertIntoLanguageCollectionArgs = {
  objects: Array<LanguageInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoPhraseCollectionArgs = {
  objects: Array<PhraseInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoPhraseSeeAlsoCollectionArgs = {
  objects: Array<PhraseSeeAlsoInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoPhraseTranslationCollectionArgs = {
  objects: Array<PhraseTranslationInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoUserCardCollectionArgs = {
  objects: Array<UserCardInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoUserDeckCollectionArgs = {
  objects: Array<UserDeckInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoUserProfileCollectionArgs = {
  objects: Array<UserProfileInsertInput>;
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
export type MutationUpdateLanguageCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<LanguageFilter>;
  set: LanguageUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatePhraseCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PhraseFilter>;
  set: PhraseUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatePhraseSeeAlsoCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PhraseSeeAlsoFilter>;
  set: PhraseSeeAlsoUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatePhraseTranslationCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PhraseTranslationFilter>;
  set: PhraseTranslationUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateUserCardCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserCardFilter>;
  set: UserCardUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateUserDeckCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserDeckFilter>;
  set: UserDeckUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateUserProfileCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<UserProfileFilter>;
  set: UserProfileUpdateInput;
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

export type Phrase = Node & {
  __typename?: 'Phrase';
  addedBy?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  lang: Scalars['String'];
  language?: Maybe<Language>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  phraseSeeAlsoCollection?: Maybe<PhraseSeeAlsoConnection>;
  phraseTranslationCollection?: Maybe<PhraseTranslationConnection>;
  text: Scalars['String'];
  userCardCollection?: Maybe<UserCardConnection>;
};


export type PhrasePhraseSeeAlsoCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PhraseSeeAlsoFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhraseSeeAlsoOrderBy>>;
};


export type PhrasePhraseTranslationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PhraseTranslationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhraseTranslationOrderBy>>;
};


export type PhraseUserCardCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserCardFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserCardOrderBy>>;
};

export type PhraseConnection = {
  __typename?: 'PhraseConnection';
  edges: Array<PhraseEdge>;
  pageInfo: PageInfo;
};

export type PhraseDeleteResponse = {
  __typename?: 'PhraseDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Phrase>;
};

export type PhraseEdge = {
  __typename?: 'PhraseEdge';
  cursor: Scalars['String'];
  node: Phrase;
};

export type PhraseFilter = {
  addedBy?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  lang?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  text?: InputMaybe<StringFilter>;
};

export type PhraseInsertInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type PhraseInsertResponse = {
  __typename?: 'PhraseInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Phrase>;
};

export type PhraseOrderBy = {
  addedBy?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  lang?: InputMaybe<OrderByDirection>;
  text?: InputMaybe<OrderByDirection>;
};

export type PhraseSeeAlso = Node & {
  __typename?: 'PhraseSeeAlso';
  addedBy?: Maybe<Scalars['UUID']>;
  fromPhrase?: Maybe<Phrase>;
  fromPhraseId?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  toPhrase?: Maybe<Phrase>;
  toPhraseId?: Maybe<Scalars['UUID']>;
};

export type PhraseSeeAlsoConnection = {
  __typename?: 'PhraseSeeAlsoConnection';
  edges: Array<PhraseSeeAlsoEdge>;
  pageInfo: PageInfo;
};

export type PhraseSeeAlsoDeleteResponse = {
  __typename?: 'PhraseSeeAlsoDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<PhraseSeeAlso>;
};

export type PhraseSeeAlsoEdge = {
  __typename?: 'PhraseSeeAlsoEdge';
  cursor: Scalars['String'];
  node: PhraseSeeAlso;
};

export type PhraseSeeAlsoFilter = {
  addedBy?: InputMaybe<UuidFilter>;
  fromPhraseId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  toPhraseId?: InputMaybe<UuidFilter>;
};

export type PhraseSeeAlsoInsertInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  fromPhraseId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  toPhraseId?: InputMaybe<Scalars['UUID']>;
};

export type PhraseSeeAlsoInsertResponse = {
  __typename?: 'PhraseSeeAlsoInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<PhraseSeeAlso>;
};

export type PhraseSeeAlsoOrderBy = {
  addedBy?: InputMaybe<OrderByDirection>;
  fromPhraseId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  toPhraseId?: InputMaybe<OrderByDirection>;
};

export type PhraseSeeAlsoUpdateInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  fromPhraseId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  toPhraseId?: InputMaybe<Scalars['UUID']>;
};

export type PhraseSeeAlsoUpdateResponse = {
  __typename?: 'PhraseSeeAlsoUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<PhraseSeeAlso>;
};

export type PhraseTranslation = Node & {
  __typename?: 'PhraseTranslation';
  addedBy?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  lang: Scalars['String'];
  language?: Maybe<Language>;
  literal?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  phrase?: Maybe<Phrase>;
  phraseId: Scalars['UUID'];
  text: Scalars['String'];
};

export type PhraseTranslationConnection = {
  __typename?: 'PhraseTranslationConnection';
  edges: Array<PhraseTranslationEdge>;
  pageInfo: PageInfo;
};

export type PhraseTranslationDeleteResponse = {
  __typename?: 'PhraseTranslationDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<PhraseTranslation>;
};

export type PhraseTranslationEdge = {
  __typename?: 'PhraseTranslationEdge';
  cursor: Scalars['String'];
  node: PhraseTranslation;
};

export type PhraseTranslationFilter = {
  addedBy?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  lang?: InputMaybe<StringFilter>;
  literal?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  phraseId?: InputMaybe<UuidFilter>;
  text?: InputMaybe<StringFilter>;
};

export type PhraseTranslationInsertInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  literal?: InputMaybe<Scalars['String']>;
  phraseId?: InputMaybe<Scalars['UUID']>;
  text?: InputMaybe<Scalars['String']>;
};

export type PhraseTranslationInsertResponse = {
  __typename?: 'PhraseTranslationInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<PhraseTranslation>;
};

export type PhraseTranslationOrderBy = {
  addedBy?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  lang?: InputMaybe<OrderByDirection>;
  literal?: InputMaybe<OrderByDirection>;
  phraseId?: InputMaybe<OrderByDirection>;
  text?: InputMaybe<OrderByDirection>;
};

export type PhraseTranslationUpdateInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  literal?: InputMaybe<Scalars['String']>;
  phraseId?: InputMaybe<Scalars['UUID']>;
  text?: InputMaybe<Scalars['String']>;
};

export type PhraseTranslationUpdateResponse = {
  __typename?: 'PhraseTranslationUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<PhraseTranslation>;
};

export type PhraseUpdateInput = {
  addedBy?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  lang?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type PhraseUpdateResponse = {
  __typename?: 'PhraseUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Phrase>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `buckets` */
  bucketsCollection?: Maybe<BucketsConnection>;
  /** A pagable collection of type `Language` */
  languageCollection?: Maybe<LanguageConnection>;
  /** A pagable collection of type `migrations` */
  migrationsCollection?: Maybe<MigrationsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `objects` */
  objectsCollection?: Maybe<ObjectsConnection>;
  /** A pagable collection of type `Phrase` */
  phraseCollection?: Maybe<PhraseConnection>;
  /** A pagable collection of type `PhraseSeeAlso` */
  phraseSeeAlsoCollection?: Maybe<PhraseSeeAlsoConnection>;
  /** A pagable collection of type `PhraseTranslation` */
  phraseTranslationCollection?: Maybe<PhraseTranslationConnection>;
  /** A pagable collection of type `UserCard` */
  userCardCollection?: Maybe<UserCardConnection>;
  /** A pagable collection of type `UserDeck` */
  userDeckCollection?: Maybe<UserDeckConnection>;
  /** A pagable collection of type `UserProfile` */
  userProfileCollection?: Maybe<UserProfileConnection>;
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
export type QueryPhraseCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PhraseFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhraseOrderBy>>;
};


/** The root type for querying data */
export type QueryPhraseSeeAlsoCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PhraseSeeAlsoFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhraseSeeAlsoOrderBy>>;
};


/** The root type for querying data */
export type QueryPhraseTranslationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PhraseTranslationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhraseTranslationOrderBy>>;
};


/** The root type for querying data */
export type QueryUserCardCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserCardFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserCardOrderBy>>;
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


/** The root type for querying data */
export type QueryUserProfileCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserProfileFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserProfileOrderBy>>;
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

export type UserCard = Node & {
  __typename?: 'UserCard';
  id: Scalars['UUID'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  phrase?: Maybe<Phrase>;
  phraseId: Scalars['UUID'];
  status: Scalars['String'];
  uid: Scalars['UUID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
  userDeck?: Maybe<UserDeck>;
  userDeckId: Scalars['UUID'];
  userProfile?: Maybe<UserProfile>;
};

export type UserCardConnection = {
  __typename?: 'UserCardConnection';
  edges: Array<UserCardEdge>;
  pageInfo: PageInfo;
};

export type UserCardDeleteResponse = {
  __typename?: 'UserCardDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserCard>;
};

export type UserCardEdge = {
  __typename?: 'UserCardEdge';
  cursor: Scalars['String'];
  node: UserCard;
};

export type UserCardFilter = {
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  phraseId?: InputMaybe<UuidFilter>;
  status?: InputMaybe<StringFilter>;
  uid?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  userDeckId?: InputMaybe<UuidFilter>;
};

export type UserCardInsertInput = {
  id?: InputMaybe<Scalars['UUID']>;
  phraseId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userDeckId?: InputMaybe<Scalars['UUID']>;
};

export type UserCardInsertResponse = {
  __typename?: 'UserCardInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserCard>;
};

export type UserCardOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  phraseId?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  uid?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  userDeckId?: InputMaybe<OrderByDirection>;
};

export type UserCardUpdateInput = {
  id?: InputMaybe<Scalars['UUID']>;
  phraseId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userDeckId?: InputMaybe<Scalars['UUID']>;
};

export type UserCardUpdateResponse = {
  __typename?: 'UserCardUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserCard>;
};

export type UserDeck = Node & {
  __typename?: 'UserDeck';
  id: Scalars['UUID'];
  lang?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  uid: Scalars['UUID'];
  userCardCollection?: Maybe<UserCardConnection>;
  userProfile?: Maybe<UserProfile>;
};


export type UserDeckUserCardCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserCardFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserCardOrderBy>>;
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

export type UserProfile = Node & {
  __typename?: 'UserProfile';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  languagePrimary: Scalars['String'];
  languagesSpoken: Array<Maybe<Scalars['String']>>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  uid: Scalars['UUID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
  userCardCollection?: Maybe<UserCardConnection>;
  userDeckCollection?: Maybe<UserDeckConnection>;
  username?: Maybe<Scalars['String']>;
};


export type UserProfileUserCardCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserCardFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserCardOrderBy>>;
};


export type UserProfileUserDeckCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserDeckFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserDeckOrderBy>>;
};

export type UserProfileConnection = {
  __typename?: 'UserProfileConnection';
  edges: Array<UserProfileEdge>;
  pageInfo: PageInfo;
};

export type UserProfileDeleteResponse = {
  __typename?: 'UserProfileDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserProfile>;
};

export type UserProfileEdge = {
  __typename?: 'UserProfileEdge';
  cursor: Scalars['String'];
  node: UserProfile;
};

export type UserProfileFilter = {
  avatarUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  languagePrimary?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  uid?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserProfileInsertInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  languagePrimary?: InputMaybe<Scalars['String']>;
  languagesSpoken?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserProfileInsertResponse = {
  __typename?: 'UserProfileInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserProfile>;
};

export type UserProfileOrderBy = {
  avatarUrl?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  languagePrimary?: InputMaybe<OrderByDirection>;
  uid?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
};

export type UserProfileUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  languagePrimary?: InputMaybe<Scalars['String']>;
  languagesSpoken?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserProfileUpdateResponse = {
  __typename?: 'UserProfileUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<UserProfile>;
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


export type MutationMutation = { __typename?: 'Mutation', insertIntoUserDeckCollection?: { __typename?: 'UserDeckInsertResponse', records: Array<{ __typename?: 'UserDeck', lang?: string | null, id: any }> } | null };

export type InsertIntoUserCardCollectionMutationVariables = Exact<{
  objects: Array<UserCardInsertInput> | UserCardInsertInput;
}>;


export type InsertIntoUserCardCollectionMutation = { __typename?: 'Mutation', insertIntoUserCardCollection?: { __typename?: 'UserCardInsertResponse', records: Array<{ __typename?: 'UserCard', userDeckId: any, phraseId: any, id: any, status: string }> } | null };

export type IntertIntoPhraseCollectionMutationVariables = Exact<{
  objects: Array<PhraseInsertInput> | PhraseInsertInput;
}>;


export type IntertIntoPhraseCollectionMutation = { __typename?: 'Mutation', insertIntoPhraseCollection?: { __typename?: 'PhraseInsertResponse', records: Array<{ __typename?: 'Phrase', lang: string, id: any, text: string }> } | null };

export type InsertIntoPhraseTranslationCollectionMutationVariables = Exact<{
  objects: Array<PhraseTranslationInsertInput> | PhraseTranslationInsertInput;
}>;


export type InsertIntoPhraseTranslationCollectionMutation = { __typename?: 'Mutation', insertIntoPhraseTranslationCollection?: { __typename?: 'PhraseTranslationInsertResponse', records: Array<{ __typename?: 'PhraseTranslation', phraseId: any, id: any, text: string, lang: string, literal?: string | null }> } | null };

export type AllDecksQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDecksQueryQuery = { __typename?: 'Query', userDeckCollection?: { __typename?: 'UserDeckConnection', edges: Array<{ __typename?: 'UserDeckEdge', node: { __typename?: 'UserDeck', id: any, lang?: string | null, userCardCollection?: { __typename?: 'UserCardConnection', edges: Array<{ __typename?: 'UserCardEdge', node: { __typename?: 'UserCard', id: any, status: string, phraseId: any } }> } | null } }> } | null };

export type AllPhraseDetailsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPhraseDetailsQueryQuery = { __typename?: 'Query', phraseCollection?: { __typename?: 'PhraseConnection', edges: Array<{ __typename?: 'PhraseEdge', node: { __typename?: 'Phrase', id: any, text: string, lang: string, phraseTranslationCollection?: { __typename?: 'PhraseTranslationConnection', edges: Array<{ __typename?: 'PhraseTranslationEdge', node: { __typename?: 'PhraseTranslation', id: any, text: string, lang: string } }> } | null, phraseSeeAlsoCollection?: { __typename?: 'PhraseSeeAlsoConnection', edges: Array<{ __typename?: 'PhraseSeeAlsoEdge', node: { __typename?: 'PhraseSeeAlso', fromPhrase?: { __typename?: 'Phrase', id: any, text: string, lang: string } | null, toPhrase?: { __typename?: 'Phrase', id: any, text: string, lang: string } | null } }> } | null } }> } | null };

export type AllPhraseIdsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPhraseIdsQueryQuery = { __typename?: 'Query', phraseCollection?: { __typename?: 'PhraseConnection', edges: Array<{ __typename?: 'PhraseEdge', node: { __typename?: 'Phrase', id: any } }> } | null };

export type UserDeckQueryQueryVariables = Exact<{
  filter?: InputMaybe<UserDeckFilter>;
}>;


export type UserDeckQueryQuery = { __typename?: 'Query', userDeckCollection?: { __typename?: 'UserDeckConnection', edges: Array<{ __typename?: 'UserDeckEdge', node: { __typename?: 'UserDeck', id: any, uid: any, lang?: string | null, userCardCollection?: { __typename?: 'UserCardConnection', edges: Array<{ __typename?: 'UserCardEdge', node: { __typename?: 'UserCard', id: any, status: string, phrase?: { __typename?: 'Phrase', id: any, text: string, lang: string, phraseTranslationCollection?: { __typename?: 'PhraseTranslationConnection', edges: Array<{ __typename?: 'PhraseTranslationEdge', node: { __typename?: 'PhraseTranslation', id: any, text: string, lang: string, literal?: string | null } }> } | null } | null } }> } | null } }> } | null };

export type LanguageDetailsQueryQueryVariables = Exact<{
  filter?: InputMaybe<LanguageFilter>;
}>;


export type LanguageDetailsQueryQuery = { __typename?: 'Query', languageCollection?: { __typename?: 'LanguageConnection', edges: Array<{ __typename?: 'LanguageEdge', node: { __typename?: 'Language', lang: string, name: string, phraseCollection?: { __typename?: 'PhraseConnection', edges: Array<{ __typename?: 'PhraseEdge', node: { __typename?: 'Phrase', id: any, text: string, lang: string, phraseTranslationCollection?: { __typename?: 'PhraseTranslationConnection', edges: Array<{ __typename?: 'PhraseTranslationEdge', node: { __typename?: 'PhraseTranslation', id: any, lang: string, text: string } }> } | null, phraseSeeAlsoCollection?: { __typename?: 'PhraseSeeAlsoConnection', edges: Array<{ __typename?: 'PhraseSeeAlsoEdge', node: { __typename?: 'PhraseSeeAlso', fromPhrase?: { __typename?: 'Phrase', id: any, text: string, lang: string } | null, toPhrase?: { __typename?: 'Phrase', id: any, text: string, lang: string } | null } }> } | null } }> } | null } }> } | null };

export type PhraseCollectionQueryVariables = Exact<{
  filter?: InputMaybe<PhraseFilter>;
}>;


export type PhraseCollectionQuery = { __typename?: 'Query', phraseCollection?: { __typename?: 'PhraseConnection', edges: Array<{ __typename?: 'PhraseEdge', node: { __typename?: 'Phrase', id: any, text: string, lang: string, phraseTranslationCollection?: { __typename?: 'PhraseTranslationConnection', edges: Array<{ __typename?: 'PhraseTranslationEdge', node: { __typename?: 'PhraseTranslation', id: any, text: string, lang: string } }> } | null, userCardCollection?: { __typename?: 'UserCardConnection', edges: Array<{ __typename?: 'UserCardEdge', node: { __typename?: 'UserCard', userDeckId: any, status: string } }> } | null, phraseSeeAlsoCollection?: { __typename?: 'PhraseSeeAlsoConnection', edges: Array<{ __typename?: 'PhraseSeeAlsoEdge', node: { __typename?: 'PhraseSeeAlso', fromPhrase?: { __typename?: 'Phrase', id: any, text: string, lang: string } | null, toPhrase?: { __typename?: 'Phrase', id: any, text: string, lang: string } | null } }> } | null } }> } | null };

export type UserProfileQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQueryQuery = { __typename?: 'Query', userProfileCollection?: { __typename?: 'UserProfileConnection', edges: Array<{ __typename?: 'UserProfileEdge', node: { __typename?: 'UserProfile', username?: string | null, languagePrimary: string, languagesSpoken: Array<string | null>, avatarUrl?: string | null } }> } | null };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserDeckInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoUserDeckCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const InsertIntoUserCardCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertIntoUserCardCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCardInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoUserCardCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDeckId"}},{"kind":"Field","name":{"kind":"Name","value":"phraseId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<InsertIntoUserCardCollectionMutation, InsertIntoUserCardCollectionMutationVariables>;
export const IntertIntoPhraseCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IntertIntoPhraseCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PhraseInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoPhraseCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<IntertIntoPhraseCollectionMutation, IntertIntoPhraseCollectionMutationVariables>;
export const InsertIntoPhraseTranslationCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertIntoPhraseTranslationCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objects"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PhraseTranslationInsertInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoPhraseTranslationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objects"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phraseId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"literal"}}]}}]}}]}}]} as unknown as DocumentNode<InsertIntoPhraseTranslationCollectionMutation, InsertIntoPhraseTranslationCollectionMutationVariables>;
export const AllDecksQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllDecksQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDeckCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"userCardCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"phraseId"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllDecksQueryQuery, AllDecksQueryQueryVariables>;
export const AllPhraseDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPhraseDetailsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phraseCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"phraseTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"phraseSeeAlsoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPhraseDetailsQueryQuery, AllPhraseDetailsQueryQueryVariables>;
export const AllPhraseIdsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPhraseIdsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phraseCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllPhraseIdsQueryQuery, AllPhraseIdsQueryQueryVariables>;
export const UserDeckQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserDeckQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserDeckFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDeckCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"userCardCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"phrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"phraseTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"literal"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserDeckQueryQuery, UserDeckQueryQueryVariables>;
export const LanguageDetailsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LanguageDetailsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LanguageFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languageCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phraseCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"phraseTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"phraseSeeAlsoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LanguageDetailsQueryQuery, LanguageDetailsQueryQueryVariables>;
export const PhraseCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PhraseCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PhraseFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phraseCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"phraseTranslationCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userCardCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDeckId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"phraseSeeAlsoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toPhrase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PhraseCollectionQuery, PhraseCollectionQueryVariables>;
export const UserProfileQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserProfileQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfileCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"languagePrimary"}},{"kind":"Field","name":{"kind":"Name","value":"languagesSpoken"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQueryQuery, UserProfileQueryQueryVariables>;