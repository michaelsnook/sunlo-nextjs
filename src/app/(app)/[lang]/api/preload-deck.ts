import {
  useQuery,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query'
import type { uuid, UseSBQuery, DeckPrefetch, DeckLoaded } from 'types/main'
import { mapArray, selects } from 'lib/utils'
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

function transformDeckPrefetchToLoaded({
  cards = [],
  ...meta
}: DeckPrefetch): DeckLoaded {
  const all_pids: Array<uuid> = cards?.map(c => c.phrase_id)
  const card = mapArray(cards, 'phrase_id')
  return {
    meta,
    all_pids,
    card,
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
  { meta, all_pids, card }: DeckLoaded,
  client: QueryClient
): void {
  client.setQueryData(['deck', meta.lang, 'meta'], meta)
  client.setQueryData(['deck', meta.lang, 'all_pids'], all_pids)
  // for now let's just stash both and see which one is more useful!
  client.setQueryData(['deck', meta.lang, 'cards'], card)
  all_pids.forEach(pid => {
    client.setQueryData(['deck', meta.lang, 'card', pid], card[pid])
  })

  return
}
