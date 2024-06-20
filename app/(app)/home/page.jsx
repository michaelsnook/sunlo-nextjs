import Link from 'next/link'
import Navbar from '../Navbar'
import Client from './client'

export default function Page() {
  return (
    <>
      <Navbar title={`Continue learning...`} />
      <main className="flex flex-col gap-4 p-2">
        <Client />
        <div className="mx-auto">
          <Link href={`/my-decks/new`}>
            <span className="btn btn-ghost">+ Start a new language</span>
          </Link>
        </div>
      </main>
    </>
  )
}
