import Link from 'next/link'
import { getLanguages } from 'app/fetchers'

export default async function Languages() {
  let languages = await getLanguages()

  return (
    <>
      <h1 className="h1">Languages</h1>
      {!languages ? (
        <p>
          There are no languages yet, apparently. This is a problem; there must
          always be languages.
        </p>
      ) : (
        <ul className="flex flex-col space-y-4">
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
      )}
    </>
  )
}
