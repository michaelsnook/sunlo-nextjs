import Link from 'next/link'
import { GetStaticProps } from 'next'
import { Language } from '~types/language'
import supabase from '~lib/supabase-client'
import AppLayout from '~components/AppLayout'

export default function Posts({ data }: { data: Language[] }): JSX.Element {
  return (
    <AppLayout>
      <h1 className="h1">Languages</h1>
      <ul>
        {data.map(({ name, code }) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase.from('language').select()
  return { props: { data } }
}
