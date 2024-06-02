import languages from 'lib/languages'
import ClientPage from './client'

export default function Page({ params: { lang } }) {
  return <ClientPage lang={lang} />
}

export async function generateStaticParams() {
  return Object.keys(languages).map(lang => ({
    lang,
  }))
}
