import LoginForm from './form'
import ClientPage from './client'

export default function Page() {
  return (
    <main className="card bg-base-100 text-base-content">
      <div className="card-body">
        <ClientPage>
          <LoginForm />
        </ClientPage>
      </div>
    </main>
  )
}
