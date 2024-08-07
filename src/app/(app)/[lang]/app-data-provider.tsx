'use client'

import ShowError from 'components/show-error'
import Loading from 'components/loading'
import { createContext, useContext, type ReactNode } from 'react'
import type { DeckLoaded, LanguageLoaded } from 'types/main'
import { useDeckQuery } from './api/preload-deck'
import { useLanguageQuery } from './api/preload-language'

/*
	The context and provider contain these 4 moving parts:
  1. the context itself, which keeps track of the values (x2)
  2. the hook we export to access the context data throughout the app (x2)
  3. the useQuery which provides data to the context (x2)
	4. the provider that wraps this layout segment
*/

const LangContext = createContext<LanguageLoaded | null>(null)
const DeckContext = createContext<DeckLoaded | null>(null)

export function useLanguageContext() {
  const langData = useContext(LangContext)
  if (!langData) throw new Error(`No LangContext: did you wrap the provider?`)
  return langData
}

export function useDeckContext() {
  const deckData = useContext(DeckContext)
  // @TODO: this should probably 404?
  if (!deckData) throw new Error('No DeckContext: did you wrap the provider?')
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
    throw new Error(`This is not a valid deck name or key: "${lang}"`)

  const {
    data: langData,
    error: langError,
    isLoading: isLangLoading,
  } = useLanguageQuery(lang, (data: LanguageLoaded) => data)
  const {
    data: deckData,
    error: deckError,
    isLoading: isDeckLoading,
  } = useDeckQuery(lang, (data: DeckLoaded) => data)

  // this will mean the database/server is unreachable
  if (langError || deckError)
    return (
      <>
        <ShowError>{langError?.message}</ShowError>
        <ShowError>{deckError?.message}</ShowError>
      </>
    )

  return (
    <LangContext.Provider value={langData}>
      <DeckContext.Provider value={deckData}>
        {isLangLoading || isDeckLoading ? <Loading /> : children}
      </DeckContext.Provider>
    </LangContext.Provider>
  )
}
