'use client'

import { useState } from 'react'
import { useDeckContext, useLangContext } from './app-data-provider'
import MyModal from 'components/modal'
import TinyPhrase from 'components/tiny-phrase'

export default function ClientPage() {
  const {
    meta: langMeta,
    phrase: langItems,
    all_pids: langPids,
  } = useLangContext()
  const {
    meta: deckMeta,
    card: deckItems,
    all_pids: deckPids,
  } = useDeckContext()

  // const { lang, name } = langMeta

  if (deckMeta.lang !== langMeta.lang)
    throw new Error("Somehow the Deck and Language language don't match")

  return (
    <div className="space-y-4">
      <div>
        <div>
          deck is{' '}
          <PlusDetailModal>{JSON.stringify(deckMeta, null, 2)}</PlusDetailModal>
        </div>
        <div>
          language is{' '}
          <PlusDetailModal>{JSON.stringify(langMeta, null, 2)}</PlusDetailModal>
        </div>
      </div>
      <div className="flex-basis-[20rem] flex flex-shrink flex-row flex-wrap gap-4">
        {deckPids.map(pid => {
          return (
            <div key={pid} className="basis-lg alert">
              <p>{deckItems[pid].status.substring(0, 2)}</p>
              <TinyPhrase {...langItems[pid]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PlusDetailModal({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)
  return (
    <>
      <a role="button" onClick={open} className="s-link">
        [see details]
      </a>

      <MyModal isOpen={isOpen} onRequestClose={close}>
        {children}
      </MyModal>
    </>
  )
}

