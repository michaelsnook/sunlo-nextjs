'use client'

import { useDeckContext, useLangContext } from './app-data-provider'

export default function ClientPage() {
  const language = useLangContext()
  const deck = useDeckContext()
  return (
    <div className="grid grid-cols-2">
      <div>deck is: {JSON.stringify(deck, null, 2)}</div>
      <div>language is: {JSON.stringify(language, null, 2)}</div>
    </div>
  )
}
