import Link from 'next/link'
import PhraseCardSmall from 'app/components/PhraseCardSmall'
import { getLanguageDetails } from 'app/data/fetchers'
import languages from 'lib/languages'
import { notFound } from 'next/navigation'

export default async function Page({ params: { lang } }) {
  if (!languages[lang]) {
    return notFound()
  }

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
        {languages[lang]} ({lang})
      </h1>
      {!language?.phrases?.length ? (
        <p>
          We don&apos;t have any phrases for you to learn {languages[lang]} yet.
          But you can be the first to add one!
        </p>
      ) : (
        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {language.phrases.map(phrase => (
            <li key={`phrase-${phrase.id}`}>
              <Link href={`/phrase/${phrase.id}`}>
                <PhraseCardSmall
                  text={phrase.text}
                  lang={phrase.lang}
                  translations={phrase.translations}
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
