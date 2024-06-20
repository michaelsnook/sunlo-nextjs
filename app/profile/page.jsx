import Navbar from 'app/(app)/Navbar'
import { ProfileCard, UserAuthCard } from './client'

export default function Page() {
  return (
    <>
      <Navbar title={`Your profile`} />
      <ProfileCard />
      <UserAuthCard />
    </>
  )
}
