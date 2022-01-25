import AppLayout from 'components/AppLayout'
import ShowPhrase from 'components/ShowPhrase'
import { getFullPhraseData } from 'lib/deck'
import supabase from 'lib/supabase-client'

export default function Phrase(data) {
  console.log(`Props: `, data)
  return (
    <AppLayout>
      <div className="big-card">
        <ShowPhrase phrase={data} />
      </div>
    </AppLayout>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  const props = await getFullPhraseData(id)
  console.log('Props: ', props)
  return { props }
}

export async function getStaticPaths() {
  const { data } = await supabase.from('card_phrase').select('id')
  console.log('getStaticPaths for /phrases/[id]', data)
  const paths = data?.map(({ id }) => {
    return { params: { id: `${id}` } }
  })
  return { paths, fallback: true }
}
