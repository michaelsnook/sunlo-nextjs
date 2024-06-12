import Link from 'next/link'
import languages from 'lib/languages'
import AddCardPhraseForm from './form'

export default function Page({ params: { lang } }) {
  return (
    <main>
      <Link href={`/my-decks/${lang}`} className="link">
        &larr; Back to {languages[lang]} deck
      </Link>
      <h1 className="h1">Add a new card</h1>
      <div className="section-card">
        <AddCardPhraseForm lang={lang} />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return Object.keys(languages).map(lang => ({
    lang,
  }))
}
