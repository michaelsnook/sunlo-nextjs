import Link from 'next/link'
import Form from './form'

export default function Page() {
  return (
    <main>
      <Link href="/my-decks" className="hover:underline">
        &larr; Back to decks
      </Link>
      <h1 className="h1">Start a new deck</h1>
      <div className="card card-body bg-base-100 text-base-content">
        <Form />
      </div>
    </main>
  )
}
