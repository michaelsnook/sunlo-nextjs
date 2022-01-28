import Link from 'next/link'
import supabase from 'lib/supabase-client'
import AppLayout from 'components/AppLayout'
import PhraseCardSmall from 'components/PhraseCardSmall'
import { fetchLanguagePhrases } from 'lib/language'

export default function LanguagePage({ language, phrases }) {
  console.log(language)
  console.log(phrases)
  return (
    <AppLayout>
      <h1 className="h1">
        {language.name} ({language.code})
      </h1>
      {!phrases.length ? (
        <p>
          We don&apos;t have any phrases for you to learn {language.name} yet.
          But you can be the first to add one!
        </p>
      ) : (
        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {phrases?.map(phrase => (
            <li key={`phrase-${phrase.id}`}>
              <Link href={`/phrases/${phrase.id}`}>
                <a className="card bg-white text-gray-700 shadow p-4 hover:bg-[#efe9fb] mb-4">
                  <PhraseCardSmall {...phrase} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  )
}

export const getStaticProps = async ({ params }) => {
  const { code } = params
  const { data: phrases } = await fetchLanguagePhrases(code)
  const { data: language } = await supabase
    .from('language')
    .select('name, code')
    .eq('code', code)
    .single()

  return { props: { language, phrases } }
}

export const getStaticPaths = async () => {
  const { data } = await supabase.from('language').select('code')
  const paths = data?.map(language => {
    return { params: { code: language.code } }
  })
  return { paths, fallback: 'blocking' }
}
