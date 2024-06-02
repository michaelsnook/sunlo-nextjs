import Link from 'next/link'
import languages from 'lib/languages'
import NewCardLinkAndModal from 'app/components/NewCardLinkAndModal'
import ClientPage from './ClientPage'

export default function Page({ params: { lang } }) {
  return (
    <>
      <Link className="link" href="/my-decks">
        &larr; Back to decks
      </Link>
      <div className="flex flex-row justify-between">
        <h1 className="h1">Learn {languages[lang]}</h1>
        <NewCardLinkAndModal lang={lang} />
      </div>
      <div className="page-card">
        <ClientPage lang={lang} />
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return Object.keys(languages).map(lang => ({
    lang,
  }))
}
