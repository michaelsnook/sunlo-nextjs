import { PostgrestError } from '@supabase/supabase-js'
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
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
      let keys = []
      rows.forEach(({ to_phrase_id, from_phrase_id }) => {
        if (to_phrase_id && from_phrase_id) {
          // invalidate both sides
          if (to_phrase_id in keys === false) keys.push(to_phrase_id)
          if (from_phrase_id in keys === false) keys.push(from_phrase_id)
        }
      })
      keys.forEach(key => {
        client.invalidateQueries({
          queryKey: ['language', lang, 'phrase', key],
        })
      })
    },
  })
}
