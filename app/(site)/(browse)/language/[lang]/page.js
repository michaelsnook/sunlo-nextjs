import Link from 'next/link'
import PhraseCardSmall from 'components/PhraseCardSmall'
import { getLanguageDetails } from 'app/data/fetchers'
import languages from 'lib/languages'
import { notFound } from 'next/navigation'

export default async function LanguagePage({ params: { lang } }) {
  if (!languages[lang]) {
    return notFound()
  }
  const languageName = languages[lang] || ''

  const language = await getLanguageDetails(lang)
  if (language === null) {
    return notFound()
  }

  return (
    <div className="page-card">
      <Link href="/language" className="hover:underline text-primary">
        &larr; Back to languages
      </Link>
      <h1 className="h1">
        {languageName} ({lang})
      </h1>
      {!language?.cardPhraseCollection?.edges?.length ? (
        <p>
          We don&apos;t have any phrases for you to learn {languageName} yet.
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

  return Object.keys(data).map(lang => ({
    lang,
  }))
}
