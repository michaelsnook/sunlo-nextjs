import Link from 'next/link'
import languages from 'lib/languages'
import PhraseCardSmall from 'components/PhraseCardSmall'
import { getFullLanguageDetails } from 'app/fetchers'

export default async function LanguagePage({ params }) {
  let data = await getFullLanguageDetails(params.code)
  console.log('LOOK HERE', data)
  return <></>
  const language = data.languageCollection.edges[0].node

  return (
    <div className="page-card">
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
            <li
              className="card shadow-lg hover:bg-primary hover:text-white mb-4 w-full inline-block"
              key={`phrase-${node.id}`}
            >
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
  return Object.keys(languages).map(code => ({
    code,
  }))
}
