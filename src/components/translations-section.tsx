'use client'

import { useState } from 'react'
import TinyPhrase from './tiny-phrase'
import AddTranslationsModal from './translations-add-modal'

export default function SectionTranslations({ phrase }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>()
  const open = () => setIsModalOpen(true)
  const close = () => setIsModalOpen(false)

  return (
    <>
      <p className="mt-6 text-sm font-bold text-base-content/70">
        Translations{' '}
        <AddTranslationsModal
          phrase={phrase}
          isOpen={isModalOpen}
          open={open}
          close={close}
        />
      </p>
      {phrase.translations?.length > 0 ?
        <ul className="text-2xl font-bold">
          {phrase.translations.map(trans => (
            <li lang={trans.lang} key={`translation-${trans.id}`}>
              <TinyPhrase {...trans} />
            </li>
          ))}
        </ul>
      : <p className="text-base-content/70">
          There aren&apos;t any translations yet for this phrase,{' '}
          <a className="s-link" onClick={open}>
            you can be the first to add one.
          </a>
        </p>
      }
    </>
  )
}
