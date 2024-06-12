import Link from 'next/link'
import PhraseCardSmall from 'app/components/PhraseCardSmall'
import { getAllPhraseDetails } from 'app/data/fetchers'

export default async function Page() {
  let phrases = await getAllPhraseDetails()

  return (
    <main>
      <div className="py-10">
        <h1 className="h1">Browse all phrases in all languages</h1>
        <p>
          This page is not really useful, but it&apos;s good to have an index.
        </p>
      </div>
      {!phrases.length ? (
        <p>
          We don&apos;t have any phrases for you to learn {language.name} yet.
          But you can be the first to add one!
        </p>
      ) : (
        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4">
          {phrases?.map(phrase => (
            <li key={`/phrase/${phrase.id}`}>
              <Link href={`/phrase/${phrase.id}`}>
                <PhraseCardSmall {...phrase} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
