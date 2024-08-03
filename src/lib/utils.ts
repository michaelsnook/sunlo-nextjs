import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const prependAndDedupe = (
  item: Object,
  items: Array<Object>
): Array<Object> => {
  let index = items.indexOf(item)
  if (index > -1) items.splice(index, 1)
  return [item, ...items]
}

export const mapArray = (arr: Array<any>, key: string): any => {
  let result = {}
  arr.forEach(item => (result[item[key]] = item))
  return result
}

export const collateArray = (arr: Array<any>, key: string): any => {
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

export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'https://sunlo.app'
