import Link from 'next/link'
import ClientPage from './ClientPage'
import Navbar from '../Navbar'

export default function Page() {
  return (
    <>
      <Navbar title="My languages">
        <Link href="/my-decks/new">+ new deck</Link>
      </Navbar>
      <main className="page-card">
        <ClientPage />
      </main>
    </>
  )
}
