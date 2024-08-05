'use client'

import ShowError from 'components/show-error'
import Loading from 'components/loading'
import { createContext, useContext, type ReactNode } from 'react'
import type { DeckLoaded, LanguageLoaded, uuid } from 'types/main'
import { useDeckQuery } from './api/preload-deck'
import { useLanguageQuery } from './api/preload-language'
import { useParams } from 'next/navigation'
import { UseQueryResult } from '@tanstack/react-query'

/*
	The context and provider contain these 4 moving parts:
  1. the context itself, which keeps track of the values (x2)
  2. the hook we export to access the context data throughout the app (x2)
  3. the useQuery which provides data to the context (x2)
	4. the provider that wraps this layout segment
*/

const LanguageContext = createContext<LanguageLoaded | null>(null)
const DeckContext = createContext<DeckLoaded | null>(null)

export function useLanguageContext() {
  const langData = useContext(LanguageContext)
  if (!langData)
    throw new Error(`No LanguageContext: did you wrap the provider?`)
  return langData
}

export function useLanguageMeta() {
  return useLanguageContext()?.meta
}
export function useLanguagePids() {
  return useLanguageContext()?.pids
}
export function useLanguagePhrases() {
  return useLanguageContext()?.phrases
}
export function useLanguagePhrase(pid: uuid) {
  return useLanguageContext()?.phrases[pid]
}

export function useDeckContext() {
  const deckData = useContext(DeckContext)
  // @TODO: this should probably 404?
  if (!deckData) throw new Error('No DeckContext: did you wrap the provider?')
  return deckData
}

export function useDeckMeta() {
  return useDeckContext()?.meta
}
export function useDeckPids() {
  return useDeckContext()?.pids
}
export function useDeckCards() {
  return useDeckContext()?.cards
}
export function useDeckCard(pid: uuid) {
  return useDeckContext()?.cards[pid]
}

export function useLang() {
  return useParams<{ lang: string }>()?.lang
}

export function AppDataProvider({
  lang,
  children,
}: {
  lang: string
  children: ReactNode
}) {
  if (typeof lang !== 'string' || lang.length !== 3)
    throw new Error(`This is not a valid deck name or key: "${lang}"`)

  const {
    data: langData,
    error: langError,
    isLoading: isLangLoading,
  } = useLanguageQuery() as UseQueryResult<LanguageLoaded>
  const {
    data: deckData,
    error: deckError,
    isLoading: isDeckLoading,
  } = useDeckQuery() as UseQueryResult<DeckLoaded>

  // this will mean the database/server is unreachable
  if (langError || deckError)
    return (
      <>
        <ShowError>{langError?.message}</ShowError>
        <ShowError>{deckError?.message}</ShowError>
      </>
    )

  return (
    <LanguageContext.Provider value={langData}>
      <DeckContext.Provider value={deckData}>
        {isLangLoading || isDeckLoading ? <Loading /> : children}
      </DeckContext.Provider>
    </LanguageContext.Provider>
  )
}
