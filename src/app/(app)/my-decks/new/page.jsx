import Form from './form'
import Navbar from 'app/(app)/Navbar'

export default function Page() {
  return (
    <>
      <Navbar title="Start Learning" />
      <main className="card-white">
        <Form />
      </main>
    </>
  )
}
