import { QueryKey, UseQueryResult, useQuery } from '@tanstack/react-query'
import type { DeckFetched, DeckLoaded, pids } from 'types/main'
import { mapArray, selects } from 'lib/utils'
import supabase from 'lib/supabase-client'

async function fetchDeck(lang: string): Promise<DeckFetched> {
  const { data } = await supabase
    .from('user_deck_plus')
    .select(selects.deck_full())
    .eq('lang', lang)
    .maybeSingle()
    .throwOnError()
  return data
}

function transformDeckFetchedToLoaded({
  cards: cardsArray = [],
  ...meta
}: DeckFetched): DeckLoaded {
  const pids: pids = cardsArray?.map(c => c.phrase_id)
  const cards = mapArray(cardsArray, 'phrase_id')
  return {
    meta,
    pids,
    cards,
  }
}

export function useDeckQuery(
  lang: string,
  select = null
): UseQueryResult<DeckLoaded> {
  return useQuery<DeckLoaded>({
    queryKey: ['deck', lang, 'loaded'],
    queryFn: async ({
      queryKey,
    }: {
      queryKey: QueryKey
    }): Promise<DeckFetched | null | any> => {
      const lang = queryKey[1] as string
      const data: DeckFetched = await fetchDeck(lang)
      const result: DeckLoaded = transformDeckFetchedToLoaded(data)
      return result
    },
    select,
    enabled: typeof lang === 'string' && lang.length === 3,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
