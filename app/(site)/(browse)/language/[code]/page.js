import Link from 'next/link'
import PhraseCardSmall from 'components/PhraseCardSmall'
import { getFullLanguageDetails } from 'app/fetchers'
import languages from 'lib/languages'
import { notFound } from 'next/navigation'

export default async function LanguagePage({ params }) {
  if (!languages[params.code]) notFound()

  let data = await getFullLanguageDetails(params.code)

  if (
    data.languageCollection.edges.length === 0 ||
    !data.languageCollection.edges[0]?.node
  )
    notFound()

  const language = data.languageCollection.edges[0].node

  return (
    <div className="page-card">
      <Link href="/language" className="hover:underline text-primary">
        &larr; Back to languages
      </Link>
      <h1 className="h1">
        {language.name} ({language.code})
      </h1>
      {!language.cardPhraseCollection.edges.length ? (
        <p>
          We don&apos;t have any phrases for you to learn {language.name} yet.
          But you can be the first to add one!
        </p>
      ) : (
        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {language.cardPhraseCollection.edges.map(({ node }) => (
            <li key={`phrase-${node.id}`}>
              <Link href={`/phrase/${node.id}`}>
                <PhraseCardSmall
                  text={node.text}
                  lang={node.lang}
                  translations={node.cardTranslationCollection.edges}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export async function generateStaticParams() {
  const data = languages

  return Object.keys(data).map(code => ({
    code,
  }))
}
