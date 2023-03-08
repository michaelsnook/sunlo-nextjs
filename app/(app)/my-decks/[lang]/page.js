import ClientPage from './ClientPage'
import languages from 'lib/languages'
import Link from 'next/link'

export default function Page({ params: { lang } }) {
  return (
    <>
      <Link className="hover:underline" href="/my-decks">
        &larr; Back to decks
      </Link>
      <h1 className="h1">Learn {languages[lang]}</h1>
      <div className="page-card">
        <ClientPage lang={lang} />
      </div>
    </>
  )
}
