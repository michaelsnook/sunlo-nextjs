'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useProfile } from 'app/data/hooks'
import languages from 'lib/languages'
import supabase from 'lib/supabase-client'
import Loading from 'app/loading'

const collateArray = (data, key) => {
  let result = {}
  for (let i in data) {
    let item = data[i]
    let itemKey = item[key]
    if (Array.isArray(result[itemKey])) result[itemKey].push(item)
    else result[itemKey] = [item]
  }
  return result
}

const useRecentReviewActivity = () => {
  return useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_card_review_plus')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error

      const result = collateArray(data, 'lang')
      console.log(`The collated array`, result)

      return {
        list: data,
        collated: result,
        keysInOrder: Object.keys(result),
      }
    },
  })
}

export default function Page() {
  const { data: profile, isLoading } = useProfile()
  const { data: reviews, error } = useRecentReviewActivity()
  const activeDecks = reviews?.keysInOrder

  console.log(`This is the profile and reviews objects`, profile, reviews)
  const remainingDecks = useMemo(() => {
    if (!profile?.deck_stubs?.length) return null
    return profile.deck_stubs
      .filter(d => !reviews?.keysInOrder?.includes(d.lang) ?? false)
      .sort((left, right) => {
        // the deck that was updated more recently sorts first
        return left?.updated_at === right?.updated_at
          ? 0
          : left?.updated_at > right?.updated_at
          ? -1
          : 1
      })
      .map(d => d.lang)
  }, [profile, reviews])

  return isLoading ? (
    <Loading />
  ) : (
    <div className="form-control max-w-sm flex flex-col gap-4 p-2">
      <label className="label h2 text-center">Continue learning...</label>
      {[...activeDecks, ...remainingDecks]?.map(lang => (
        <div key={lang} className="glass p-2 rounded text-center">
          <Link href={`home/${lang}`}>
            <p className="text-xl py-2">{languages[lang]}</p>
          </Link>
        </div>
      ))}
      <div className="mx-auto">
        <Link href={`/my-decks/new`}>
          <span className="btn btn-ghost">+ Start a new language</span>
        </Link>
      </div>
    </div>
  )
}
