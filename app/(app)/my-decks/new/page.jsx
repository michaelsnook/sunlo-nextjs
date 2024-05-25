import Link from 'next/link'
import Form from './form'

export default function Page() {
  return (
    <>
      <Link href="/my-decks" className="hover:underline">
        &larr; Back to decks
      </Link>
      <h1 className="h1">Start a new deck</h1>
      <div className="page-card">
        <Form />
      </div>
    </>
  )
}
