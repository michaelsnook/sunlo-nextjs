'use client'

import Error from 'components/error'
import Loading from 'components/loading'
import { createContext, useContext, type ReactNode } from 'react'
import type { DeckAPIData, LanguageAPIData } from 'types/main'
import { useLangDataQuery, useDeckDataQuery } from './fetch-hook'

/*
	The context and provider contain these 4 moving parts:
  1. the context itself, which keeps track of the value (x2)
  2. the hook we export to access the context data throughout the app (x2)
  3. the useQuery which provides data to the context (x2)
	4. the provider that wraps this layout segment (just 1)
*/

const LangContext = createContext<LanguageAPIData | null>(null)
const DeckContext = createContext<DeckAPIData | null>(null)

export function useLangContext() {
  const langData = useContext(LangContext)
  if (!langData) {
    throw 'LangContext: No value provided (did you wrap the provider?)'
  }
  return langData
}

export function useDeckContext() {
  const deckData = useContext(DeckContext)
  if (!deckData) {
    throw 'DeckContext: No value provided (did you wrap the provider?)'
  }
  return deckData
}

export function AppDataProvider({
  lang,
  children,
}: {
  lang: string
  children: ReactNode
}) {
  if (typeof lang !== 'string' || lang.length !== 3)
    throw 'Error fetching the language data'

  const {
    data: langData,
    error: langError,
    isLoading: isLangLoading,
  } = useLangDataQuery(lang)
  const {
    data: deckData,
    error: deckError,
    isLoading: isDeckLoading,
  } = useDeckDataQuery(lang)

  // this will mean the database/server is unreachable
  if (langError) return <Error>{langError?.message}</Error>

  return (
    <LangContext.Provider value={langData}>
      <DeckContext.Provider value={deckData}>
        {isLangLoading || isDeckLoading ? <Loading /> : children}
      </DeckContext.Provider>
    </LangContext.Provider>
  )
}