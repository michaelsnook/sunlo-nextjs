import Link from 'next/link'
import supabase from 'lib/supabase-client'

export default async function Page() {
  const { data, error } = await supabase.from('language_plus').select('*')
  return (
    <main className="page-card">
      <h1 className="h1">Languages</h1>
      <ul className="columns-1 @lg:columns-2 @3xl:columns-3 gap-4 space-y-4">
        {data.map(({ lang, name, learners, phrases_to_learn }) => (
          <li key={lang} className="card shadow text-start break-inside-avoid">
            <Link href={`/language/${lang}`} className="card-body">
              <h3 className="card-title">
                {name} ({lang})
              </h3>
              <p>
                {learners} {learners === 1 ? 'person' : 'people'} learning{' '}
                {phrases_to_learn} different phrases
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
