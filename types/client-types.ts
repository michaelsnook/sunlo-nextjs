import { Scalars } from './utils'

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

export type Profile = {
  uid: Scalars['UUID']
  username: string
  avatar_url: string
  languages_spoken: Array<string>
  language_primary: string
  user_deck?: Array<DeckStub>
}

// count_all: number
// count_active: number
// count_learned: number
// count_skipped: number

export type Deck = DeckStub & {
  all_phrase_ids: Array<Scalars['UUID']>
  cards: {
    active: any[]
    learned: any[]
    skipped: any[]
  }
}
