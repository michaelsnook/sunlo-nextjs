'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'

export async function loadLanguage({ queryKey }: { queryKey: Array<string> }) {
  console.log(`fetching the language:`, queryKey[1])
  const { data, error } = await supabase
    .from('language')
    .select('*, phrase(*, phrase_translation(*))')
    .eq('lang', queryKey[1])
  if (error) throw error
  return data
}

export function useLanguage(lang: string) {
  console.log(`running useLanguage:`, lang)
  // @ts-ignore
  return useQuery({ queryKey: ['language', lang], queryFn: loadLanguage })
}

export default function Loader({ lang }) {
  const queryClient = useQueryClient()
  // @ts-ignore
  queryClient.prefetchQuery({
    queryKey: ['language', lang],
    queryFn: key => {
      console.log(`triggering queryFn in prefetch:`, key)
      return loadLanguage(key)
    },
  })
  return <></>
}
