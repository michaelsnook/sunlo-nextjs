import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import type { DeckMeta, DeckFull, UseSBQuery } from 'types/main'
import { selects } from 'lib/utils'
import supabase from 'lib/supabase-client'

export function useDeck(lang: string): UseSBQuery<DeckMeta> {
  return useQuery({
    queryKey: ['deck', lang, 'meta'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await supabase
        .from('user_deck_plus')
        .select('*')
        .eq('lang', queryKey[1])
      if (error) throw error
      // do we want to make sure it exists in the profile decks array
      return data
    },
  })
}

export function useDeckPreload(lang: string) {
  const client = useQueryClient()
  return useQuery({
    queryKey: ['deck', lang, 'full'],
    queryFn: async ({ queryKey }): Promise<DeckFull | null | any> => {
      const { data, error } = await supabase
        .from('user_deck_plus')
        .select(selects.deck_full())
        .eq('lang', queryKey[1])
        .maybeSingle()
      if (error) throw error
      const data2 = data
      console.log(`Data structure data2 is`, data2)
      buildDeckCache(client, data)
      return data
    },
    enabled: typeof lang === 'string' && lang.length === 3,
  })
}

export function buildDeckCache(client: QueryClient, data: DeckFull) {
  const lang = data.lang

  const all_pids = data.cards?.map(card => card.phrase_id) ?? []
  client.setQueryData(['deck', lang, 'all_pids'], all_pids)

  data.cards.forEach(card => {
    client.setQueryData(['deck', lang, 'card', card.phrase_id], card)
  })

  let meta = { ...data, cards: null }
  delete meta.cards
  client.setQueryData(['deck', lang, 'meta'], meta)
  meta = null
}
