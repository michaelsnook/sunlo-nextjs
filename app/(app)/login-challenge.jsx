'use client'

import { useState } from 'react'
import Modal from 'react-modal'
import { useAuth } from 'lib/auth-context'
import Login from 'components/LoginForm'

Modal.setAppElement('#modal-root')

export default function LoginChallenge() {
  const { isAuth } = useAuth()
  const [isDismissed, setIsDismissed] = useState()
  // console.log(`auth login challenge`, isAuth)
  return (
    <Modal
      isOpen={!isDismissed && !isAuth}
      className="big-card my-6 mx-auto w-11/12 place-self-center outline-none"
      overlayClassName="bg-black/60 fixed backdrop-blur-sm fixed inset-0 flex"
      noScroll={true}
      handleCloseModal={() => setIsDismissed(true)}
    >
      <Login asModal />
    </Modal>
  )
}
