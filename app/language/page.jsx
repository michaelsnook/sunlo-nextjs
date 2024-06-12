import Link from 'next/link'
import languages from 'lib/languages'

export default async function Page() {
  return (
    <main className="page-card">
      <h1 className="h1">Languages</h1>
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {Object.keys(languages).map(lang => (
          <li key={lang}>
            <Link href={`/language/${lang}`} className="btn btn-ghost">
              <p>
                {languages[lang]} ({lang})
              </p>
              {/*'<p>xx cards, yy users learning</p>'*/}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
