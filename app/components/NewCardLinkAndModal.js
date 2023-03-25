'use client'

import MyModal from 'app/components/Modal'
import { useState } from 'react'
import AddCardPhraseForm from 'app/components/AddCardPhraseForm'

export default function NewCardLinkAndModal({ lang }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <a
        onClick={() => setShowModal(true)}
        className="flex-none link place-self-center"
      >
        + new card
      </a>
      <MyModal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <h1 className="h1">Add a new card</h1>
        <AddCardPhraseForm lang={lang} cancel={() => setShowModal(false)} />
      </MyModal>
    </>
  )
}
