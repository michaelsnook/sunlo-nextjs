import languages from 'lib/languages'
import ClientPage from './use-client'

export default function Page({ params: { lang } }) {
  return (
    <>
      <h1>{lang}</h1>
      <div>
        <ClientPage />
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return Object.keys(languages).map(lang => ({
    lang,
  }))
}
