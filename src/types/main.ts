import { Scalars } from './utils'
import { Database } from './supabase'
import { UseQueryResult } from '@tanstack/react-query'
import { PostgrestError } from '@supabase/supabase-js'

type UseAPIQuery<T> = UseQueryResult<T, PostgrestError>

type LanguageStub = Omit<
  Database['public']['Tables']['language']['Row'],
  'alias_of'
>
type LanguagePlus = Database['public']['Views']['language_plus']['Row']
type PhraseStub = Database['public']['Tables']['phrase']['Row']
type LanguageAPIData = LanguagePlus & { phrase: Array<PhraseStub> }
type DeckAPIData = DeckPlus & { user_card: Array<CardStub> }
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

type PhraseInsertInput = {
  id?: Scalars['UUID']
  lang: string
  text: string
}

type TranslationInsertInput = {
  phrase_id: Scalars['UUID']
  lang: string
  text: string
  literal?: string
}

type PhraseCardTranslationsInsertInput = {
  phrase: PhraseInsertInput
  translations: Array<{
    text: string
    lang: string
    literal: string
  }>
  user_deck_id: Scalars['UUID']
}

type Profile = {
  uid: Scalars['UUID']
  username: string
  avatar_url: string
  languages_spoken: Array<string>
  language_primary: string
  deck_stubs: Array<DeckPlus>
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
  UseAPIQuery,
  Language,
  LanguagePlus,
  LanguageAPIData,
  PhraseInsertInput,
  PhraseStub,
  Phrase,
  TranslationInsertInput,
  PhraseCardTranslationsInsertInput,
  UserCardInsert,
  Translation,
  CardStub,
  DeckStub,
  Deck,
  DeckAPIData,
  DeckPlus,
  Profile,
  Review,
  ReviewsCollated,
}
