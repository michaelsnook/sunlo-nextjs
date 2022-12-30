import { urqlClient } from 'lib/supabase-client'

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
export default async function Pokemon() {
  let { data } = await urqlClient.query(QUERY, { first: 2 }).toPromise()
  return (
    <div>
      <p>server data: {JSON.stringify(data)}</p>
    </div>
  )
}
