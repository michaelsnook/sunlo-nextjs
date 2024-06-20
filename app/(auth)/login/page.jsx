import LoginForm from './form'
import ClientPage from './client'

export default function Page() {
  return (
    <main className="card-white">
      <ClientPage>
        <LoginForm />
      </ClientPage>
    </main>
  )
}
