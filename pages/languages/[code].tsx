import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import type { Language } from '~types/language'
import supabase from '~lib/supabase-client'
import AppLayout from '~components/AppLayout'

type Translation = {
  text: string
  lang: string
  phrase_id: string
}

type Phrase = {
  id: string
  text: string
  lang: string
  translations?: Translation
  see_also?: Phrase[]
}

type LanguagePageData = {
  language: Language
  phrases: Phrase[]
}

export default function LanguagePage({
  language,
  phrases,
}: LanguagePageData): JSX.Element {
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
        <ul>
          {phrases?.map(({ id, text, lang }) => (
            <li key={`phrase-${id}`}>
              <Link href={`/phrases/${id}`}>
                <a className="hover:underline">{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: { code: string }
}): Promise<{ props: LanguagePageData }> => {
  const { data: language } = await supabase
    .from('language')
    .select('*')
    .eq('code', params.code)
    .single()

  const { data: phrases } = await supabase
    .from('card_phrase')
    .select('*')
    .eq('lang', params.code)

  return { props: { language, phrases } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from('language').select('code')
  const paths = data?.map(language => {
    return { params: { code: language.code } }
  })
  return { paths, fallback: 'blocking' }
}
