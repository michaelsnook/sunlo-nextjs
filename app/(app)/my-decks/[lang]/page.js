'use client'

import ClientPage from './ClientPage'
import languages from 'lib/languages'
import Link from 'next/link'
import MyModal from 'app/components/Modal'
import { useState } from 'react'
import AddCardPhraseForm from './new-card/AddCardPhraseForm'

export default function Page({ params: { lang } }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Link className="link" href="/my-decks">
        &larr; Back to decks
      </Link>
      <div className="flex flex-row justify-between">
        <h1 className="h1">Learn {languages[lang]}</h1>
        <a
          onClick={() => setShowModal(true)}
          className="flex-none link place-self-center"
        >
          + new card
        </a>
      </div>
      <div className="page-card">
        <ClientPage lang={lang} />
      </div>
      <MyModal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <h1 className="h1">Add a new card</h1>
        <AddCardPhraseForm lang={lang} cancel={() => setShowModal(false)} />
      </MyModal>
    </>
  )
}
