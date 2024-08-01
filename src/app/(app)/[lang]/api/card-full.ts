import supabase from 'lib/supabase-client'
import { useQuery } from '@tanstack/react-query'
import type { uuid, UseSBQuery, CardFull } from 'types/main'

export function useCard(lang: string, pid: uuid): UseSBQuery<CardFull> {
  return useQuery({
    queryKey: ['deck', lang, 'card', pid],
    queryFn: async ({ queryKey }) => {
      let { data, error } = await supabase
        .from('user_card_plus')
        .select('*, reviews:user_card_review(*)')
        .eq('phrase_id', queryKey[3])
      if (error) throw error
      return data
    },
  })
}
