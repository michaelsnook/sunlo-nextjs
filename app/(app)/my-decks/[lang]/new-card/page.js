import Link from 'next/link'
import { useRouter } from 'next/navigation'
import languages from 'lib/languages'
import AddCardPhraseForm from './AddCardPhraseForm'

export default function Page({ params: { lang } }) {
  const router = useRouter()
  const underPage = `/my-decks/${lang}`

  return (
    <>
      <Link href={`/my-decks/${lang}`} className="hover:underline">
        &larr; Back to {languages[lang]} deck
      </Link>
      <h1 className="h1">Add a new card</h1>
      <div className="page-card">
        <AddCardPhraseForm lang={lang} />
      </div>
    </>
  )
}
