'use client'

import { useLangContext } from './lang-data-provider'

export default function ClientPage() {
  const language = useLangContext()
  return <>{JSON.stringify(language)}</>
}
