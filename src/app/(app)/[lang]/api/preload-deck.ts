import { useQuery } from '@tanstack/react-query'
import type { CardsMap, DeckFetched, DeckLoaded, pids } from 'types/main'
import { mapArray, selects } from 'lib/utils'
import supabase from 'lib/supabase-client'
import { useLang } from '../app-data-provider'

async function fetchDeck(lang: string): Promise<DeckLoaded> {
  const { data } = await supabase
    .from('user_deck_plus')
    .select(selects.deck_full())
    .eq('lang', lang)
    .maybeSingle()
    .throwOnError()
  const { cards: cardsArray, ...meta }: DeckFetched = data
  const pids: pids = cardsArray?.map(c => c.phrase_id)
  const cards: CardsMap = mapArray(cardsArray, 'phrase_id')
  return {
    meta,
    pids,
    cards,
  }
}

export function useDeckQuery(
  {
    select = undefined,
    lang: altLang,
  }: {
    select?: any
    lang?: string
  } = { select: undefined, lang: null }
) {
  const paramLang = useLang()
  const lang = altLang || paramLang
  return useQuery({
    queryKey: ['deck', lang, 'loaded'],
    queryFn: () => {
      return fetchDeck(lang)
    },
    select,
    enabled: typeof lang === 'string' && lang.length === 3,
    gcTime: 120_000,
    staleTime: 120_000,
    refetchOnWindowFocus: false,
  })
}

// access specific data paths directly:
// const deckMeta = useDeckData()?.meta
// const card = useDeckData()?.cards[pid]
export function useDeckData(lang = '') {
  return useDeckQuery({ lang })?.data
}
