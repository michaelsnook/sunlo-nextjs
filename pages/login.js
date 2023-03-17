import SiteLayout from 'components/SiteLayout'
import LoginForm from 'components/LoginForm'
import Banner from 'components/Banner'

export default function Login() {
  return (
    <SiteLayout>
      <main>
        <Banner>
          <div className="card shadow-lg bg-white text-gray-800 max-w-lg p-10">
            <LoginForm />
          </div>
        </Banner>
      </main>
    </SiteLayout>
  )
}
