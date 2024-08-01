import type { uuid, PhraseFull, PhraseFullInsert, UseSBQuery } from 'types/main'
import {
  type QueryClient,
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query'
import supabase from 'lib/supabase-client'

// postNewPhraseCardTranslations, but restructure
// throw error
export async function postInsertPhraseFull(
  values: PhraseFullInsert
): Promise<PhraseFull> | null {
  const pid = self.crypto.randomUUID()

  const { data: phrase, error } = await supabase
    .from('phrase')
    .insert({ id: pid, text: values.text, lang: values.lang })
    .select()
  if (error) throw error

  const translationsInsertPromise = supabase
    .from('phrase_translation')
    .insert(values.translations)

  const relationsInsertPromise = supabase
    .from('phrase_see_also')
    .insert(values.relations)
  // const cardInsertPromise = supabase.from('user_card').insert(values.card)

  const datas = await Promise.all([])

  const [
    { data: translations, error: translationsInsertError },
    { data: relations, error: relationsInsertError },
  ] = await Promise.all([translationsInsertPromise, relationsInsertPromise])

  if (translationsInsertError) throw translationsInsertError
  if (relationsInsertError) throw relationsInsertError

  return { ...phrase, translations, relations }
}

export function usePhraseFull(lang: string, pid: uuid): UseSBQuery<PhraseFull> {
  const client = useQueryClient()
  return useQuery({
    queryKey: ['lang', lang, 'phrase', pid],
    queryFn: async ({ queryKey }) => {
      const cache = client.getQueryData(queryKey)
      if (cache) return cache
      let { data, error } = await supabase
        .from('phrase')
        .select(
          `*, translations:phrase_translation(*)` // relations:phrase_relation(*)
        )
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
