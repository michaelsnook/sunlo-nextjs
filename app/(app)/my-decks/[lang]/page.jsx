import languages from 'lib/languages'
import NewCardLinkAndModal from './NewCardLinkAndModal'
import ClientPage from './ClientPage'
import Navbar from 'app/(app)/Navbar'

export default function Page({ params: { lang } }) {
  return (
    <>
      <Navbar title={`Manage your ${languages[lang]} flashcards`}>
        <NewCardLinkAndModal lang={lang} />
      </Navbar>
      <main>
        <div className="card-white">
          <ClientPage lang={lang} />
        </div>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  return Object.keys(languages).map(lang => ({
    lang,
  }))
}
