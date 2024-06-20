import Navbar from 'app/(app)/Navbar'
import SetNewEmailForm from './form'

export default function Page() {
  return (
    <>
      <Navbar title="Change email" />
      <main className="card card-body bg-base-100 text-base-content mx-auto w-4/5">
        <SetNewEmailForm />
      </main>
    </>
  )
}
