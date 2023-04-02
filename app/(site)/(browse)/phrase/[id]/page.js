import Link from 'next/link'
import { getOnePhraseDetails, getAllPhraseDetails } from 'app/data/fetchers'
import { TinyPhrase } from 'app/components/PhraseCardSmall'
import languages from 'lib/languages'

export async function generateStaticParams() {
  let edges = await getAllPhraseDetails()
  return edges.map(edge => ({
    id: edge.node.id,
  }))
}

export default async function Page({ params }) {
  let phrase = await getOnePhraseDetails(params.id)
  const translations = phrase.phraseTranslationCollection?.edges
  const seeAlso = phrase.phraseSeeAlsoCollection?.edges.map(({ node }) => {
    return node.fromPhrase.id === phrase.id ? node.toPhrase : node.fromPhrase
  })

  return (
    <div className="page-card flex flex-col gap-12">
      <div>
        <Link href={`/language/${phrase.lang}`} className="link text-primary">
          &larr; Back to {languages[phrase.lang]}
        </Link>
        <h1 className="h1 my-0">"{phrase.text}"</h1>
      </div>
      <div>
        <h2 className="h2">Translations</h2>
        <ul>
          {translations?.length ? (
            translations.map(({ node }) => {
              return (
                <li key={`translation/${node.id}`}>
                  <TinyPhrase {...node} />
                </li>
              )
            })
          ) : (
            <>OOPS! No translations for this phrase</>
          )}
        </ul>
      </div>
      <div>
        <h2 className="h2 my-6">Related phrases</h2>
        <ul>
          {seeAlso?.length ? (
            seeAlso.map(p => {
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
    </div>
  )
}
