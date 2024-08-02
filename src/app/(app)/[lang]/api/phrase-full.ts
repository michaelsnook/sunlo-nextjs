import type {
  uuid,
  PhraseFullInsert,
  UseSBQuery,
  NewPhraseFull,
} from 'types/main'
import {
  type QueryClient,
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { collateArray, selects } from 'lib/utils'

// postNewPhraseCardTranslations, but restructure
// throw error

export async function postInsertPhraseFull(
  values: Array<PhraseFullInsert>
): Promise<Array<uuid>> | null {
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
      return phrase.relations.map(relation => ({
        ...relation,
        phrase_id: phrase.id,
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
  return phraseInserted.map(p => p.id)
}

export function usePhraseFull(
  lang: string,
  pid: uuid
): UseSBQuery<NewPhraseFull> {
  const client = useQueryClient()
  return useQuery({
    queryKey: ['lang', lang, 'phrase', pid],
    queryFn: async ({ queryKey }) => {
      const cache = client.getQueryData(queryKey)
      if (cache) return cache
      let { data, error } = await supabase
        .from('phrase_plus')
        .select(selects.phrase_full())
        .eq('id', pid)
        .maybeSingle()
      if (error) throw error
      data.translations ??= []
      return data
    },
  })
}

function cachePhraseFull(phrase: PhraseFull, client: QueryClient): void {
  if (!phrase && phrase.relations && phrase.translations) return

  client.setQueryData(['lang', phrase.lang, 'pid', phrase.id], phrase)

  client.setQueryData(
    ['lang', phrase.lang, 'all_pids'],
    (allPids: Array<uuid>) => {
      if (phrase.id in allPids) return undefined
      return [phrase.id, ...allPids]
    }
  )

  // invalidate the metadata in case the phrase change alters it
  client.invalidateQueries({ queryKey: ['lang', phrase.lang, 'meta'] })
}

// current is addCardPhrase
export function useInsertPhraseFull() {
  const client = useQueryClient()
  return useMutation({
    mutationKey: [],
    mutationFn: async values => await postPhraseInsert(values),
    onSuccess: data => {
      cachePhraseFull(data)
    },
  })
}
