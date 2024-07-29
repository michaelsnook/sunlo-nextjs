'use client'

import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import Error from 'components/error'
import Loading from 'components/loading'
import supabase from 'lib/supabase-client'
import { createContext, useContext, type ReactNode } from 'react'
import { UseAPIQuery, LanguageData } from 'types/main'

/*
	The context and provider contain these 4 moving parts:
  1. the context itself, which keeps track of the value
  2. the hook we export to access the context data throughout the app
  3. the useQuery which provides data to the context
	4. the provider that wraps this layout segment
*/

const LangContext = createContext<LanguageData | null>(null)

export function useLangContext() {
  const langData = useContext(LangContext)
  if (!langData) {
    throw 'LangContext: No value provided'
  }
  return langData
}

export async function fetchPublicLanguageData(
  lang: string
): Promise<PostgrestSingleResponse<LanguageData>> {
  return supabase
    .from('language_plus')
    .select('*, phrase(*)')
    .eq('lang', lang)
    .maybeSingle()
}

function useLangDataQuery(lang: string): UseAPIQuery<LanguageData> {
  return useQuery({
    queryKey: ['language', lang, 'meta'],
    queryFn: async ({ queryKey }) => {
      const { data, error } = await fetchPublicLanguageData(queryKey[1])
      if (error) throw error
      console.log(`In the fetcher function, returnin' your data`, data, error)
      return data
    },
    enabled: typeof lang === 'string' && lang.length === 3,
  })
}

export function LangContextProvider({
  lang,
  children,
}: {
  lang: string
  children: ReactNode
}) {
  if (typeof lang !== 'string' || lang.length !== 3)
    throw 'Error fetching the language data'

  const { data, error, isLoading } = useLangDataQuery(lang)

  if (isLoading) return <Loading />
  if (error) return <Error>{error?.message}</Error>

  return <LangContext.Provider value={data}>{children}</LangContext.Provider>
}
