import SiteLayout from '../components/SiteLayout'
import LoginForm from '../components/LoginForm'
import Banner from '../components/Banner'

export default function Login() {
  return (
    <SiteLayout>
      <main>
        <Banner>
          <div className="card shadow-lg bg-white max-w-lg py-10">
            <LoginForm />
          </div>
        </Banner>
      </main>
    </SiteLayout>
  )
}
