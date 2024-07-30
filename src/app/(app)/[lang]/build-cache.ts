'use client'

import type { DeckAPIData, LanguageAPIData } from 'types/main'
import type { QueryClient } from '@tanstack/react-query'

export function buildDeckCache(client: QueryClient, data: DeckAPIData) {
  const lang = data.lang

  const pids = data.user_card?.map(card => card.phrase_id) ?? []
  client.setQueryData(['deck', lang, 'all_card_pids'], pids)

  data.user_card.forEach(card => {
    client.setQueryData(['deck', lang, 'card', card.phrase_id], card)
  })
  let meta = { ...data }
  delete meta.user_card

  client.setQueryData(['deck', lang, 'meta'], meta)
}

export function buildLanguageCache(client: QueryClient, data: LanguageAPIData) {
  const lang = data.lang
  const pids = data.phrase?.map(phrase => phrase.id) ?? []
  client.setQueryData(['language', lang, 'all_pids'], pids)

  data.phrase.forEach(phrase => {
    client.setQueryData(['language', lang, 'phrase', phrase.id], phrase)
  })

  let meta = { ...data }
  delete meta.phrase

  client.setQueryData(['language', lang, 'meta'], meta)
}
