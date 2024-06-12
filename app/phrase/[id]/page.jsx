import Link from 'next/link'
import { getAllPhraseDetails } from 'app/data/fetchers'
import TinyPhrase from 'app/components/TinyPhrase'
import languages from 'lib/languages'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  let phrases = await getAllPhraseDetails()
  return phrases.map(phrase => {
    return phrase?.lang && phrase?.text && phrase?.id
      ? {
          id: phrase.id,
        }
      : null
  })
}

export default async function Page({ params: { id } }) {
  const phrases = await getAllPhraseDetails()
  const phrase = phrases.find(p => p.id === id)
  if (!phrase) notFound()

  return (
    <main className="page-card gap-8 lg:w-[50vw] w-96">
      <div>
        <Link href={`/language/${phrase.lang}`} className="link text-primary">
          &larr; Back to {languages[phrase.lang]}
        </Link>
        <h1 className="h1 my-0">&ldquo;{phrase.text}&rdquo;</h1>
      </div>
      <div>
        <h2 className="h2">Translations</h2>
        <ul>
          {phrase?.translations?.length ? (
            phrase.translations.map(trans => (
              <li key={`translation/${trans.id}`}>
                <TinyPhrase {...trans} />
              </li>
            ))
          ) : (
            <>OOPS! No translations for this phrase</>
          )}
        </ul>
      </div>
      <div>
        <h2 className="h2 my-6">Related phrases</h2>
        <ul>
          {phrase.see_also_phrases?.length ? (
            phrase.see_also_phrases.map(p => {
              return (
                <li key={`seeAlso/${p.id}`}>
                  <TinyPhrase {...p} />
                </li>
              )
            })
          ) : (
            <p className="text-gray-600 italic">
              No related phrases to see here
            </p>
          )}
        </ul>
      </div>
    </main>
  )
}
