import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { uuid } from 'types/main'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// these are the only 3 ways we initialize empty state (I think)
const empty = (item: unknown) =>
  item === null || item === undefined || item === ''

const notEmpty = (item: unknown) =>
  !(item === null || item === undefined || item === '')

// add to the beginning of a list; removing up to 1 duplicate and any empty items
export function unshiftUnique<T>(item: T, items: Array<T>): Array<T> {
  // parse out certain invalid inputs
  if (empty(item)) return items
  if (empty(items)) return [item]
  // remove empties, duplicate values, and prepend
  const array = items.filter(notEmpty).filter(i => i !== item)
  return [item, ...array]
}

// narrows an object to selected keys
// const newOb = pluck(object, ['username', 'uid', 'pid'])
export function pluck(fromOb: Object, keys: Array<string>): Object {
  if (!keys || !keys?.length || !fromOb) return null
  const oKeys = Object.keys(fromOb)
  let res = {}
  keys.forEach(k => {
    if (fromOb.hasOwnProperty(k)) res[k] = fromOb[k]
  })
  return res
}

export function mapArray<T>(arr: Array<T>, key: string): { [key: string]: T } {
  let result = {}
  arr.forEach(item => (result[item[key]] = item))
  return result
}

export function collateArray<T>(
  arr: Array<T>,
  key: string
): {
  [key: string]: T
} {
  let result = {}
  arr.forEach(item => {
    result[item[key]] ??= []
    result[item[key]].push(item)
  })
  return result
}

export const selects = {
  card_full: () => `*, reviews:user_card_review_plus(*)` as const,
  deck_full: () => `*, cards:user_card_plus(${selects.card_full()})` as const,
  phrase_full: () => `*, translations:phrase_translation(*)` as const,
  language_full: () =>
    `*, phrases:phrase_plus(${selects.phrase_full()})` as const,
}

export const links = {
  deckPhrase: (lang: string, pid: uuid): string =>
    `/my-decks/${lang}/phrase/${pid}`,
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'https://sunlo.app'
