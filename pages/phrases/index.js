import { urqlClient } from 'lib/supabase-client'
import { useEffect, useState } from 'react'

const QUERY = `
  query pokemons($first: Int!){
    pokemons(first: $first){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`
export default function Pokemon({ serverData }) {
  const [clientData, setClientData] = useState()
  useEffect(() => {
    urqlClient
      .query(QUERY, { first: 1 })
      .toPromise()
      .then(data => {
        setClientData(data.data)
      })
  }, [])
  return (
    <div>
      <p>server data: {JSON.stringify(serverData)}</p>
      <p>client data: {JSON.stringify(clientData)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await urqlClient.query(QUERY, { first: 2 }).toPromise()
  return { props: { serverData: data } }
}
