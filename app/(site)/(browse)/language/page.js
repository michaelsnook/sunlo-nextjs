import Link from 'next/link'
import languages from 'lib/languages'

export default async function Languages() {
  return (
    <div className="page-card">
      <h1 className="h1">Languages</h1>
      <ul className="columns-3xs space-y-4">
        {Object.keys(languages).map(code => (
          <li key={code}>
            <Link href={`/language/${code}`} className="btn btn-quiet">
              <p>
                {languages[code]} ({code})
              </p>
              {/*'<p>xx cards, yy users learning</p>'*/}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
