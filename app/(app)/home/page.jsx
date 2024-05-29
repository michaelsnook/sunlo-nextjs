'use client'

import { useRouter } from 'next/navigation'
import { useAllDecks } from 'app/data/hooks'
import languages from 'lib/languages'

export default function Page() {
  const { data } = useAllDecks()
  const router = useRouter()

  return (
    <div className="form-control max-w-sm">
      <label className="label h2">
        Which language are you working on today?
      </label>
      <select
        onChange={event => router.push(`/home/${event.target.value}`)}
        className="select select-secondary text-base-content text-xl h-12"
      >
        <option>-- select a deck to work on --</option>
        {data?.map(deck => (
          <option key={deck.lang} value={deck.lang}>
            {languages[deck.lang]}
          </option>
        ))}
      </select>
    </div>
  )
}
