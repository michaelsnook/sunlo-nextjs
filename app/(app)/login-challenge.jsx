'use client'

import { useAuth } from 'lib/auth-context'
import Login from 'components/LoginForm'
import MyModal from 'app/components/Modal'

export default function LoginChallenge() {
  const { isAuth } = useAuth()
  // console.log(`auth login challenge`, isAuth)
  return isAuth ? null : (
    <MyModal isOpen={true} onRequestClose={() => {}}>
      <Login asModal />
    </MyModal>
  )
}
