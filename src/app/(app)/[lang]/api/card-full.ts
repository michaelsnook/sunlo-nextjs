import supabase from 'lib/supabase-client'
import { useQuery } from '@tanstack/react-query'

export function useCard(lang: string, pid: uuid): UseSBQuery<CardFull> {
  return useQuery({
    queryKey: ['deck', lang, 'card', pid],
    queryFn: async ({ queryKey }) => {
      let { data, error } = await supabase
        .from('user_card')
        .select('*, reviews:user_card_review(*)')
        .eq('phrase_id', queryKey[3])
      if (error) throw error
      // do we want to make sure it exists in the pids array?
      data.reviews ??= []
      return data
    },
  })
}
