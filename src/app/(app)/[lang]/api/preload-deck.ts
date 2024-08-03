import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import type {
  DeckPrefetch,
  DeckLoaded,
  CardFull,
  UseSBQuery,
  uuid,
} from 'types/main'
import { selects } from 'lib/utils'
import supabase from 'lib/supabase-client'

async function prefetchDeck(lang: string): Promise<DeckPrefetch> {
  const { data } = await supabase
    .from('user_deck_plus')
    .select(selects.deck_full())
    .eq('lang', lang)
    .maybeSingle()
    .throwOnError()
  return data
}

function transformDeckPrefetchToLoaded(data: DeckPrefetch): DeckLoaded {
  const { cards: _, ...meta } = data
  const all_pids: Array<uuid> = (data.cards || [])?.map(c => c.phrase_id)
  const cards: Array<CardFull> = [...data.cards]
  return {
    meta,
    all_pids,
    cards,
  }
}

export function useDeckPreload(lang: string): UseSBQuery<DeckLoaded> {
  const client = useQueryClient()
  return useQuery({
    queryKey: ['deck', lang, 'full'],
    queryFn: async ({ queryKey }): Promise<DeckPrefetch | null | any> => {
      const data: DeckPrefetch = await prefetchDeck(queryKey[1])
      const result: DeckLoaded = transformDeckPrefetchToLoaded(data)
      populateDeckCache(result, client)

      return result
    },
    enabled: typeof lang === 'string' && lang.length === 3,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}

function populateDeckCache(
  { meta, all_pids, cards }: DeckLoaded,
  client: QueryClient
): void {
  client.setQueryData(['deck', meta.lang, 'all_pids'], all_pids)
  cards.forEach(card => {
    client.setQueryData(['deck', meta.lang, 'card', card.phrase_id], card)
  })
  client.setQueryData(['deck', meta.lang, 'meta'], meta)
  return
}
