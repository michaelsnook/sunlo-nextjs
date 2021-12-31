import SiteLayout from '../components/SiteLayout'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import Banner from '../components/Banner'

export default function Login() {
  return (
    <SiteLayout>
      <main>
        <Banner>
          <div className="card shadow-lg bg-white text-gray-800 max-w-lg py-10">
            <ForgotPasswordForm />
          </div>
        </Banner>
      </main>
    </SiteLayout>
  )
}
