import Link from 'next/link'
import supabase from 'lib/supabase-client'
import SiteLayout from 'components/SiteLayout'
import ErrorList from 'components/ErrorList'
import { fetchLanguages } from 'lib/language'

export default function Languages({ languages, error }) {
  return (
    <SiteLayout sidebar>
      <h1 className="h1">Languages</h1>
      {!languages ? (
        <ErrorList summary="Can't seem to load languages" error={error} />
      ) : (
        <ul className="flex flex-col space-y-4">
          {languages.map(({ name, code }) => (
            <li key={code}>
              <Link href={`/languages/${code}`}>
                <a className="btn btn-quiet">
                  <p>
                    {name} ({code})
                  </p>
                  {/*'<p>xx cards, yy users learning</p>'*/}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SiteLayout>
  )
}

export const getStaticProps = async () => {
  const { data: languages, error } = await fetchLanguages()

  // return error condition if languages has no entries
  if (error || !languages?.length > 0) return { props: { error } }
  return { props: { languages } }
}
