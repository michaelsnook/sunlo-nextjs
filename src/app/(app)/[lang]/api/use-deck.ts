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

export const useDeckMeta = (lang?: string) =>
  useDeckQuery({
    select: (data: DeckLoaded) => data.meta,
    lang,
  }) as UseQueryResult<DeckMeta>

export const useDeckPids = (lang?: string) =>
  useDeckQuery({
    select: (data: DeckLoaded) => data.pids,
    lang,
  }) as UseQueryResult<pids>

export const useDeckCards = (lang?: string) =>
  useDeckQuery({
    select: (data: DeckLoaded) => data.cards,
    lang,
  }) as UseQueryResult<CardsMap>

export const useCard = (pid: uuid, lang?: string) =>
  useDeckQuery({
    select: (data: DeckLoaded) => data.cards[pid],
    lang,
  }) as UseQueryResult<CardFull>
