import Link from 'next/link'
import AppLayout from 'components/AppLayout'
import { useGlobalState } from 'lib/global-store'

export default function DeckIndex() {
  const { profileError, decks } = useGlobalState()
  return (
    <AppLayout>
      <main className="page-card">
        <h1 className="h1">Your decks</h1>
        {!decks && !profileError ? (
          <p>loading...</p>
        ) : (
          <div className="">
            {decks ? (
              decks?.map(d => (
                <p key={d.lang}>
                  <Link href={`/app/decks/${d.lang}`} className="btn btn-quiet">
                    {d.lang}
                  </Link>
                </p>
              ))
            ) : (
              <p className="alert alert-info my-6 p-6">
                No decks rn sorry mate
              </p>
            )}
            <a className="btn btn-quiet">make new deck</a>
          </div>
        )}
      </main>
    </AppLayout>
  )
}
