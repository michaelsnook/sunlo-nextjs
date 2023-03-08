import Link from 'next/link'
import ClientPage from './ClientPage'

export default function Page() {
  return (
    <>
      <div className="flex justify-between">
        <div className="grow">
          <h1 className="h1">My decks</h1>
        </div>
        <Link
          className="flex-none btn btn-outline text-white my-4"
          href="/my-decks/new"
        >
          + new
        </Link>
      </div>
      <div className="page-card">
        <ClientPage />
      </div>
    </>
  )
}
