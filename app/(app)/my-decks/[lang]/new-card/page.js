import Link from 'next/link'
import languages from 'lib/languages'
import AddCardPhraseForm from 'app/components/AddCardPhraseForm'

export default function Page({ params: { lang } }) {
  return (
    <>
      <Link href={`/my-decks/${lang}`} className="link">
        &larr; Back to {languages[lang]} deck
      </Link>
      <h1 className="h1">Add a new card</h1>
      <div className="section-card">
        <AddCardPhraseForm lang={lang} offerRefresh />
      </div>
    </>
  )
}
