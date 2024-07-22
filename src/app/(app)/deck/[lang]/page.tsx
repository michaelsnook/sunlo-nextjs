import languages from 'lib/languages'
import ClientPage from './client'

export async function generateStaticParams() {
  return Object.keys(languages).map(lang => ({
    lang,
  }))
}

export default function Page({ params: { lang } }) {
  return (
    <>
      <p>hello {lang}</p>
      <ClientPage lang={lang} />
    </>
  )
}
