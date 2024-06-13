import Link from 'next/link'
import Client from './client'

export default function Page() {
  return (
    <main className="max-w-sm flex flex-col gap-4 p-2">
      <label className="label h2 text-center">Continue learning...</label>
      <Client />
      <div className="mx-auto">
        <Link href={`/my-decks/new`}>
          <span className="btn btn-ghost">+ Start a new language</span>
        </Link>
      </div>
    </main>
  )
}
