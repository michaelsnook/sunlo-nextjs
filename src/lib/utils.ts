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

export const collateArray = (arr: Array<any>, key: string): any => {
  let result = {}
  arr.forEach(item => {
    result[item[key]] ??= []
    result[item[key]].push(item)
  })
  return result
}


export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'https://sunlo.app'
