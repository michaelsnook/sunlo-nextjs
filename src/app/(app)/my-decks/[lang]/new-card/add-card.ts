import supabase from 'lib/supabase-client'
import type { Tables } from 'types/supabase'
import type {
  UserCardInsert,
  TranslationInsertInput,
  PhraseCardTranslationsInsertInput,
} from 'types/main'

export const postNewCard = async (
  object: UserCardInsert & { status: string; phrase_id: string }
) => {
  // console.log(`postNewCard`, object)
  const { data, error } = await supabase
    .from('user_card')
    .insert(object)
    .select()
  if (error) throw error

  // console.log(`postNewCard result: `, data)
  return data[0]
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
