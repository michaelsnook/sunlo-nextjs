import { Scalars } from './utils'
import { Database } from './supabase'

type UserCardInsert = Database['public']['Tables']['user_card']['Insert']

type Translation = {
  id: Scalars['UUID']
  lang: string
  text: string
  literal: string
}

type PhraseStub = {
  id: Scalars['UUID']
  text: string
  lang: string
}

type Phrase = PhraseStub & {
  see_also_phrases?: PhraseStub[]
  translations?: Translation[]
  card?: CardStub
}

type CardStub = {
  id: Scalars['UUID']
  status: string
  phrase_id: Scalars['UUID']
  deck_id: Scalars['UUID']
}

type DeckStub = {
  id: Scalars['UUID']
  created_at?: string
  lang: string
}

type DeckPlus = DeckStub & {
  cards_learned: number
  cards_active: number
  cards_skipped: number
  lang_total_phrases: number | null
  most_recent_review: string | null
}

type LanguageStub = {
  lang: string
  name: string
}

type Language = LanguageStub & {
  phrases: Array<Phrase>
  deck?: DeckStub
}

type Profile = {
  uid: Scalars['UUID']
  username: string
  avatar_url: string
  languages_spoken: Array<string>
  language_primary: string
  deck_stubs?: Array<DeckStub>
}

// count_all: number
// count_active: number
// count_learned: number
// count_skipped: number

type Deck = DeckStub & {
  all_phrase_ids: Array<Scalars['UUID']>
  cards: {
    active: any[]
    learned: any[]
    skipped: any[]
  }
}

type Review = {
  id: Scalars['UUID']
  created_at: string
  card_id: Scalars['UUID']
  score: number
  lang: string
}

type ReviewsCollated = {
  list: Array<Review>
  collated: Object
  keysInOrder: Array<string>
}

export type {
  UserCardInsert,
  Translation,
  PhraseStub,
  Phrase,
  CardStub,
  DeckStub,
  DeckPlus,
  Language,
  Profile,
  Deck,
  Review,
  ReviewsCollated,
}
