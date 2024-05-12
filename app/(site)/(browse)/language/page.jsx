import Link from 'next/link'
import languages from 'lib/languages'

export default async function Page() {
  return (
    <div className="page-card">
      <h1 className="h1">Languages</h1>
      <ul className="columns-3xs space-y-4">
        {Object.keys(languages).map(lang => (
          <li key={lang}>
            <Link href={`/language/${lang}`} className="btn btn-quiet">
              <p>
                {languages[lang]} ({lang})
              </p>
              {/*'<p>xx cards, yy users learning</p>'*/}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
