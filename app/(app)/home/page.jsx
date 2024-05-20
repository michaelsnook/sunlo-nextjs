'use client'

import { useRouter } from 'next/navigation'
import { useAllDecks } from 'app/data/hooks'
import languages from 'lib/languages'

export default function Page() {
  const { data } = useAllDecks()
  const router = useRouter()

  return (
    <div className="form-control p-4 md:px-6 lg:px-10">
      <label className="label">Which language are you working on today?</label>
      <select
        onChange={event => router.push(`/home/${event.target.value}`)}
        className="select select-secondary text-base-content text-xl h-12"
      >
        {data?.map(deck => (
          <option key={deck.lang} value={deck.lang}>
            {languages[deck.lang]}
          </option>
        ))}
      </select>
    </div>
  )
}
