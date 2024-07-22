'use client'

import { loadLanguage, useLanguage } from './loader'

export default function ClientPage({ lang }) {
  const { data, error, status } = useLanguage(lang)
  return <>{JSON.stringify(data, null, 2)}</>
}
