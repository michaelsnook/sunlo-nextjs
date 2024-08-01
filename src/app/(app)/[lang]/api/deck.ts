import { useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { DeckInsert, DeckMeta } from 'types/main'
// postNewDeck
async function postInsertDeck(values: DeckInsert) {
  const { data, error } = await supabase.from('user_deck').insert(values)
  if (error) throw error
  return data
}

// createNewDeck
function useInsertDeck() {
  const client = useQueryClient()
  return useMutation({
    // mutationKey: [],
    mutationFn: async (values: DeckInsert) => postInsertDeck(values),
    onSuccess: (data, _error, values: DeckInsert) => {
      // do not optimistically update because we need the user_deck_plus view
      client.invalidateQueries({ queryKey: ['user_profile'] })
      client.invalidateQueries({ queryKey: ['deck', values.lang, 'meta'] })
    },
  })
}
// update deck: nope
