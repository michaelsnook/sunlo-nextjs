'use client'

import ClientPage from './ClientPage'
import languages from 'lib/languages'
import Link from 'next/link'
import Modal from 'react-modal'
import { useState } from 'react'
import AddCardPhraseForm from './new-card/AddCardPhraseForm'

Modal.setAppElement('#modal-root')

export default function Page({ params: { lang } }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Link className="hover:underline" href="/my-decks">
        &larr; Back to decks
      </Link>
      <div className="flex flex-row justify-between">
        <h1 className="h1">Learn {languages[lang]}</h1>
        <a
          onClick={() => setShowModal(true)}
          className="flex-none hover:underline place-self-center"
        >
          + new card
        </a>
      </div>
      <div className="page-card">
        <ClientPage lang={lang} />
      </div>
      <Modal
        className="big-card my-6 mx-auto"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <h1 className="h1">Add a new card</h1>
        <AddCardPhraseForm lang={lang} />
      </Modal>
    </>
  )
}
