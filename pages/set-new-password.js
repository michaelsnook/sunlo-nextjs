import SiteLayout from '../components/SiteLayout'
import SetNewPasswordForm from '../components/SetNewPasswordForm'
import Banner from '../components/Banner'

export default function SetNewPassword() {
  return (
    <SiteLayout>
      <main>
        <Banner>
          <div className="card shadow-lg bg-white text-gray-800 max-w-lg p-10">
            <SetNewPasswordForm />
          </div>
        </Banner>
      </main>
    </SiteLayout>
  )
}
