import { Scalars } from './utils'
import { Database } from './supabase'

type LanguageStub = Omit<
  Database['public']['Tables']['language']['Row'],
  'alias_of'
>
type PhraseStub = Database['public']['Tables']['phrase']['Row']
type Translation = Database['public']['Tables']['phrase_translation']['Row']
type DeckStub = Database['public']['Tables']['user_deck']['Row']
type DeckPlus = Database['public']['Views']['user_deck_plus']['Row']
type CardStub = Database['public']['Tables']['user_card']['Row']
type UserCardInsert = Database['public']['Tables']['user_card']['Insert']
type Review = Database['public']['Tables']['user_card_review']

type Phrase = PhraseStub & {
  see_also_phrases?: PhraseStub[]
  translations?: Translation[]
  card?: CardStub
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

type Deck = DeckStub & {
  all_phrase_ids: Array<Scalars['UUID']>
  cards: {
    active: any[]
    learned: any[]
    skipped: any[]
  }
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
