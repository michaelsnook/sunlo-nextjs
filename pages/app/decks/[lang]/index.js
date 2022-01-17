import Link from 'next/link'
import useSWR from 'swr'
import supabase from 'lib/supabase-client'
import AppLayout from 'components/AppLayout'
import PhraseCardSmall from 'components/PhraseCardSmall'
import { useGlobalState } from 'lib/global-store'

const dataShaper = (data, language) => {
  // turn the count into an integer and delete the old one
  data.cards_in_deck_count = data.cards_in_deck_count_object[0].count
  delete data.cards_in_deck_count_object
  // flag for deck_is_empty
  data.deck_is_empty = data.cards_in_deck_count === 0
  // destructure arrays from join tables in cards array
  data.cards = data.deck_memberships.map(i => {
    i.card.related = i.card.see_also?.map(j => {
      // select the proper phrase_id for the related phrases list
      return {
        phrase_id:
          i.card.id === j.to_phrase_id ? j.from_phrase_id : j.to_phrase_id,
      }
    })
    delete i.card.see_also
    return { status: i.status, ...i.card }
  })
  delete data.deck_memberships
  console.log('running datashaper', data)
}

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

  const deckFetcher = async () => {
    console.log('running deckFetcher')
    return await supabase
      .from('user_deck')
      .select(
        `
        id,
        lang,
        cards_in_deck_count_object:user_deck_card_membership(count),
        deck_memberships:user_deck_card_membership(
          status,
          card:card_phrase(
            id,
            text,
            lang,
            translations_count:card_translation(count),
            see_also:card_see_also!card_see_also_to_phrase_id_fkey(from_phrase_id, to_phrase_id)
          )
        )
      `
      )
      .eq('lang', language.code)
      .single()
  }

  const { data, error } = useSWR(
    //() =>
    !user.id ? null : `${user.id}-deck-${language.code}`,
    () => {
      deckFetcher().then(({ data, error }) => {
        if (error) throw error
        else return dataShaper(data, language, profile?.lanugages_spoken)
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
            <Link href="new">
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
  const { data: language } = await supabase
    .from('language')
    .select('*')
    .eq('code', params.lang)
    .single()

  const { data: phrases } = await supabase
    .from('card_phrase')
    .select('*, translations:card_translation(*)')
    .eq('lang', params.lang)

  if (!language || !phrases) throw `Problem loading language [${params.code}]`
  return { props: { language, phrases } }
}

export const getStaticPaths = async () => {
  const { data } = await supabase.from('language').select('code')
  const paths = data?.map(language => {
    return { params: { lang: language.code } }
  })
  return { paths, fallback: 'blocking' }
}
