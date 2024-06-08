export const prependAndDedupe = (item, items) =>
  [item].concat(items?.filter(i => i !== item))

export const convertNodeListToCheckedValues = list => {
  let x = []
  list.forEach(el => {
    if (el.checked) x.push(el.value)
  })
  return x
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'https://sunlo.app'
