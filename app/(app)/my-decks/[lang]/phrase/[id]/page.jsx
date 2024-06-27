import { generateStaticParams } from 'app/language/[lang]/phrase/[id]/page'
import Client from './client'
import Navbar from 'app/(app)/Navbar'

export { generateStaticParams }

export default function Page({ params: { id } }) {
  return (
    <>
      <Navbar />
      <Client pid={id} />
    </>
  )
}
