import languages from 'lib/languages'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ClientPage from './ClientPage'

export default async function DeckPage({ params: { code } }) {
  if (!languages[code]) notFound()

  return (
    <div>
      <Link href="/deck" className="hover:underline text-primary">
        &larr; Back to decks
      </Link>
      <h1 className="h1">
        {languages[code]} ({code})
      </h1>
      <ClientPage code={code} />
    </div>
  )
}

export async function generateStaticParams() {
  const data = languages

  return Object.keys(data).map(code => ({
    code,
  }))
}
