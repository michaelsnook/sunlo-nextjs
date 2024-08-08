'use client'

import { useState } from 'react'
import MyModal from 'components/modal'
import TinyPhrase from 'components/tiny-phrase'
import SectionTranslations from 'components/translations-section'
import { useDeckData } from 'lib/hooks'
import { useLanguageData } from 'lib/hooks'
// import { SectionSeeAlsos } from 'components/big-phrase'

export default function ClientPage() {
  const { meta: langMeta, phrases: langItems } = useLanguageData()
  const { meta: deckMeta, cards: deckItems, pids: deckPids } = useDeckData()

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
            <div
              key={pid}
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-200"
            >
              <div className="collapse-title text-xl font-medium">
                <div className="inline flex-grow">
                  {deckItems[pid].status.substring(0, 2)}
                  {'  '}
                  <TinyPhrase {...langItems[pid]} />
                </div>
              </div>
              <div className="collapse-content">
                <SectionTranslations phrase={langItems[pid]} />
                {/*
                  <SectionSeeAlsos seeAlsos={langItems[pid].relation_pids} />

                  This won't work (yet) bc the structure of this data has changed.
                  We will copy this component, modify it for the new structure, and
                  delete the old one when the pages using it are migrated or retired.
                */}
              </div>
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
