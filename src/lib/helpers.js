export const prependAndDedupe = (item, items) =>
  [item].concat(items?.filter(i => i !== item))

export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'https://sunlo.app'

export default function groupBy(array, key) {
  let result = {}
  array.forEach(item => {
    result[item[key]] ??= []
    result[item[key]].push(item)
  })
  return result
}
