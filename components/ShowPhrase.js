import Link from 'next/link'
import { useGlobalState } from 'lib/global-store'

const ListTranslations = ({ list }) => {
  return list?.length > 0 ? (
    <>
      <p>Translations, {list.length}:</p>
      <ul>
        {list.map(t => {
          return (
            <li key={`translation-${t.id}`} className="my-2">
              <span className="badge badge-outline">{t.lang}</span>{' '}
              <span className="italic">"{t.text}"</span>
            </li>
          )
        })}
      </ul>
    </>
  ) : (
    <p className="text-gray-600">This phrase has no translations</p>
  )
}

const ListSeeAlso = ({ list }) => {
  const { language } = useGlobalState()
  return list?.length > 0 ? (
    <>
      <p>See also, {list.length}:</p>
      <ul className="list-disc pl-4">
        {list.map(t => {
          return (
            <li key={`see-also-${t.id}`} className="my-2">
              <Link href={`/phrases/${t.id}`}>
                <a>{JSON.stringify(t)}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : (
    <>See also: none</>
  )
}

export default function ShowPhrase({ phrase }) {
  const { languages } = useGlobalState()
  return (
    <div>
      <h2 className="h2">"{phrase.text}"</h2>
      <p className="-mt-2 mb-4 badge badge-primary badge-outline">
        {languages[phrase.lang]}
      </p>
      <ListTranslations list={phrase.translations} />
      <ListSeeAlso list={phrase.see_also} />
    </div>
  )
}
