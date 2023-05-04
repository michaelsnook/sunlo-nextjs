const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

const defaultHeaders = {
  Accept: 'application/json',
  apikey: supabaseApiKey,
}

const addTokenToHeaders = token => {
  // console.log(`1 running addTokenToHeaders `, token)
  return token
    ? {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      }
    : defaultHeaders
}

export function requestOptions(token) {
  return {
    requestHeaders: addTokenToHeaders(token),
    url: endpoint,
  }
}
