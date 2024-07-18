import Link from 'next/link'
import Navbar from 'app/(app)/Navbar'
import UserAuthCard from './user-auth-card'
import UpdateProfileForm from './update-profile-form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from 'components/ui/card'

export default function Page() {
  return (
    <>
      <Navbar>
        <Link href="/getting-started">Profile setup &rarr;</Link>
      </Navbar>
      <Card className="w-full bg-base-100 text-base-content">
        <CardHeader>
          <CardTitle className="h3">Edit Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <UpdateProfileForm />
      </Card>
      <UserAuthCard />
    </>
  )
}
