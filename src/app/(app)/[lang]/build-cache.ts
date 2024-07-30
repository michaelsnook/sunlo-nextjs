'use client'

import type { DeckAPIData, LanguageAPIData } from 'types/main'
import type { QueryClient } from '@tanstack/react-query'

export function buildDeckCache(client: QueryClient, data: DeckAPIData) {
  const lang: string = data.lang

  const pids = data.user_card?.map(card => card.phrase_id) ?? []
  client.setQueryData(['deck', lang, 'all_card_pids'], pids)

  data.user_card.forEach(card => {
    client.setQueryData(['deck', lang, 'user_card', card.phrase_id], card)
  })
  delete data.user_card

  client.setQueryData(['deck', lang, 'meta'], data)
}

export function buildLanguageCache(client: QueryClient, data: LanguageAPIData) {
  const lang: string = data.lang

  const pids = data.phrase?.map(phrase => phrase.id) ?? []
  client.setQueryData(['language', lang, 'all_pids'], pids)

  data.phrase.forEach(phrase => {
    client.setQueryData(['language', lang, 'phrase', phrase.id], phrase)
  })
  delete data.phrase

  client.setQueryData(['language', lang, 'meta'], data)
}
