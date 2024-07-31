'use client'

import type { DeckFull, LanguageFull, LanguageMeta } from 'types/main'
import type { QueryClient } from '@tanstack/react-query'

export function buildDeckCache(client: QueryClient, data: DeckFull): void {
  const lang = data.lang

  const all_pids = data.cards?.map(card => card.phrase_id) ?? []
  client.setQueryData(['deck', lang, 'all_pids'], all_pids)

  data.cards.forEach(card => {
    client.setQueryData(['deck', lang, 'card', card.phrase_id], card)
  })

  let meta = { ...data }
  delete meta.cards
  client.setQueryData(['deck', lang, 'meta'], meta)
  meta = null
}

export function buildLanguageCache(
  client: QueryClient,
  data: LanguageFull
): void {
  const lang = data.lang

  const all_pids = data.phrases?.map(phrase => phrase.id) ?? []
  client.setQueryData(['language', lang, 'all_pids'], all_pids)

  data.phrases.forEach(phrase => {
    client.setQueryData(['language', lang, 'phrase', phrase.id], phrase)
  })

  let meta = { ...data }
  delete meta.phrases
  client.setQueryData(['language', lang, 'meta'], meta)
  meta = null
}
