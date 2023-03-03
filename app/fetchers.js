import { queryClient } from 'app/query-client'
import {
  getFullLanguageDetailsQuery,
  getOnePhraseDetailsQuery,
} from 'app/data/queries'

export async function getFullLanguageDetails(code) {
  const vars = {
    filter: {
      code: {
        eq: code,
      },
    },
  }
  const { data, error } = await queryClient
    .query(getFullLanguageDetailsQuery, vars)
    .toPromise()
  if (error) throw new Error(error)

  return data
}

export async function getOnePhraseDetails(id) {
  const vars = {
    filter: {
      id: {
        eq: id,
      },
    },
  }
  let { data, error } = await queryClient
    .query(getOnePhraseDetailsQuery, vars)
    .toPromise()
  if (error) throw Error(error)
  return data.cardPhraseCollection.edges[0].node
}
