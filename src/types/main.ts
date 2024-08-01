import { Database } from './supabase'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import {
  PostgrestError,
  PostgrestMaybeSingleResponse,
  PostgrestResponse,
} from '@supabase/supabase-js'

export type uuid = string

export type UseSBQuery<T> = UseQueryResult<T, PostgrestError>
export type UseSBMutation<T> = UseMutationResult<T, PostgrestError>
export type SBQuery<T> = Promise<PostgrestResponse<T>>
export type SBQuerySingle<T> = Promise<PostgrestMaybeSingleResponse<T>>
export type SBMutation<T> = Promise<PostgrestResponse<T>>
// type Tables = Database['public']['Tables']
// type Views = Database['public']['Views']

export type LanguageRow = Omit<
  Database['public']['Tables']['language']['Row'],
  'alias_of'
>
export type LanguageMeta = Database['public']['Views']['language_plus']['Row']
export type LanguageFull = LanguageMeta & {
  phrases: Array<PhraseFull>
}

export type PhraseRow = Database['public']['Tables']['phrase']['Row']
export type PhraseInsert = Database['public']['Tables']['phrase']['Insert']

export type TranslationRow =
  Database['public']['Tables']['phrase_translation']['Row']
export type TranslationInsert =
  Database['public']['Tables']['phrase_translation']['Insert']

export type RelationRow = Database['public']['Tables']['phrase_relation']['Row']
export type RelationInsert =
  Database['public']['Tables']['phrase_relation']['Insert']

export type PhraseFull = PhraseRow & {
  translations: Array<TranslationRow>
  relations: Array<RelationRow>
}
export type PhraseFullInsert = PhraseInsert & {
  translations: Array<TranslationInsert>
  relations?: Array<RelationInsert>
  // card?: CardInsert
}

export type DeckRow = Database['public']['Tables']['user_deck']['Row']
export type DeckInsert = Database['public']['Tables']['user_deck']['Insert']
export type DeckMeta = Database['public']['Views']['user_deck_plus']['Row']
export type DeckFull = DeckMeta & {
  cards?: Array<CardFull>
}

export type CardRow = Database['public']['Tables']['user_card']['Row']
export type CardMeta = Database['public']['Views']['user_card_plus']['Row']
export type CardInsert = Database['public']['Tables']['user_card']['Insert']
export type ReviewMeta = Database['public']['Views']['user_card_review_plus']
export type ReviewRow = Database['public']['Tables']['user_card_review']['Row']
export type ReviewInsert =
  Database['public']['Tables']['user_card_review']['Insert']
export type CardFull = CardMeta & {
  reviews?: Array<ReviewMeta>
}

// export type ProfilePublic = Database['public']['Views']['public_profile']['Row']
export type ProfileRow = Database['public']['Tables']['user_profile']['Row']
export type ProfileMeta = ProfileRow // Database['public']['Views']['profile_meta']['Row']
export type ProfileFull = ProfileMeta & {
  decks: Array<DeckMeta>
}

export type Profile = ProfileRow & { deck_stubs: Array<DeckMeta> }
export type PhraseStub = Database['public']['Tables']['phrase']['Row']
export type Translation =
  Database['public']['Tables']['phrase_translation']['Row']
export type DeckStub = Database['public']['Tables']['user_deck']['Row']
export type CardStub = Database['public']['Tables']['user_card']['Row']
export type UserCardInsert = Database['public']['Tables']['user_card']['Insert']
export type Review = Database['public']['Tables']['user_card_review']

// for legacy hooks and such

export type Phrase = PhraseStub & {
  see_also_phrases?: PhraseStub[]
  translations?: Translation[]
  card?: CardStub
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
  all_phrase_ids: Array<uuid>
  cards: {
    active: any[]
    learned: any[]
    skipped: any[]
  }
}

export type ReviewsCollated = {
  list: Array<Review>
  collated: Object
  keysInOrder: Array<string>
}
