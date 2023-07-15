import Link from 'next/link'
import languages from 'lib/languages'
import NewCardLinkAndModal from 'app/components/NewCardLinkAndModal'
import ClientPage from './ClientPage'
import { getLanguageDetails } from 'app/data/fetchers'

const Main = async ({ lang, children }) => {
  let data = await getLanguageDetails(lang)
  return <ClientPage lang={lang} language={data} />
}

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
        <Main lang={lang} />
      </div>
    </>
  )
}
