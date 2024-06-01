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
    <div className="form-control max-w-sm flex flex-col gap-4">
      <label className="label h2">
        Which language are you working on today?
      </label>
      {reviews?.keysInOrder?.map(lang => (
        <div key={lang} className="hover:glass p-2 rounded">
          <Link href={`home/${lang}`}>
            <p className="text-xl">{languages[lang]}</p>
            <p>{reviews?.collated[lang].length} reviews</p>
            <p>
              Last reviewed on{' '}
              {reviews?.collated[lang][0]?.created_at?.split('T')[0]}
            </p>
          </Link>
        </div>
      ))}
      <p className="my-4">Or start your first review for these:</p>
      <ol>
        {remainingDecks?.map(lang => (
          <li key={lang} className="hover:link my-2">
            <Link href={`/home/${lang}`}>{languages[lang]}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
