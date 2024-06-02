import { notFound } from 'next/navigation'
import languages from 'lib/languages'
import Client from './client'

export default function Page({ params: { lang } }) {
  const language = languages[lang]
  if (typeof language !== 'string') notFound()

  return (
    <>
      <h1 className="text-4xl mt-6 mb-4">Learn {language}</h1>
      <Client lang={lang} />
    </>
  )
}

export async function generateStaticParams() {
  return Object.keys(languages).map(lang => ({
    lang,
  }))
}
