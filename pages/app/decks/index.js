import AppLayout from '../../../components/AppLayout'
import supabase from '../../../lib/supabase-client'
import useSWR from 'swr'
import Link from 'next/link'

async function deckFetcher() {
  const { data, error } = await supabase.from('user_deck').select(`*`)
  if (error) throw error
  return data || []
}

export default function DeckIndex() {
  const { data:decks, error } = useSWR(`decks/index`, deckFetcher)
  return (
    <AppLayout>
      <h1 className="h1">Your decks</h1>
      {!decks && !error ? <p>loading...</p> : (
        <div className="">
          {decks ? decks?.map(d => (
            <p key={d.lang}>
              <Link href={`/app/decks/${d.lang}`}>
                <a className="btn btn-quiet">
                  {d.lang}
                </a>
              </Link>
            </p>
          )) : (
            <p className="alert alert-info my-6 p-6">No decks rn sorry mate</p>
          )}
          <a className="btn btn-quiet">make new deck</a>
        </div>
      )}
    </AppLayout>
  )
}
