'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useProfile, useRecentReviewActivity } from 'app/data/hooks'
import languages from 'lib/languages'
import Loading from 'app/loading'

export default function Page() {
  const { data: profile, isLoading } = useProfile()
  const { data: reviews, error } = useRecentReviewActivity()
  const activeDecks = reviews?.keysInOrder ?? []

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
