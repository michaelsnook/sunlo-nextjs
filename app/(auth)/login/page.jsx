import LoginForm from './form'
import ClientPage from './client'

export default function Page() {
  return (
    <main className="section-card">
      <ClientPage>
        <LoginForm />
      </ClientPage>
    </main>
  )
}
