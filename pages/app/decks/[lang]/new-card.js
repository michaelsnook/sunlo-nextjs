import AppLayout from 'components/AppLayout'
import supabase from 'lib/supabase-client'
import AddNewCardToDeck from 'components/AddNewCardToDeck'

export default function DeckMakeNewCard({ lang }) {
  return (
    <AppLayout>
      <div className="page-card">
        <h1 className="h1">Add a new card or sthg idc</h1>
        <AddNewCardToDeck lang={lang} />
      </div>
    </AppLayout>
  )
}

export const getStaticProps = async ({ params }) => {
  return { props: { lang: params.lang } }
}

export const getStaticPaths = async () => {
  const { data } = await supabase.from('language').select('code')
  const paths = data?.map(language => {
    return { params: { lang: language.code } }
  })
  return { paths, fallback: 'blocking' }
}
