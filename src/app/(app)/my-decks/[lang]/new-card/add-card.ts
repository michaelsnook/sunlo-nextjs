import supabase from 'lib/supabase-client'
import { Scalars } from 'types/utils'
import { Tables } from 'types/supabase'

type UserCardInsertInput = {
  phrase_id: Scalars['UUID']
  status?: Scalars['String']
  user_deck_id: Scalars['UUID']
}

export const postNewCard = async (
  object: UserCardInsertInput
): Promise<Tables<'user_card'>> => {
  // console.log(`postNewCard`, object)
  const { data, error } = await supabase
    .from('user_card')
    .insert(object)
    .select()
  if (error) throw error

  // console.log(`postNewCard result: `, data)
  return data[0]
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

export const postNewPhraseCardTranslations = async ({
  phrase,
  translations,
  user_deck_id,
}: PhraseCardTranslationsInsertInput): Promise<
  Tables<'phrase'> & {
    translations: Tables<'phrase_translation'>[]
    card: Tables<'user_card'>
  }
> => {
  console.log(
    `postNewPhraseCardTranslations`,
    phrase,
    translations,
    user_deck_id
  )

  const { data, error } = await supabase.from('phrase').upsert(phrase).select()
  if (error) throw error

  console.log(`this is the result of the new phrase thing`, data)
  const phraseData = data[0]
  const { id: phrase_id } = phraseData

  // we have a phrase! let's use its ID to construct
  // the translations and the card
  const translationsInput: Array<TranslationInsertInput> = translations.map(
    (t): TranslationInsertInput => {
      return {
        ...t,
        phrase_id,
      }
    }
  )

  const translationsInsertPromise = supabase
    .from('phrase_translation')
    .upsert(translationsInput)
    .select()

  const cardInsertPromise = supabase
    .from('user_card')
    .upsert({ user_deck_id, phrase_id })
    .select()

  // resolve both promises in parallel
  const [
    { data: translationsInserted, error: translationsInsertError },
    { data: cardInserted, error: cardInsertError },
  ] = await Promise.all([translationsInsertPromise, cardInsertPromise])

  const result = {
    ...phraseData,
    translations: translationsInserted,
    card: cardInserted[0],
  }
  console.log(result)
  return result
}
