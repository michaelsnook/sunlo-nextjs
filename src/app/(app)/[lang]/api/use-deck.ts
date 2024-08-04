import {
  uuid,
  DeckLoaded,
  CardFull,
  CardsMap,
  pids,
  DeckMeta,
} from 'types/main'
import { useDeckQuery } from './preload-deck'
import { UseQueryResult } from '@tanstack/react-query'

export const useDeckMeta = (lang: string) =>
  useDeckQuery(
    lang,
    (data: DeckLoaded) => data.meta
  ) as UseQueryResult<DeckMeta>

export const useDeckPids = (lang: string) =>
  useDeckQuery(lang, (data: DeckLoaded) => data.pids) as UseQueryResult<pids>

export const useDeckCards = (lang: string) =>
  useDeckQuery(
    lang,
    (data: DeckLoaded) => data.cards
  ) as UseQueryResult<CardsMap>

export const useCard = (lang: string, pid: uuid) =>
  useDeckQuery(
    lang,
    (data: DeckLoaded) => data.cards[pid]
  ) as UseQueryResult<CardFull>
