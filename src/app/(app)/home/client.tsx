'use client'

import Link from 'next/link'
import { useProfile } from 'app/data/hooks'
import languages from 'lib/languages'
import Loading from 'components/loading'

export default function Client() {
  const { data: profile, isPending } = useProfile()

  return isPending ?
      <Loading />
    : <ol>
        {profile.deckLanguages?.map(lang => (
          <li key={lang} className="glass my-2 rounded p-2 text-center">
            <Link href={`home/${lang}`}>
              <p className="py-2 text-xl">{languages[lang]}</p>
            </Link>
          </li>
        ))}
      </ol>
}
