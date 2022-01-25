import Link from 'next/link'
import useSWR from 'swr'
import supabase from 'lib/supabase-client'
import AppLayout from 'components/AppLayout'
import PhraseCardSmall from 'components/PhraseCardSmall'
import { useGlobalState } from 'lib/global-store'
import { getLanguagePhrases, deckFetcher, deckDataShaper } from 'lib/deck'

export default function DeckPage({ language, phrases }) {
  // const router = useRouter()
  const { user, decks, languages, profile, profileError } = useGlobalState()
  console.log(
    'deckPage',
    `user is ${user ? '' : 'not '}present`,
    decks,
    languages
  )
  if (profileError) throw profileError
  if (decks?.find(deck => language.code === deck.lang) === -1) {
    const error = {
      message: 'something is wrong',
      decks,
      language,
      phrases,
      languages,
    }
    console.log(error)
    throw error
  } else console.log(`${language.code} matches user's decks `)

  const { data, error } = useSWR(
    //() =>
    !user.id ? null : `${user.id}-deck-${language.code}`,
    () => {
      deckFetcher().then(({ data, error }) => {
        if (error) throw error
        else return deckDataShaper(data)
      })
    }
  )

  return (
    <AppLayout>
      <div className="page-card">
        <h1 className="h1">
          Your {language.name} ({language.code}) deck
        </h1>
        {!phrases.length ? (
          <>
            <p>
              We don&apos;t have any phrases for you to learn {language.name}{' '}
              yet. But you can be the first to add one!
            </p>
            <Link href={`/app/decks/${language.code}/new-card`}>
              <a className="my-10 w-60 mx-auto btn btn-primary">
                + Add a new card
              </a>
            </Link>
          </>
        ) : (
          <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {phrases?.map(phrase => (
              <li key={`phrase-${phrase.id}`}>
                <Link href={`/phrases/${phrase.id}`}>
                  <a className="card shadow p-4 hover:bg-primary hover:text-white mb-4">
                    <PhraseCardSmall {...phrase} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  )
}

export const getStaticProps = async ({ params }) => {
  const { lang } = params
  return await getLanguagePhrases(params.lang)
}

export const getStaticPaths = async () => {
  const { data } = await supabase.from('language').select('code')
  const paths = data?.map(language => {
    return { params: { lang: language.code } }
  })
  return { paths, fallback: 'blocking' }
}
