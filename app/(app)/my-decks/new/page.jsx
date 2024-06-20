import Form from './form'
import Navbar from 'app/(app)/Navbar'

export default function Page() {
  return (
    <>
      <Navbar title="Start Learning" />
      <main>
        <div className="card card-body bg-base-100 text-base-content">
          <Form />
        </div>
      </main>
    </>
  )
}
