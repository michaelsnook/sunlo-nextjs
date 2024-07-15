import { generateStaticParams } from 'app/language/[lang]/phrase/[id]/page'
import Client from './client'
import Navbar from 'app/(app)/Navbar'
import languages from 'lib/languages'

export { generateStaticParams }

export default function Page({ params: { id, lang } }) {
  return (
    <>
      <Navbar title={`${languages[lang]} Phrase`} />
      <Client pid={id} />
    </>
  )
}
