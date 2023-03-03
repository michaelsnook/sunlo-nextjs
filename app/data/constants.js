const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
const defaultHeaders = {
  Accept: 'application/json',
  apikey: supabaseApiKey,
}
const addTokenToHeaders = token => {
  // console.log(`1 running addTokenToHeaders `, token)
  const result = token
    ? {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      }
    : defaultHeaders
  // console.log(`2 running addTokenToHeaders `, result)
  return result
}

export function requestOptions(token) {
  return {
    requestHeaders: addTokenToHeaders(token),
    url: endpoint,
  }
}
