import SiteLayout from 'components/SiteLayout'
import ForgotPasswordForm from 'components/ForgotPasswordForm'
import Banner from 'app/components/Banner'

export default function ForgotPassword() {
  return (
    <SiteLayout>
      <main>
        <Banner>
          <div className="card shadow-lg bg-white text-gray-800 max-w-lg p-10">
            <ForgotPasswordForm />
          </div>
        </Banner>
      </main>
    </SiteLayout>
  )
}
