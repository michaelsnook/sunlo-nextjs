import languages from 'lib/languages'
import ClientPage from './use-client'
import Link from 'next/link'

export default function Page({ params: { lang } }) {
  return (
    <>
      <h1>{lang}</h1>
      <p>
        <Link href="/hin">hin</Link> | <Link href="/tam">tam</Link>
      </p>
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
