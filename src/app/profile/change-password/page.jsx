import Navbar from 'app/(app)/Navbar'
import SetNewPasswordForm from 'app/(auth)/set-new-password/form'

export default function Page() {
  return (
    <>
      <Navbar title="Change password" />
      <main className="card-white w-4/5 mx-auto">
        <SetNewPasswordForm />
      </main>
    </>
  )
}
