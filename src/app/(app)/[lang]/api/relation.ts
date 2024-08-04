import { PostgrestError } from '@supabase/supabase-js'
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
// import { prependItem } from 'lib/utils'
import { RelationInsert, RelationRow } from 'types/main'

// Skip the use hook and fethcer bc we access this through PhraseFull
// Skip the optimistic update because we will just refetch the PhraseFull

export function useInsertRelation(
  lang: string
): UseMutationResult<Array<RelationRow>, PostgrestError> {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (values: RelationInsert) => {
      // supports multiple inserts
      const { data, error } = await supabase
        .from('phrase_relation')
        .insert(values)
        .select()
      if (error) throw error
      return data
    },
    onSuccess: (rows: Array<RelationRow>) => {
      client.invalidateQueries()

      /* make a map with {
        [pid]: Array<uuid>
      } of all the relations to add to all of which cards
      let pidsMap = {}
      rows.forEach(({ to_phrase_id, from_phrase_id }) => {
        if (!to_phrase_id || !from_phrase_id) return
        pidsMap[from_phrase_id] ??= []
        pidsMap[to_phrase_id] ??= []
        prependItem(to_phrase_id, pidsMap[from_phrase_id])
        prependItem(from_phrase_id, pidsMap[to_phrase_id])
      })

      client.setQueryData(
        // TODO how do we access the lang from this context :D
        ['language', lang],
        (prev: LanguageLoaded) => {
          return
        }
      )*/
    },
  })
}
