import type { PhraseFullInsert } from 'types/main'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'

export async function postInsertPhrasesFull(
  values: Array<PhraseFullInsert>
): Promise<void> | null {
  const valuesFull = values.map(v => ({ ...v, id: self.crypto.randomUUID() }))

  const phraseInserts = valuesFull.map(p => {
    return { id: p.id, text: p.text, lang: p.lang }
  })

  const { data: phraseInserted } = await supabase
    .from('phrase')
    .insert(phraseInserts)
    .select()
    .throwOnError()

  console.log(`Inserted phrases`, phraseInserted)

  // an array of phrases has an array of arrays of translations
  // loop over phrases, find translations array, and loop over them, adding pid
  // add them all to one insert array
  const translationInserts = valuesFull
    .map(phrase => {
      return phrase.translations.map(translation => ({
        ...translation,
        phrase_id: phrase.id,
      }))
    })
    .flat()
  const relationInserts = valuesFull
    .map(phrase => {
      return phrase.relation_pids.map(pid => ({
        to_phrase_id: pid,
        from_phrase_id: phrase.id,
      }))
    })
    .flat()

  // now trigger both inserts in parallel
  const translationPromise = supabase
    .from('phrase_translation')
    .insert(translationInserts)
  const relationPromise = supabase
    .from('phrase_relation')
    .insert(relationInserts)

  // wait for them both to resolve
  const [{ data: tData, error: tError }, { data: rData, error: rError }] =
    await Promise.all([translationPromise, relationPromise])

  // It's possible here to have errors AND data... which is weird...
  if (tError && rError)
    throw new Error(
      `Inserted phrases but encountered other errors: 1) "${tError.message}", 2) "${rError.message}"`
    )
  if (tError)
    throw new Error(
      `Inserted phrases and relationships but got an error inserting translations: "${tError.message}"`
    )
  if (rError)
    throw new Error(
      `Inserted phrases and translations but got an error inserting relationships: "${tError.message}"`
    )
  // we're just going to return the pids of what has changed so they can be batch-refetched
  // return phraseInserted.map(p => p.id)
  // CORRECTION we're just going to refetch all the languages
  return
}

export function useInsertPhrasesFull() {
  const client = useQueryClient()
  return useMutation({
    mutationKey: [],
    mutationFn: async (values: Array<PhraseFullInsert>) =>
      postInsertPhrasesFull(values),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['language'] })
      // refetchABatchOfPhrases(client, data)
    },
    // TODO: we will have some weirdnesses if the post happens and the phrases get inserted but
    // one of the subsequent tables fails.
    onError: () => {},
  })
}

/*
We're not doing these smart updates anymore,
... We're just refetching everything.

async function refetchABatchOfPhrases(
  client: QueryClient,
  pids: pids
): Promise<void> {
  const { data: phrasesArray } = await supabase
    .from('phrase_plus')
    .select(selects.phrase_full())
    .in('id', pids)
    .throwOnError()

  // TODO stop assuming they'll be the same; get lang from context?
  const lang = phrasesArray[0].lang
  client.invalidateQueries({ queryKey: ['lang', lang, 'loaded'] })
  return
}
*/
