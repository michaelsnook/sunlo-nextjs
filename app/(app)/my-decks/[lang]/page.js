import ClientPage from './ClientPage'
import languages from 'lib/languages'
import Link from 'next/link'

export default function Page({ params: { lang } }) {
  return (
    <>
      <Link className="hover:underline" href="/my-decks">
        &larr; Back to decks
      </Link>
      <div className="flex flex-row justify-between">
        <h1 className="h1">Learn {languages[lang]}</h1>
        <Link
          href={`/my-decks/${lang}/new-card`}
          className="flex-none hover:underline place-self-center"
        >
          + new card
        </Link>
      </div>
      <div className="page-card">
        <ClientPage lang={lang} />
      </div>
    </>
  )
}
