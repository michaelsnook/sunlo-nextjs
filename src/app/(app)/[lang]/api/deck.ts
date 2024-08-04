import { useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import { DeckInsert, DeckRow } from 'types/main'

type DeckInserts = Array<DeckInsert>
type DeckRows = Array<DeckRow>

// we can just get this from Profile
/*const fetchDeckMeta = async (lang: string) => {
  const { data } = await supabase
    .from('user_deck_plus')
    .select('*')
    .eq('lang', lang)
    .throwOnError()
  return data
}*/

// postNewDeck
async function postInsertDecks(values: DeckInserts): Promise<DeckRows> {
  const { data } = await supabase
    .from('user_deck')
    .insert(values)
    .select()
    .throwOnError()
  return data
}

// createNewDeck
function useInsertDecks() {
  const client = useQueryClient()
  return useMutation({
    // mutationKey: [],
    mutationFn: async (values: DeckInserts) => postInsertDecks(values),
    onSuccess: (data: DeckRows, _error, values: DeckInserts) => {
      // do not optimistically update because we need the user_deck_plus view
      client.invalidateQueries({ queryKey: ['user_profile'] })
      values.forEach((deck: DeckInsert) =>
        client.invalidateQueries({ queryKey: ['deck', deck.lang, 'full'] })
      )
    },
  })
}
// update deck: nope
