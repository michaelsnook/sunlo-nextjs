import Link from 'next/link'
import { Language } from '~types/language'
import supabase from '~lib/supabase-client'
import AppLayout from '~components/AppLayout'
import { PostgrestError } from '@supabase/supabase-js'

type LanguageIndexProps = {
  languages: Language[]
  error?: PostgrestError
}

export default function Languages({
  languages,
}: LanguageIndexProps): JSX.Element {
  return (
    <AppLayout>
      <h1 className="h1">Languages</h1>
      <ul>
        {languages.map(({ name, code }) => (
          <li key={code}>
            <Link href={`/languages/${code}`}>
              <a className="hover:underline">
                {name} ({code})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </AppLayout>
  )
}

export const getStaticProps = async () => {
  const { data: languages, error } = await supabase
    .from<Language>('language')
    .select()

  if (error) return { props: { error, languages } }
  return { props: { languages } }
}
