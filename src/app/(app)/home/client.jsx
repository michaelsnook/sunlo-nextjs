'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useProfile, useRecentReviewActivity } from 'app/data/hooks'
import languages from 'lib/languages'
import Loading from 'components/loading'

export default function Client() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile()
  const { data: reviews, isLoading: isLoadingReviews } =
    useRecentReviewActivity()
  // console.log(`This is the profile and reviews objects`, profile, reviews)

  const [activeDecks, remainingDecks] = useMemo(() => {
    if (isLoadingProfile || isLoadingReviews) return [[], []]
    const actives = reviews?.keysInOrder ?? []
    return [
      actives,
      profile.deck_stubs
        .filter(d => !actives?.includes(d.lang) ?? false)
        .sort((left, right) => {
          // the deck that was updated more recently sorts first
          return left?.updated_at === right?.updated_at
            ? 0
            : left?.updated_at > right?.updated_at
              ? -1
              : 1
        })
        .map(d => d.lang),
    ]
  }, [profile, reviews, isLoadingProfile, isLoadingReviews])

  return isLoadingProfile || isLoadingReviews ? (
    <Loading />
  ) : (
    <ol>
      {[...activeDecks, ...remainingDecks]?.map(lang => (
        <li key={lang} className="glass my-2 rounded p-2 text-center">
          <Link href={`home/${lang}`}>
            <p className="py-2 text-xl">{languages[lang]}</p>
          </Link>
        </li>
      ))}
    </ol>
  )
}
