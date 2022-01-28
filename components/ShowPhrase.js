import Link from 'next/link'
import useSWR from 'swr'
import { getFullPhraseData } from 'lib/deck'
import PhraseLink from 'components/PhraseLink'
import { useLanguageLookupTable } from 'lib/language'

const ListTranslations = ({ list }) => {
  return list?.length > 0 ? (
    <div>
      <p>Translations, {list.length}:</p>
      <ul>
        {list.map(t => {
          return (
            <li
              key={`translation-${t.id}`}
              className="my-2 text-2xl flex flex-row place-items-center"
            >
              <span className="badge badge-outline mt-1">{t.lang}</span>{' '}
              <span className="italic">"{t.text}"</span>
            </li>
          )
        })}
      </ul>
    </div>
  ) : (
    <p className="text-gray-600">This phrase has no translations</p>
  )
}

const ListSeeAlso = ({ list }) => {
  return list?.length > 0 ? (
    <div>
      <p>See also, {list.length}:</p>
      <ul>
        {list.map(id => {
          return (
            <li key={`see-also-${id}`} className="my-2">
              <PhraseLink id={id} />
            </li>
          )
        })}
      </ul>
    </div>
  ) : (
    <p>See also: none</p>
  )
}

export default function ShowPhrase({ phrase, id }) {
  let { data, error } = phrase
    ? { data: phrase }
    : useSWR({ id, type: 'phrase' }, getFullPhraseData)
  const { languageTable } = useLanguageLookupTable()
  return data ? (
    <div className="grid grid-cols-1 gap-4 ">
      <h2 className="h2">"{data.text}"</h2>
      <p className="-mt-2 mb-4 badge badge-primary badge-outline">
        {languageTable[data.lang]}
      </p>
      <ListTranslations list={data.translations} />
      <ListSeeAlso list={data.see_also} />
    </div>
  ) : (
    <Link href={`/phrases/${id}`}>
      <a>Card {id}</a>
    </Link>
  )
}
