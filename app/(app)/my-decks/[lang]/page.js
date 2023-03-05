'use client'

import { useDeck } from 'app/data/hooks'
import Loading from 'app/loading'
import ErrorList from 'components/ErrorList'
import languages from 'lib/languages'

const Main = ({ data, lang }) => {
  return (
    <div>
      <h1 className="h1">Learn {languages[lang]}</h1>
      <p className="py-4">
        deck {lang} looks like {JSON.stringify(data)}
      </p>
    </div>
  )
}

export default function Page({ params: { lang } }) {
  const { status, data, error } = useDeck(lang)
  return status === 'loading' ? (
    <Loading />
  ) : status === 'success' ? (
    <Main data={data} lang={lang} />
  ) : (
    <ErrorList error={error} />
  )
}
