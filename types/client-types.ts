import { Scalars } from 'app/data/gql/graphql'

export type Translation = {
  id: Scalars['UUID']
  lang: string
  text: string
  literal: string
}

export type PhraseStub = {
  id: Scalars['UUID']
  text: string
  lang: string
}

export type Phrase = PhraseStub & {
  see_also_phrases?: PhraseStub[]
  translations?: Translation[]
  card?: CardStub
}

export type CardStub = {
  id: Scalars['UUID']
  status: string
  phrase_id: Scalars['UUID']
  deck_id: Scalars['UUID']
}

export type DeckStub = {
  id: Scalars['UUID']
  lang: string
}

type LanguageStub = {
  lang: string
  name: string
}

export type Language = LanguageStub & {
  phrases: Array<Phrase>
  deck?: DeckStub
}

