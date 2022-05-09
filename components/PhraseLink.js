import Link from 'next/link'
import { usePhraseData } from 'lib/phrase'

export default function PhraseLink({ id }) {
  const { phrase, error } = usePhraseData(id)
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
