import { Database, Tables } from './supabase'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import {
  PostgrestError,
  PostgrestMaybeSingleResponse,
  PostgrestResponse,
} from '@supabase/supabase-js'

export type uuid = string
export type pids = Array<uuid>

export type UseSBQuery<T> = UseQueryResult<T, PostgrestError>
export type UseSBMutation<T> = UseMutationResult<T, PostgrestError>
export type SBQuery<T> = Promise<PostgrestResponse<T>>
export type SBQuerySingle<T> = Promise<PostgrestMaybeSingleResponse<T>>
export type SBMutation<T> = Promise<PostgrestResponse<T>>
// type Tables = Database['public']['Tables']
// type Views = Database['public']['Views']

export type LanguageRow = Omit<Tables<'language'>, 'alias_of'>
export type LanguageMeta = Tables<'language_plus'>
export type LanguageFetched = LanguageMeta & {
  phrases: Array<PhraseFull>
}
export type PhrasesMap = {
  [key: uuid]: PhraseFull
}
export type LanguageLoaded = {
  meta: LanguageMeta
  pids: pids
  phrases: {
    [key: string]: PhraseFull
  }
}

export type PhraseRow = Tables<'phrase'>
export type PhraseInsert = Database['public']['Tables']['phrase']['Insert']

export type TranslationRow = Tables<'phrase_translation'>
export type TranslationInsert =
  Database['public']['Tables']['phrase_translation']['Insert']

export type RelationRow = Tables<'phrase_relation'>
export type RelationInsert =
  Database['public']['Tables']['phrase_relation']['Insert']

export type PhraseMeta = Tables<'phrase_plus'>
export type PhraseFull = PhraseMeta & {
  translations: Array<TranslationRow>
}
export type PhraseFullInsert = PhraseInsert & {
  translations: Array<TranslationInsert>
  relation_pids?: pids
}

export type DeckRow = Tables<'user_deck'>
export type DeckInsert = Database['public']['Tables']['user_deck']['Insert']
export type DeckMeta = Tables<'user_deck_plus'>
export type DeckFetched = DeckMeta & {
  cards: Array<CardFull>
}
// we are not literally using a map, but maybe we should!
export type CardsMap = {
  [key: uuid]: CardFull
}
export type DeckLoaded = {
  meta: DeckMeta
  pids: pids
  cards: CardsMap
}

export type CardRow = Tables<'user_card'>
export type CardMeta = Tables<'user_card_plus'>
export type CardInsert = Database['public']['Tables']['user_card']['Insert']

export type ReviewMeta = Tables<'user_card_review_plus'>
export type ReviewRow = Tables<'user_card_review'>
export type ReviewInsert =
  Database['public']['Tables']['user_card_review']['Insert']

export type CardFull = CardMeta & {
  reviews?: Array<ReviewMeta>
}

// export type ProfilePublic = Tables<'public_profile'>
export type ProfileRow = Tables<'user_profile'>
export type ProfileMeta = ProfileRow // Tables<'profile_meta'>
export type ProfileFull = ProfileMeta & {
  decks: Array<DeckMeta>
}

export type Profile = ProfileRow & { deck_stubs: Array<DeckMeta> }
export type PhraseStub = Tables<'phrase'>
export type Translation = Tables<'phrase_translation'>
export type DeckStub = Tables<'user_deck'>
export type UserCardInsert = Database['public']['Tables']['user_card']['Insert']
export type Review = Tables<'user_card_review'>

// for legacy hooks and such

export type Phrase = PhraseStub & {
  see_also_phrases?: PhraseStub[]
  translations?: Translation[]
  card?: Tables<'user_card'>
}

export type Language = LanguageRow & {
  phrases: Array<Phrase>
  deck?: DeckStub
}

export type PhraseInsertInput = {
  id?: uuid
  lang: string
  text: string
}

export type TranslationInsertInput = {
  phrase_id: uuid
  lang: string
  text: string
  literal?: string
}

export type PhraseCardTranslationsInsertInput = {
  phrase: PhraseInsertInput
  translations: Array<{
    text: string
    lang: string
    literal: string
  }>
  user_deck_id: uuid
}

export type Deck = DeckStub & {
  pids: {
    active: pids
    learned: pids
    skipped: pids
  }
}

export type ReviewsCollated = {
  list: Array<Review>
  collated: Object
  keysInOrder: Array<string>
}
