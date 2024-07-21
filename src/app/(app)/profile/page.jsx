import Link from 'next/link'
import Navbar from 'app/(app)/Navbar'
import { ProfileCard, UserAuthCard } from './client'

export default function Page() {
  return (
    <>
      <Navbar>
        <Link href="/getting-started">Profile setup &rarr;</Link>
      </Navbar>
      <ProfileCard />
      <UserAuthCard />
    </>
  )
}
