import Link from 'next/link'
import useSWR from 'swr'
import { getFullPhraseData } from 'lib/deck'

export default function PhraseLink({ id, text, lang }) {
  const { data: phrase, error } = text
    ? { data: { text, lang } }
    : useSWR({ id, type: 'phrase' }, getFullPhraseData)
  console.log('Props 5,', phrase ?? '')
  return error ? (
    <p>{JSON.stringify(error)}</p>
  ) : (
    <Link href={`/phrases/${id}`}>
      <a className="my-2 link-hover text-primary">
        {phrase ? (
          <>
            <span className="badge badge-outline badge-primary">
              {phrase.lang}
            </span>{' '}
            <span className="italic">"{phrase.text}"</span>
          </>
        ) : (
          <>Card {id}</>
        )}
      </a>
    </Link>
  )
}
