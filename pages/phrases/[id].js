import AppLayout from 'components/AppLayout'
import ShowPhrase from 'components/ShowPhrase'
import { fetchFullPhraseData } from 'lib/phrase'
import supabase from 'lib/supabase-client'

export default function Phrase(data) {
  console.log(`Props2: `, data)
  return (
    <AppLayout>
      <div className="big-card">
        <ShowPhrase phrase={data} />
      </div>
    </AppLayout>
  )
}

export async function getStaticProps({ params }) {
  const props = await fetchFullPhraseData(params)
  console.log('Props1: ', props)
  return { props }
}

export async function getStaticPaths() {
  const { data } = await supabase.from('card_phrase').select('id')
  console.log('getStaticPaths for /phrases/[id]', data)
  const paths = data?.map(p => {
    return { params: { id: `${p.id}` } }
  })
  return { paths, fallback: true }
}
